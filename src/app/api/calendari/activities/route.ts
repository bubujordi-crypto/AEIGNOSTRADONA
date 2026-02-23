import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "calendari-activitats.json");

interface CalendarActivity {
  id: string;
  date: string;
  title: string;
  description?: string;
  type: string;
}

async function loadActivities(): Promise<CalendarActivity[]> {
  try {
    const data = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function saveActivities(activities: CalendarActivity[]) {
  const dir = path.dirname(DATA_FILE);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(activities, null, 2), "utf-8");
}

function isAdmin(request: NextRequest): boolean {
  const cookie = request.cookies.get("calendari_admin");
  return cookie?.value === process.env.CALENDARI_ADMIN_SECRET;
}

export async function GET() {
  try {
    const activities = await loadActivities();
    return NextResponse.json(activities);
  } catch (e) {
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(request: NextRequest) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: "No autoritzat" }, { status: 401 });
  }
  try {
    const body = await request.json();
    const { date, title, description, type } = body;
    if (!date || !title || !type) {
      return NextResponse.json({ error: "Falten camps obligatoris" }, { status: 400 });
    }
    const activities = await loadActivities();
    const newActivity: CalendarActivity = {
      id: crypto.randomUUID(),
      date,
      title: String(title).trim(),
      description: description ? String(description).trim() : undefined,
      type: String(type),
    };
    activities.push(newActivity);
    await saveActivities(activities);
    return NextResponse.json(newActivity);
  } catch (e) {
    return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: "No autoritzat" }, { status: 401 });
  }
  try {
    const body = await request.json();
    const { id, date, title, description, type } = body;
    if (!id || !date || !title || !type) {
      return NextResponse.json({ error: "Falten camps obligatoris" }, { status: 400 });
    }
    const activities = await loadActivities();
    const idx = activities.findIndex((a) => a.id === id);
    if (idx === -1) return NextResponse.json({ error: "No trobat" }, { status: 404 });
    activities[idx] = {
      ...activities[idx],
      date,
      title: String(title).trim(),
      description: description ? String(description).trim() : undefined,
      type: String(type),
    };
    await saveActivities(activities);
    return NextResponse.json(activities[idx]);
  } catch (e) {
    return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: "No autoritzat" }, { status: 401 });
  }
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID requerit" }, { status: 400 });
    const activities = await loadActivities();
    const filtered = activities.filter((a) => a.id !== id);
    if (filtered.length === activities.length) {
      return NextResponse.json({ error: "No trobat" }, { status: 404 });
    }
    await saveActivities(filtered);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
  }
}

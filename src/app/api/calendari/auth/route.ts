import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "calendari_admin";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 dies

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { password } = body;
  const expected = process.env.CALENDARI_ADMIN_PASSWORD;

  if (!expected) {
    return NextResponse.json(
      { error: "La contrasenya d'admin no està configurada. Afegeix CALENDARI_ADMIN_PASSWORD a .env.local" },
      { status: 500 }
    );
  }

  if (password === expected) {
    const secret = process.env.CALENDARI_ADMIN_SECRET;
    if (!secret) {
      return NextResponse.json(
        { error: "Falta CALENDARI_ADMIN_SECRET a .env.local" },
        { status: 500 }
      );
    }
    const res = NextResponse.json({ ok: true });
    res.cookies.set(COOKIE_NAME, secret, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: COOKIE_MAX_AGE,
      path: "/",
    });
    return res;
  }

  return NextResponse.json({ error: "Contrasenya incorrecta" }, { status: 401 });
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete(COOKIE_NAME);
  return res;
}

export async function GET(request: NextRequest) {
  const cookie = request.cookies.get(COOKIE_NAME);
  const secret = process.env.CALENDARI_ADMIN_SECRET;
  const isAdmin = secret && cookie?.value === secret;
  return NextResponse.json({ isAdmin: !!isAdmin });
}

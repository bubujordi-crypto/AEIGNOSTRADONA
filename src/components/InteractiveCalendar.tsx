"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Plus, Trash2, LogOut } from "lucide-react";

export type ActivityType = "esdeveniment" | "pont" | "campa";

export interface CalendarActivity {
  id: string;
  date: string;
  title: string;
  description?: string;
  type: ActivityType;
}

const TYPES: { value: ActivityType; label: string; color: string }[] = [
  { value: "esdeveniment", label: "Esdeveniment", color: "bg-blue-500" },
  { value: "pont", label: "Pont", color: "bg-amber-500" },
  { value: "campa", label: "Campa", color: "bg-scout-green" },
];

function getMonthDays(year: number, month: number) {
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const startPad = first.getDay() === 0 ? 6 : first.getDay() - 1;
  const daysInMonth = last.getDate();
  const total = Math.ceil((startPad + daysInMonth) / 7) * 7;
  const days: (number | null)[] = [];
  for (let i = 0; i < startPad; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);
  while (days.length < total) days.push(null);
  return days;
}

function formatDateKey(year: number, month: number, day: number): string {
  const m = String(month + 1).padStart(2, "0");
  const d = String(day).padStart(2, "0");
  return `${year}-${m}-${d}`;
}

const MONTHS = [
  "Gener", "Febrer", "Març", "Abril", "Maig", "Juny",
  "Juliol", "Agost", "Setembre", "Octubre", "Novembre", "Desembre"
];

interface Props {
  isAdmin: boolean;
  onLogout?: () => void;
}

export default function InteractiveCalendar({ isAdmin, onLogout }: Props) {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [activities, setActivities] = useState<CalendarActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<CalendarActivity | null>(null);
  const [viewing, setViewing] = useState<CalendarActivity | null>(null);
  const [formDate, setFormDate] = useState("");
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formType, setFormType] = useState<ActivityType>("esdeveniment");

  const fetchActivities = useCallback(async () => {
    try {
      const res = await fetch("/api/calendari/activities");
      const data = await res.json();
      setActivities(Array.isArray(data) ? data : []);
    } catch {
      setActivities([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  const days = getMonthDays(year, month);
  const activitiesByDate: Record<string, CalendarActivity[]> = {};
  activities.forEach((a) => {
    if (!activitiesByDate[a.date]) activitiesByDate[a.date] = [];
    activitiesByDate[a.date].push(a);
  });

  const openAdd = (dateKey?: string) => {
    if (!isAdmin) return;
    setEditing(null);
    setFormDate(dateKey || formatDateKey(year, month, 1));
    setFormTitle("");
    setFormDescription("");
    setFormType("esdeveniment");
    setModalOpen(true);
  };

  const openEdit = (a: CalendarActivity) => {
    if (isAdmin) {
      setEditing(a);
      setFormDate(a.date);
      setFormTitle(a.title);
      setFormDescription(a.description || "");
      setFormType(a.type);
      setModalOpen(true);
    } else {
      setViewing(a);
    }
  };

  const handleSave = async () => {
    if (!formTitle.trim()) return;
    try {
      if (editing) {
        const res = await fetch("/api/calendari/activities", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: editing.id,
            date: formDate,
            title: formTitle.trim(),
            description: formDescription.trim() || undefined,
            type: formType,
          }),
        });
        if (!res.ok) return;
      } else {
        const res = await fetch("/api/calendari/activities", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            date: formDate,
            title: formTitle.trim(),
            description: formDescription.trim() || undefined,
            type: formType,
          }),
        });
        if (!res.ok) return;
      }
      await fetchActivities();
      setModalOpen(false);
    } catch {
      // error
    }
  };

  const handleDelete = async () => {
    if (!editing) return;
    try {
      const res = await fetch(`/api/calendari/activities?id=${editing.id}`, { method: "DELETE" });
      if (!res.ok) return;
      await fetchActivities();
      setModalOpen(false);
    } catch {
      // error
    }
  };

  const prevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else setMonth((m) => m - 1);
  };

  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else setMonth((m) => m + 1);
  };

  if (loading) {
    return <p className="text-gray-500">Carregant calendari...</p>;
  }

  return (
    <div className="space-y-6">
      {/* Llegenda */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-4 items-center">
          <span className="text-sm font-medium text-gray-600">Llegenda:</span>
          {TYPES.map((t) => (
            <div key={t.value} className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${t.color}`} />
              <span className="text-sm text-gray-700">{t.label}</span>
            </div>
          ))}
        </div>
        {isAdmin && onLogout && (
          <button
            type="button"
            onClick={onLogout}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-scout-green"
          >
            <LogOut size={16} />
            Sortir
          </button>
        )}
      </div>

      {/* Controles */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={prevMonth}
            className="p-2 rounded-lg hover:bg-gray-100 text-scout-green"
            aria-label="Mes anterior"
          >
            <ChevronLeft size={24} />
          </button>
          <h2 className="text-xl font-bold text-gray-900 min-w-[180px] text-center">
            {MONTHS[month]} {year}
          </h2>
          <button
            type="button"
            onClick={nextMonth}
            className="p-2 rounded-lg hover:bg-gray-100 text-scout-green"
            aria-label="Mes següent"
          >
            <ChevronRight size={24} />
          </button>
        </div>
        {isAdmin && (
          <button
            type="button"
            onClick={() => openAdd()}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-scout-green text-white hover:bg-scout-green-dark font-medium"
          >
            <Plus size={20} />
            Afegir activitat
          </button>
        )}
      </div>

      {/* Calendari */}
      <div className="rounded-xl border border-gray-200 overflow-hidden bg-white shadow-sm">
        <div className="grid grid-cols-7 bg-gray-100 border-b border-gray-200">
          {["Dl", "Dm", "Dc", "Dj", "Dv", "Ds", "Dg"].map((d) => (
            <div key={d} className="py-2 text-center text-sm font-medium text-gray-600">
              {d}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {days.map((day, i) => {
            if (day === null) {
              return <div key={`empty-${i}`} className="min-h-[100px] bg-gray-50/50" />;
            }
            const dateKey = formatDateKey(year, month, day);
            const dayActivities = activitiesByDate[dateKey] || [];
            const isToday =
              today.getDate() === day &&
              today.getMonth() === month &&
              today.getFullYear() === year;

            return (
              <div
                key={dateKey}
                className={`group min-h-[100px] border-b border-r border-gray-100 p-2 flex flex-col ${
                  isToday ? "bg-scout-green/5" : "bg-white"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium ${isToday ? "text-scout-green" : "text-gray-700"}`}>
                    {day}
                  </span>
                  {isAdmin && (
                    <button
                      type="button"
                      onClick={() => openAdd(dateKey)}
                      className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-scout-green/10 text-scout-green transition-opacity"
                      aria-label="Afegir activitat"
                    >
                      <Plus size={14} />
                    </button>
                  )}
                </div>
                <div className="mt-1 space-y-1 flex-1 overflow-y-auto">
                  {dayActivities.slice(0, 2).map((a) => {
                    const typeConfig = TYPES.find((t) => t.value === a.type);
                    return (
                      <button
                        key={a.id}
                        type="button"
                        onClick={() => openEdit(a)}
                        className={`w-full text-left text-xs px-2 py-1 rounded truncate ${typeConfig?.color || "bg-gray-400"} text-white hover:opacity-90`}
                        title={a.title}
                      >
                        {a.title}
                      </button>
                    );
                  })}
                  {dayActivities.length > 2 && (
                    <span className="text-xs text-gray-500">+{dayActivities.length - 2} més</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal afegir/editar (només admin) */}
      {modalOpen && isAdmin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-scout-green mb-4">
              {editing ? "Editar activitat" : "Afegir activitat"}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Data</label>
                <input
                  type="date"
                  value={formDate}
                  onChange={(e) => setFormDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-scout-green focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipus</label>
                <select
                  value={formType}
                  onChange={(e) => setFormType(e.target.value as ActivityType)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-scout-green focus:border-transparent"
                >
                  {TYPES.map((t) => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Títol *</label>
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="Nom de l'activitat"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-scout-green focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripció (opcional)</label>
                <textarea
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Descripció..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-scout-green focus:border-transparent resize-none"
                />
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleSave}
                disabled={!formTitle.trim()}
                className="px-4 py-2 rounded-lg bg-scout-green text-white hover:bg-scout-green-dark disabled:opacity-50 font-medium"
              >
                Guardar
              </button>
              {editing && (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="flex items-center gap-1 px-4 py-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200"
                >
                  <Trash2 size={16} />
                  Eliminar
                </button>
              )}
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Cancel·lar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal vista només lectura (visitants) */}
      {viewing && !isAdmin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setViewing(null)}>
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-scout-green mb-2">{viewing.title}</h3>
            <p className="text-sm text-gray-500 mb-2">
              {viewing.date} · {TYPES.find((t) => t.value === viewing.type)?.label}
            </p>
            {viewing.description && <p className="text-gray-700">{viewing.description}</p>}
            <button
              type="button"
              onClick={() => setViewing(null)}
              className="mt-4 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Tancar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

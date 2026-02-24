"use client";

import { useState, useEffect } from "react";
import InteractiveCalendar from "@/components/InteractiveCalendar";
import CalendariAdminLogin from "@/components/CalendariAdminLogin";
import { Settings2 } from "lucide-react";

export default function CalendariPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [checking, setChecking] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    fetch("/api/calendari/auth")
      .then((r) => r.json())
      .then((data) => setIsAdmin(!!data.isAdmin))
      .catch(() => setIsAdmin(false))
      .finally(() => setChecking(false));
  }, []);

  const handleLoginSuccess = () => {
    setIsAdmin(true);
    setShowLoginModal(false);
  };

  const handleLogout = async () => {
    await fetch("/api/calendari/auth", { method: "DELETE" });
    setIsAdmin(false);
  };

  if (checking) {
    return (
      <div className="min-h-screen py-12 px-4 mx-auto max-w-6xl">
        <p className="text-gray-500">Carregant...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 mx-auto max-w-6xl">
      <h1 className="text-4xl font-bold text-scout-green">Calendari</h1>
      <p className="mt-2 text-gray-600">
        {isAdmin
          ? "Estàs connectat com a administrador. Pots afegir i editar activitats."
          : "Consulta les activitats i esdeveniments de l'agrupament."}
      </p>

      <div className="mt-8 relative group/admin">
        <InteractiveCalendar isAdmin={isAdmin} onLogout={handleLogout} />

        {/* Enllaç discret: només icona petita, text visible en hover */}
        {!isAdmin && (
          <button
            type="button"
            onClick={() => setShowLoginModal(true)}
            className="absolute bottom-2 right-2 flex items-center gap-1.5 px-2 py-1 rounded text-gray-400 hover:text-gray-600 hover:bg-gray-100/80 transition-all"
            title="Accés administrador"
          >
            <Settings2 size={14} />
            <span className="text-xs opacity-0 group-hover/admin:opacity-70">Accés admin</span>
          </button>
        )}
      </div>

      {/* Modal de login (només quan es clica l'enllaç) */}
      {showLoginModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={() => setShowLoginModal(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <CalendariAdminLogin
              onSuccess={handleLoginSuccess}
              onClose={() => setShowLoginModal(false)}
              inModal
            />
          </div>
        </div>
      )}
    </div>
  );
}

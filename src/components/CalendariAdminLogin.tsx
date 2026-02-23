"use client";

import { useState } from "react";
import { LogIn } from "lucide-react";

interface Props {
  onSuccess: () => void;
  onClose?: () => void;
  inModal?: boolean;
}

export default function CalendariAdminLogin({ onSuccess, onClose, inModal }: Props) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/calendari/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Error d'autenticació");
        return;
      }
      onSuccess();
    } catch {
      setError("Error de connexió");
    } finally {
      setLoading(false);
    }
  };

  const form = (
    <>
      <h3 className="font-semibold text-scout-green mb-3 flex items-center gap-2">
        <LogIn size={20} />
        Accés administrador
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        Introdueix la contrasenya per editar el calendari.
      </p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contrasenya"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-scout-green focus:border-transparent"
          disabled={loading}
          autoFocus
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 px-4 py-2 rounded-lg bg-scout-green text-white hover:bg-scout-green-dark disabled:opacity-50 font-medium"
          >
            {loading ? "Comprovant..." : "Entrar"}
          </button>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancel·lar
            </button>
          )}
        </div>
      </form>
    </>
  );

  if (inModal) {
    return (
      <div className="rounded-xl bg-white p-6 max-w-sm shadow-xl">
        {form}
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-scout-green/30 bg-scout-green/5 p-6 max-w-sm">
      {form}
    </div>
  );
}

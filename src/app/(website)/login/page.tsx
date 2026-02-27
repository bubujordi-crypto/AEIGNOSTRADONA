"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authenticate } from "./actions";
import Image from "next/image";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    
    try {
      const success = await authenticate(password);
      if (success) {
        router.push(callbackUrl);
        router.refresh(); // Forcem una recàrrega per actualitzar l'estat global
      } else {
        setError(true);
        setPassword("");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl shadow-sm border border-gray-100">
        <div className="text-center flex flex-col items-center">
          <div className="w-20 h-20 relative mb-4">
            <Image
              src="/logo.png"
              alt="Logo AEIG Nostra Dona de la Salut"
              fill
              className="object-contain"
            />
          </div>
          <h2 className="text-3xl font-extrabold text-scout-green">Àrea Protegida</h2>
          <p className="mt-3 text-sm text-gray-600">
            Aquesta secció conté fotografies o informació interna. Introdueix la contrasenya proporcionada per l&apos;agrupament.
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="password" className="sr-only">
              Contrasenya
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none rounded-xl relative block w-full px-4 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-scout-green focus:border-transparent transition-all"
              placeholder="Escriu la contrasenya..."
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center font-medium animate-pulse">
              Contrasenya incorrecta. Torna-ho a intentar.
            </p>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-scout-green hover:bg-scout-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-scout-green transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "Comprovant..." : "Accedir"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

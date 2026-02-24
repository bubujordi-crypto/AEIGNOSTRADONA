"use client";

import { useState } from "react";

const EMAIL = "albergueria.nostradonadelasalut@escoltesiguies.cat";

export default function LloguerPage() {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [motiu, setMotiu] = useState("");
  const [missatge, setMissatge] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Contacte lloguer: ${motiu || "Consulta"}`);
    const body = encodeURIComponent(
      `Nom: ${nom}\n\nCorreu: ${email}\n\nMotiu de contacte: ${motiu}\n\nMissatge:\n${missatge}`
    );
    const mailtoUrl = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    const link = document.createElement("a");
    link.href = mailtoUrl;
    link.click();
  };

  return (
    <div className="min-h-screen py-12 px-4 mx-auto max-w-3xl">
      <h1 className="text-4xl font-bold text-scout-green">Vine a dormir al cau</h1>
      <p className="mt-4 text-gray-600">
        Contacta&apos;ns per reservar o consultar disponibilitat per al lloguer del nostre espai.
      </p>

      <form onSubmit={handleSubmit} className="mt-10 space-y-6">
        <div>
          <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-1">
            Nom *
          </label>
          <input
            id="nom"
            type="text"
            required
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            placeholder="El teu nom"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-scout-green focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Correu electrònic *
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="el@teuemail.cat"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-scout-green focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="motiu" className="block text-sm font-medium text-gray-700 mb-1">
            Motiu de contacte *
          </label>
          <select
            id="motiu"
            required
            value={motiu}
            onChange={(e) => setMotiu(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-scout-green focus:border-transparent bg-white"
          >
            <option value="">Tria una opció</option>
            <option value="Consulta de disponibilitat">Consulta de disponibilitat</option>
            <option value="Reserva">Reserva</option>
            <option value="Informació general">Informació general</option>
            <option value="Altres">Altres</option>
          </select>
        </div>

        <div>
          <label htmlFor="missatge" className="block text-sm font-medium text-gray-700 mb-1">
            Missatge *
          </label>
          <textarea
            id="missatge"
            required
            value={missatge}
            onChange={(e) => setMissatge(e.target.value)}
            placeholder="Explica'ns la teva consulta..."
            rows={5}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-scout-green focus:border-transparent resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full sm:w-auto px-8 py-3 rounded-lg bg-scout-green text-white font-medium hover:bg-scout-green-dark transition-colors"
        >
          Enviar missatge
        </button>
      </form>

      <p className="mt-6 text-sm text-gray-500">
        En enviar, s&apos;obrirà el teu client de correu amb el missatge preparat adreçat a{" "}
        <a href={`mailto:${EMAIL}`} className="text-scout-green hover:underline">
          {EMAIL}
        </a>
      </p>
    </div>
  );
}

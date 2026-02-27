"use server";

import { cookies } from "next/headers";

export async function authenticate(password: string) {
  // Per defecte posem "SempreAPunt!" si no s'ha configurat cap altra variable d'entorn a Netlify
  const correctPassword = process.env.SITE_PASSWORD || "SempreAPunt!";
  
  if (password === correctPassword) {
    cookies().set({
      name: "cau_auth",
      value: "authenticated",
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 30, // La sessió dura 30 dies perquè no hagin d'estar posant-ho constantment
    });
    return true;
  }
  return false;
}

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Només la galeria requereix contrasenya (fotos dels nens)
  const isProtectedPath = request.nextUrl.pathname.startsWith("/galeria");

  if (isProtectedPath) {
    const authCookie = request.cookies.get("cau_auth");
    
    // Si no hi ha cookie o no és correcta, redirigir al login
    if (!authCookie || authCookie.value !== "authenticated") {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/galeria/:path*"],
};

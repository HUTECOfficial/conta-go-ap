import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Middleware completamente vacío
export function middleware(req: NextRequest) {
  return NextResponse.next()
}

export const config = {
  matcher: [], // No aplicar a ninguna ruta
}


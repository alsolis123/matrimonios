import { NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  createAdminSessionValue,
  getAdminSessionDurationSeconds,
  isValidAdminPin,
} from "@/lib/admin/session";

type AdminPinPayload = {
  pin?: unknown;
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as AdminPinPayload | null;
  const pin = typeof body?.pin === "string" ? body.pin : "";

  if (!isValidAdminPin(pin)) {
    return NextResponse.json(
      {
        ok: false,
        message: "El PIN ingresado no es valido.",
      },
      { status: 401 },
    );
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_SESSION_COOKIE, createAdminSessionValue(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: getAdminSessionDurationSeconds(),
  });

  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });

  return response;
}

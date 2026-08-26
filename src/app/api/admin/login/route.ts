import { NextResponse } from "next/server";
import { checkAdminPassword, createAdminSession, isAdminConfigured } from "@/lib/admin-session";

export async function POST(request: Request) {
  if (!isAdminConfigured()) {
    return NextResponse.json(
      {
        error: "not_configured",
        message:
          "Admin login isn't set up yet — ADMIN_PASSWORD and SESSION_SECRET need to be added as environment variables first.",
      },
      { status: 503 }
    );
  }

  const form = await request.formData().catch(() => null);
  const password = (form?.get("password") as string | null) ?? "";

  if (!checkAdminPassword(password)) {
    return NextResponse.json({ error: "invalid_password" }, { status: 401 });
  }

  await createAdminSession();
  return NextResponse.json({ ok: true });
}

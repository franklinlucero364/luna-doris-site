import { NextResponse } from "next/server";
import { getSupabaseAdmin, REVIEW_PHOTOS_BUCKET } from "@/lib/supabase-admin";

// Keep photo uploads comfortably under typical serverless request-body
// limits (Vercel's default is a few MB per request).
const MAX_PHOTO_BYTES = 4 * 1024 * 1024;
const MAX_NAME_LENGTH = 200;
const MAX_REVIEW_LENGTH = 2000;

/**
 * Public "submit a review" endpoint — used by the "Leave a review" form
 * on the homepage. Every submission is stored with status "pending";
 * nothing appears on the public site until an admin approves it at
 * /admin (see src/app/api/admin/reviews).
 */
export async function POST(request: Request) {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json(
      {
        error: "not_configured",
        message: "Reviews aren't connected yet.",
      },
      { status: 503 }
    );
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  // Honeypot — invisible to real visitors, bots tend to fill every field.
  const honeypot = form.get("company");
  if (typeof honeypot === "string" && honeypot.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const name = ((form.get("name") as string | null) ?? "").trim().slice(0, MAX_NAME_LENGTH);
  const quote = ((form.get("review") as string | null) ?? "")
    .trim()
    .slice(0, MAX_REVIEW_LENGTH);

  if (!name || !quote) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }

  let photoUrl: string | null = null;
  const photo = form.get("photo");

  if (photo instanceof File && photo.size > 0) {
    if (photo.size > MAX_PHOTO_BYTES) {
      return NextResponse.json({ error: "photo_too_large" }, { status: 400 });
    }
    if (!photo.type.startsWith("image/")) {
      return NextResponse.json({ error: "invalid_photo_type" }, { status: 400 });
    }

    const bytes = new Uint8Array(await photo.arrayBuffer());
    const ext = photo.type.split("/")[1]?.replace("jpeg", "jpg") || "jpg";
    const path = `${crypto.randomUUID()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from(REVIEW_PHOTOS_BUCKET)
      .upload(path, bytes, { contentType: photo.type });

    if (uploadError) {
      return NextResponse.json({ error: "upload_failed" }, { status: 500 });
    }

    photoUrl = supabase.storage.from(REVIEW_PHOTOS_BUCKET).getPublicUrl(path).data.publicUrl;
  }

  const { error: insertError } = await supabase.from("reviews").insert({
    name,
    quote,
    photo_url: photoUrl,
    status: "pending",
  });

  if (insertError) {
    return NextResponse.json({ error: "insert_failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

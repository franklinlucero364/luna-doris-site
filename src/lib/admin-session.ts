import "server-only";
import { timingSafeEqual } from "node:crypto";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

/**
 * Admin login for the reviews dashboard (/admin). There's exactly one
 * admin (Doris/Franklin share one password) — no user accounts, no
 * database of logins. A signed, httpOnly cookie is the whole session.
 *
 * Requires two environment variables (see README.md → "Reviews: admin
 * setup"):
 *   ADMIN_PASSWORD  — the password typed in at /admin/login
 *   SESSION_SECRET  — a long random string used to sign the session
 *                      cookie (e.g. `openssl rand -base64 32`)
 * Neither is set by default, so admin login is OFF until configured —
 * every function here fails safe (returns false/null) rather than
 * throwing when that's the case.
 */

const COOKIE_NAME = "ld_admin_session";
const SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 14; // 14 days

function getSecretKey(): Uint8Array | null {
  const secret = process.env.SESSION_SECRET;
  if (!secret) return null;
  return new TextEncoder().encode(secret);
}

/** True once both required env vars are set. */
export function isAdminConfigured(): boolean {
  return Boolean(process.env.SESSION_SECRET && process.env.ADMIN_PASSWORD);
}

/** Compares a submitted password to ADMIN_PASSWORD without a data-length
 * timing leak. (Both are short human passwords, not cryptographic keys —
 * this is a reasonable precaution, not a claim of bulletproof security.) */
export function checkAdminPassword(candidate: string): boolean {
  const real = process.env.ADMIN_PASSWORD;
  if (!real) return false;

  const a = Buffer.from(candidate);
  const b = Buffer.from(real);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function createAdminSession(): Promise<void> {
  const key = getSecretKey();
  if (!key) throw new Error("SESSION_SECRET is not set");

  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);
  const token = await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(Math.floor(expiresAt.getTime() / 1000))
    .sign(key);

  const store = await cookies();
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });
}

export async function destroyAdminSession(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

/** Reads + verifies the session cookie for the current request.
 *
 * Deliberately calls `cookies()` before checking whether SESSION_SECRET
 * is set (rather than short-circuiting first) — reading cookies() is a
 * request-time API that tells Next.js "this page depends on per-request
 * data, don't prerender it statically." If we checked the env var first
 * and returned early when it's missing, a page that calls this function
 * could get frozen as a static shell at build time (see the comment in
 * src/app/admin/page.tsx) whenever the env var happened to be absent
 * during `next build`. Reading the cookie first means that can't happen,
 * regardless of build-time env var timing. */
export async function verifyAdminSession(): Promise<boolean> {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (!token) return false;

  const key = getSecretKey();
  if (!key) return false;

  try {
    const { payload } = await jwtVerify(token, key, { algorithms: ["HS256"] });
    return payload.role === "admin";
  } catch {
    return false;
  }
}

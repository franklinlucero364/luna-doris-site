"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type ReviewStatus = "pending" | "approved" | "denied";

type Review = {
  id: string;
  name: string;
  quote: string;
  photo_url: string | null;
  status: ReviewStatus;
  created_at: string;
};

type LoadState = "loading" | "ready" | "not_configured" | "error";

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

function ReviewCard({
  review,
  busy,
  onSetStatus,
}: {
  review: Review;
  busy: boolean;
  onSetStatus: (id: string, status: ReviewStatus) => void;
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-medium text-foreground">{review.name}</p>
          <p className="text-xs text-muted">{formatDate(review.created_at)}</p>
        </div>
        {review.photo_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={review.photo_url}
            alt=""
            className="h-12 w-12 flex-shrink-0 rounded-full object-cover"
          />
        )}
      </div>
      <p className="mt-3 whitespace-pre-wrap text-sm text-foreground">{review.quote}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {review.status !== "approved" && (
          <button
            type="button"
            disabled={busy}
            onClick={() => onSetStatus(review.id, "approved")}
            className="rounded-full bg-sky px-4 py-1.5 text-xs font-medium text-white hover:bg-sky-dark disabled:opacity-60"
          >
            Approve — show on site
          </button>
        )}
        {review.status !== "denied" && (
          <button
            type="button"
            disabled={busy}
            onClick={() => onSetStatus(review.id, "denied")}
            className="rounded-full border border-border px-4 py-1.5 text-xs font-medium text-muted hover:bg-background"
          >
            {review.status === "approved" ? "Remove from site" : "Deny"}
          </button>
        )}
        {review.status !== "pending" && (
          <button
            type="button"
            disabled={busy}
            onClick={() => onSetStatus(review.id, "pending")}
            className="rounded-full border border-border px-4 py-1.5 text-xs font-medium text-muted hover:bg-background"
          >
            Move back to pending
          </button>
        )}
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const router = useRouter();
  const [state, setState] = useState<LoadState>("loading");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [signingOut, setSigningOut] = useState(false);

  const load = useCallback(async () => {
    setState("loading");
    try {
      const res = await fetch("/api/admin/reviews", { cache: "no-store" });
      if (res.status === 503) {
        setState("not_configured");
        return;
      }
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      if (!res.ok) {
        setState("error");
        return;
      }
      const body = await res.json();
      setReviews(body.reviews ?? []);
      setState("ready");
    } catch {
      setState("error");
    }
  }, [router]);

  useEffect(() => {
    // Deliberate fetch-on-mount from our own API route — there's no
    // external subscription to attach to instead, so this is the
    // straightforward case the underlying rule's "subscribe to an
    // external system" alternative doesn't apply to.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  async function handleSetStatus(id: string, status: ReviewStatus) {
    setBusyId(id);
    try {
      const res = await fetch(`/api/admin/reviews/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
      }
    } finally {
      setBusyId(null);
    }
  }

  async function handleSignOut() {
    setSigningOut(true);
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  if (state === "loading") {
    return <p className="text-center text-sm text-muted">Loading reviews…</p>;
  }

  if (state === "not_configured") {
    return (
      <p className="mx-auto max-w-md rounded-xl border border-dashed border-border bg-surface/60 p-6 text-center text-sm text-muted">
        Reviews aren&apos;t connected to a database yet. Add{" "}
        <code>SUPABASE_URL</code> and <code>SUPABASE_SERVICE_ROLE_KEY</code> as
        environment variables (see README.md → &quot;Reviews: admin setup&quot;).
      </p>
    );
  }

  if (state === "error") {
    return (
      <div className="text-center">
        <p className="text-sm text-muted">Something went wrong loading reviews.</p>
        <button
          type="button"
          onClick={load}
          className="mt-3 text-sm font-medium text-sky-dark underline"
        >
          Try again
        </button>
      </div>
    );
  }

  const pending = reviews.filter((r) => r.status === "pending");
  const approved = reviews.filter((r) => r.status === "approved");
  const denied = reviews.filter((r) => r.status === "denied");

  return (
    <div className="space-y-12">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted">
          {pending.length} pending · {approved.length} live · {denied.length} denied
        </p>
        <button
          type="button"
          onClick={handleSignOut}
          disabled={signingOut}
          className="text-sm font-medium text-muted underline hover:text-foreground disabled:opacity-60"
        >
          Sign out
        </button>
      </div>

      <section>
        <h2 className="font-serif text-xl text-foreground">
          Pending approval {pending.length > 0 && `(${pending.length})`}
        </h2>
        <div className="mt-4 space-y-4">
          {pending.length === 0 ? (
            <p className="text-sm text-muted">Nothing waiting on you right now.</p>
          ) : (
            pending.map((r) => (
              <ReviewCard
                key={r.id}
                review={r}
                busy={busyId === r.id}
                onSetStatus={handleSetStatus}
              />
            ))
          )}
        </div>
      </section>

      <section>
        <h2 className="font-serif text-xl text-foreground">
          Live on site {approved.length > 0 && `(${approved.length})`}
        </h2>
        <div className="mt-4 space-y-4">
          {approved.length === 0 ? (
            <p className="text-sm text-muted">Nothing approved yet.</p>
          ) : (
            approved.map((r) => (
              <ReviewCard
                key={r.id}
                review={r}
                busy={busyId === r.id}
                onSetStatus={handleSetStatus}
              />
            ))
          )}
        </div>
      </section>

      {denied.length > 0 && (
        <section>
          <h2 className="font-serif text-xl text-foreground">Denied ({denied.length})</h2>
          <div className="mt-4 space-y-4">
            {denied.map((r) => (
              <ReviewCard
                key={r.id}
                review={r}
                busy={busyId === r.id}
                onSetStatus={handleSetStatus}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

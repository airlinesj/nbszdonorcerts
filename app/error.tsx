"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <main className="grain flex min-h-screen items-center justify-center bg-[#f7f4f1] px-6 py-12">
      <section className="w-full max-w-xl border border-maroon/20 bg-white p-8 text-center shadow-[0_24px_70px_rgba(74,35,35,.12)] md:p-14">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-maroon p-2">
          <img
            src="/zbsnlogo.jpeg"
            alt="National Blood Service Zimbabwe logo"
            className="h-full w-full object-contain"
          />
        </div>

        <p className="mt-8 text-xs font-bold uppercase tracking-[.25em] text-maroon">
          NBSZ system alert
        </p>
        <h1 className="mt-3 font-display text-5xl text-ink">
          Something isn&apos;t working
        </h1>
        <p className="mx-auto mt-5 max-w-md text-sm leading-6 text-black/50">
          The certificate workspace hit an unexpected issue. Please try again, or return to the dashboard while the team checks the problem.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => reset()}
            className="bg-maroon px-5 py-3 text-xs font-bold uppercase tracking-[.15em] text-white transition hover:bg-crimson"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center border border-maroon/20 bg-white px-5 py-3 text-xs font-bold uppercase tracking-[.15em] text-maroon transition hover:bg-[#f6f0f1]"
          >
            Return to dashboard
          </Link>
        </div>

        {error.digest ? (
          <p className="mt-6 text-[10px] uppercase tracking-[.18em] text-black/35">
            Reference: {error.digest}
          </p>
        ) : null}
      </section>
    </main>
  );
}

import Link from "next/link";

export const metadata = {
  title: "Certificate Office Not Found",
  description: "The requested NBSZ Certificate Office page could not be found.",
};

export default function NotFound() {
  return (
    <main className="grain flex min-h-screen items-center justify-center bg-[#f7f4f1] px-6 py-12">
      <section className="w-full max-w-xl border border-maroon/20 bg-white p-8 text-center shadow-[0_24px_70px_rgba(74,35,35,.12)] md:p-14">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-maroon p-2">
          <img src="/zbsnlogo.jpeg" alt="National Blood Service Zimbabwe logo" className="h-full w-full object-contain" />
        </div>
        <p className="mt-8 text-xs font-bold uppercase tracking-[.25em] text-maroon">NBSZ Certificate Office</p>
        <h1 className="mt-3 font-display text-5xl text-ink">Certificate not found</h1>
        <p className="mx-auto mt-5 max-w-md text-sm leading-6 text-black/50">
          This page is not part of the NBSZ certificate workspace. Return to the office dashboard to continue.
        </p>
        <Link href="/" className="mt-8 inline-flex bg-maroon px-5 py-3 text-xs font-bold uppercase tracking-[.15em] text-white transition hover:bg-crimson">
          Return to certificate office
        </Link>
      </section>
    </main>
  );
}
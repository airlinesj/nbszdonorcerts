"use client";

import { useRef, useState } from "react";
import { signIn, signOut } from "next-auth/react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import {
  ArrowRight,
  Award,
  Bell,
  FileText,
  LockKeyhole,
  LogOut,
  Search,
  ShieldCheck,
  UserRound,
} from "lucide-react";

type Donor = {
  id: string;
  name: string;
  units: number;
  lastDonation: string;
  status: string;
};

type CertificateData = {
  donor: Donor;
  certificateDate: string;
  certificateNumber: string;
};

function createCertificateNumber() {
  const year = new Date().getFullYear();
  const sequence = String(Math.floor(Math.random() * 10000)).padStart(4, "0");
  return `NBSZ/CERT/${year}/${sequence}`;
}

function formatAwardDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
const donors: Donor[] = [
  {
    id: "NBSZ-10482",
    name: "Tendai Moyo",
    units: 100,
    lastDonation: "18 Sep 2024",
    status: "Century Club",
  },
  {
    id: "NBSZ-08319",
    name: "Rudo Chikore",
    units: 75,
    lastDonation: "04 Sep 2024",
    status: "Diamond",
  },
  {
    id: "NBSZ-11907",
    name: "Brian Dube",
    units: 50,
    lastDonation: "21 Aug 2024",
    status: "Gold",
  },
  {
    id: "NBSZ-09771",
    name: "Nyasha Zulu",
    units: 25,
    lastDonation: "12 Aug 2024",
    status: "Silver",
  },
  {
    id: "NBSZ-12140",
    name: "Farai Ncube",
    units: 10,
    lastDonation: "30 Jul 2024",
    status: "Bronze",
  },
];

function Login({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("clerk@nbsz.org.zw");
  const [loginError, setLoginError] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoginError("");
    setIsSigningIn(true);
    const formData = new FormData(event.currentTarget);
    const result = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
    setIsSigningIn(false);
    if (result?.error) {
      setLoginError("The email or password was not recognised.");
      return;
    }
    onLogin();
  }

  return (
    <main className="grain min-h-screen bg-[#f7f4f1] p-5 md:p-8">
      <div className="mx-auto grid min-h-[calc(100vh-2.5rem)] max-w-[1180px] overflow-hidden rounded-[2px] bg-white shadow-[0_30px_90px_rgba(74,35,35,.14)] md:grid-cols-[.92fr_1.08fr]">
        <section className="relative flex flex-col justify-between overflow-hidden bg-maroon p-8 text-white md:p-12">
          <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full border border-white/15" />
          <div className="absolute -bottom-28 -left-24 h-72 w-72 rounded-full border border-white/10" />
          <div className="relative">
            <div className="mb-20 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/40">
                  <img src="/zbsnlogo.jpeg" alt="National Blood Service Zimbabwe logo" className="h-10 w-10 rounded-full object-contain" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[.25em] text-white/65">
                  National Blood Service
                </p>
                <p className="font-display text-lg">Zimbabwe</p>
              </div>
            </div>
            <p className="mb-5 text-xs font-bold uppercase tracking-[.27em] text-[#e9b5ba]">
              Donor recognition
            </p>
            <h1 className="max-w-sm font-display text-5xl leading-[.98] tracking-[-.02em]">
              Every pint tells a story.
            </h1>
            <p className="mt-7 max-w-xs text-sm leading-6 text-white/70">
              A quiet record of extraordinary generosity, prepared with care.
            </p>
          </div>
          <div className="relative flex items-end justify-between border-t border-white/20 pt-5 text-[10px] uppercase tracking-[.2em] text-white/50">
            <span>Life is in the Blood</span>
            <span>Est. 1981</span>
          </div>
        </section>
        <section className="flex flex-col justify-center px-8 py-12 md:px-20">
          <div className="max-w-md">
            <div className="mb-12">
              <p className="text-xs font-bold uppercase tracking-[.25em] text-maroon">
                Certificate operations
              </p>
              <h2 className="mt-3 font-display text-4xl text-ink">
                Welcome back.
              </h2>
              <p className="mt-3 text-sm leading-6 text-black/50">
                Sign in to issue donor recognition certificates.
              </p>
            </div>
            <form
              onSubmit={handleLogin}
              className="space-y-6"
            >
              <label className="block">
                <span className="mb-2 block text-xs font-bold uppercase tracking-[.16em] text-black/50">
                  Work email
                </span>
                <div className="flex items-center border-b border-black/20 py-2 focus-within:border-maroon">
                  <UserRound size={17} className="mr-3 text-maroon" />
                  <input
                    id="login-email"
                    name="email"
                    aria-label="Work email"
                    placeholder="Work email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent text-sm outline-none"
                    type="email"
                  />
                </div>
              </label>
              <label className="block">
                <span className="mb-2 block text-xs font-bold uppercase tracking-[.16em] text-black/50">
                  Password
                </span>
                <div className="flex items-center border-b border-black/20 py-2 focus-within:border-maroon">
                  <LockKeyhole size={17} className="mr-3 text-maroon" />
                  <input
                    id="login-password"
                    name="password"
                    aria-label="Password"
                    placeholder="Password"
                    defaultValue="password"
                    className="w-full bg-transparent text-sm outline-none"
                    type="password"
                  />
                </div>
              </label>
              <div className="flex items-center justify-between pt-2 text-xs text-black/45">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="accent-maroon"
                    defaultChecked
                  />{" "}
                  Keep me signed in
                </label>
                <button type="button" className="font-semibold text-maroon">
                  Forgot password?
                </button>
              </div>
              <button
                type="submit"
                data-testid="login-submit"
                disabled={isSigningIn}
                className="group flex w-full items-center justify-between bg-maroon px-5 py-4 text-xs font-bold uppercase tracking-[.18em] text-white transition hover:bg-crimson disabled:cursor-wait disabled:opacity-70"
              >
                {isSigningIn ? "Signing in..." : "Enter workspace"}{" "}
                <ArrowRight
                  size={17}
                  className="transition group-hover:translate-x-1"
                />
              </button>
              {loginError && (
                <p className="text-xs text-crimson" role="alert">
                  {loginError}
                </p>
              )}
            </form>
            <div className="mt-12 flex items-center gap-2 text-xs text-black/40">
              <ShieldCheck size={15} className="text-maroon" /> Secured
              workspace · Role-based access
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function Certificate({
  certificate,
  onClose,
}: {
  certificate: CertificateData;
  onClose: () => void;
}) {
  const { donor, certificateDate, certificateNumber } = certificate;
  const donationLabel = donor.units >= 100 ? "100+" : String(donor.units);
  const certificateRef = useRef<HTMLDivElement>(null);
  const [downloadState, setDownloadState] = useState<"idle" | "working" | "success" | "error">("idle");
  const downloadPdf = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (downloadState === "working") return;
    setDownloadState("working");

    try {
      const certificateElement = certificateRef.current;
      if (!certificateElement) throw new Error("Certificate preview is unavailable.");

      const images = Array.from(certificateElement.querySelectorAll("img"));
      await Promise.all(
        images.map(
          (image) =>
            new Promise<void>((resolve) => {
              if (image.complete) {
                resolve();
                return;
              }
              image.addEventListener("load", () => resolve(), { once: true });
              image.addEventListener("error", () => resolve(), { once: true });
            }),
        ),
      );

      images.filter((image) => image.naturalWidth === 0).forEach((image) => {
        image.setAttribute("data-html2canvas-ignore", "true");
      });

      const canvas = await html2canvas(certificateElement, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#FCFBF9",
        logging: false,
      });

      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4", compress: true });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 7;
      const innerWidth = pageWidth - margin * 2;
      const innerHeight = pageHeight - margin * 2;
      const imgData = canvas.toDataURL("image/png");
      const imgProps = pdf.getImageProperties(imgData);
      const imageRatio = imgProps.width / imgProps.height;
      const pageRatio = innerWidth / innerHeight;

      let imgWidth = innerWidth;
      let imgHeight = innerHeight;

      if (imageRatio > pageRatio) {
        imgWidth = innerWidth;
        imgHeight = innerWidth / imageRatio;
      } else {
        imgHeight = innerHeight;
        imgWidth = innerHeight * imageRatio;
      }

      const x = (pageWidth - imgWidth) / 2;
      const y = (pageHeight - imgHeight) / 2;

      pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight, undefined, "FAST");
      pdf.save(`NBSZ-Certificate-${donor.name.trim().replace(/[^a-z0-9]+/gi, "-")}.pdf`);
      setDownloadState("success");
      window.setTimeout(() => setDownloadState("idle"), 4000);
    } catch (error) {
      console.error("Certificate PDF generation failed", error);
      setDownloadState("error");
      window.setTimeout(() => setDownloadState("idle"), 5000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-[#26161a]/70 px-5 pb-8 pt-4 backdrop-blur-sm">
      <div className="w-full max-w-[1100px]">
        <div className="sticky top-0 z-10 mb-3 flex justify-end gap-3 pb-1">
          <button
            type="button"
            onClick={downloadPdf}
            data-testid="download-pdf-button"
            aria-label="Download PDF"
            disabled={downloadState === "working"}
            className="rounded-none bg-[#7A1B29] px-5 py-2.5 text-xs font-bold uppercase tracking-[.18em] text-white transition hover:bg-[#63141F] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {downloadState === "working" ? "Preparing PDF..." : "Download PDF"}
          </button>
          <button
            type="button"
            onClick={onClose}
            data-testid="exit-preview-button"
            aria-label="Close / Exit"
            title="Close preview"
            className="rounded-none border border-white/30 bg-transparent px-5 py-2.5 text-xs font-bold uppercase tracking-[.18em] text-white transition hover:bg-white/10"
          >
            Close / Exit
          </button>
        </div>

        {(downloadState === "success" || downloadState === "error") && (
          <div className={`fixed right-6 top-6 z-[60] border px-5 py-4 text-sm shadow-2xl ${downloadState === "success" ? "border-[#bdd8c2] bg-[#f0faf2] text-[#245c31]" : "border-[#e4b7bb] bg-[#fff4f4] text-[#8d2633]"}`} role="status" aria-live="polite">
            <p className="font-bold">{downloadState === "success" ? "PDF downloaded" : "PDF generation failed"}</p>
            <p className="mt-1 text-xs opacity-80">{downloadState === "success" ? "Your NBSZ certificate is ready." : "Please try again after checking the certificate preview."}</p>
          </div>
        )}

        <div ref={certificateRef} className="certificate-paper mx-auto overflow-hidden bg-[#FCFBF9] shadow-[0_20px_60px_rgba(38,22,26,0.18)]">
          <div className="certificate-inner flex h-full flex-col items-center justify-center border-4 border-double border-[#7A1B29] bg-[#FCFBF9] px-[8%] py-[5%] text-center">
            <div className="mb-5 flex h-20 w-20 items-center justify-center bg-transparent p-0">
              <img src="/zbsnlogo.jpeg" alt="National Blood Service Zimbabwe logo" className="h-full w-full object-contain" />
            </div>

            <h3 className="font-display text-4xl font-bold tracking-[.12em] text-[#7A1B29]">
              NBSZ
            </h3>
            <p className="mt-2 text-[10px] font-semibold uppercase tracking-[.24em] text-[#7A1B29]">
              NATIONAL BLOOD SERVICE ZIMBABWE
            </p>
            <p className="mt-4 font-display text-2xl italic text-[#7A1B29]">
              Life is in the Blood
            </p>

            <p className="mt-8 text-base text-charcoal">
              Know all persons by these present that
            </p>

            <p className="mt-4 break-words font-display text-[clamp(1rem,4vw,1.9rem)] font-bold uppercase tracking-[.12em] text-[#7A1B29]">
              {donor.name.toUpperCase()}
            </p>

            <p className="mt-6 max-w-[78%] text-[15px] leading-7 text-charcoal">
              A voluntary blood donor, who has donated <strong>{donationLabel} safe units of blood</strong> for persons in need thereof,
              and by so doing over many years has shown outstanding compassion for the needs of others and awareness, beyond the normal,
              of what those more fortunate members of the public, who are in good health, can do to help others in their hour of need
            </p>

            <p className="mt-7 text-base text-charcoal">Given under my hand at Harare</p>
            <p className="mt-3 text-base font-medium text-charcoal">{certificateDate}</p>

            <div className="mt-10 flex w-full justify-center">
              <div className="text-center">
                <div className="mx-auto flex h-12 w-40 items-end justify-center border-b border-[#7A1B29]/70 pb-1">
                  <img
                    src="/assets/signatures/chairman.svg"
                    alt="Adv. Passmore Nyakureba signature"
                    className="h-10 w-full object-contain"
                    onError={(event) => {
                      event.currentTarget.style.visibility = "hidden";
                      event.currentTarget.setAttribute("data-html2canvas-ignore", "true");
                    }}
                  />
                </div>
                <div className="mx-auto mt-3 h-px w-36 bg-[#7A1B29]/60" />
                <p className="mt-3 text-[12px] font-bold uppercase tracking-[.12em] text-[#7A1B29]">
                  Adv. Passmore Nyakureba
                </p>
                <p className="text-[10px] uppercase tracking-[.22em] text-black/55">
                  NBSZ Chairman
                </p>
              </div>
            </div>

            <p className="mt-8 text-[10px] font-bold tracking-[.2em] text-[#7A1B29]">
              {certificateNumber} · LIFE IS IN THE BLOOD
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All milestones");
  const [selected, setSelected] = useState<CertificateData | null>(null);
  const [directoryDonors, setDirectoryDonors] = useState<Donor[]>(donors);
  const [donorName, setDonorName] = useState("");
  const [donorId, setDonorId] = useState("");
  const [donationCount, setDonationCount] = useState("10");
  const [awardDate, setAwardDate] = useState(
    new Date().toISOString().slice(0, 10),
  );
  const [formError, setFormError] = useState("");

  const generateForEnteredDonor = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedName = donorName.trim();
    if (!trimmedName) {
      setFormError("Enter the donor's full name before generating a certificate.");
      return;
    }
    setFormError("");
    const enteredDonor: Donor = {
      id: donorId.trim() || `NBSZ-${Date.now().toString().slice(-5)}`,
      name: trimmedName,
      units: donationCount === "100+" ? 100 : Number(donationCount),
      lastDonation: formatAwardDate(awardDate),
      status: "Verified donor",
    };
    setDirectoryDonors((currentDonors) => [
      enteredDonor,
      ...currentDonors.filter(
        (donor) => donor.id !== enteredDonor.id,
      ),
    ]);
    setSelected({
      donor: enteredDonor,
      certificateDate: formatAwardDate(awardDate),
      certificateNumber: createCertificateNumber(),
    });
  };
  const filtered = directoryDonors.filter((donor) => {
    const matchesQuery = `${donor.name} ${donor.id}`
      .toLowerCase()
      .includes(query.toLowerCase());
    const matchesFilter =
      filter === "All milestones" ||
      (filter === "100+ units"
        ? donor.units >= 100
        : donor.units === Number(filter.split(" ")[0]));
    return matchesQuery && matchesFilter;
  });
  return (
    <main className="min-h-screen bg-[#f6f4f1]">
      <header className="border-b border-black/10 bg-white">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 lg:px-10">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-maroon text-xl text-white">
              ✦
            </div>
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[.22em] text-maroon">
                NBSZ
              </p>
              <p className="font-display text-lg text-ink">
                Certificate Office
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <div className="hidden text-right sm:block">
              <p className="text-xs font-semibold text-ink">Munashe Chirwa</p>
              <p className="text-[10px] uppercase tracking-widest text-black/40">
                Clerk · Harare
              </p>
            </div>
            <button
              className="border-l border-black/10 pl-5 text-black/45"
              aria-label="Notifications"
            >
              <Bell size={18} />
            </button>
            <button
              onClick={() => void signOut({ redirect: false }).then(onLogout)}
              className="text-black/45"
              aria-label="Sign out"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </header>
      <div className="mx-auto max-w-[1400px] px-6 py-10 lg:px-10">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[.24em] text-maroon">
              Good morning, Munashe
            </p>
            <h1 className="font-display text-4xl text-ink">
              Donor recognition desk
            </h1>
            <p className="mt-2 text-sm text-black/45">
              Search, verify, and issue a certificate of thanks.
            </p>
          </div>
          <div className="flex gap-8 border-l-2 border-maroon pl-5">
            <div>
              <p className="font-display text-3xl text-maroon">1,248</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-black/40">
                Certificates issued
              </p>
            </div>
            <div>
              <p className="font-display text-3xl text-maroon">38</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-black/40">
                This month
              </p>
            </div>
          </div>
        </div>
        <section className="mb-8 border border-maroon/20 bg-white shadow-[0_14px_35px_rgba(122,27,41,.07)]">
          <div className="border-b border-maroon/10 bg-maroon px-5 py-4 text-white md:px-6">
            <p className="text-[10px] font-bold uppercase tracking-[.22em] text-[#f0c7ca]">
              NBSZ certificate printing
            </p>
            <h2 className="mt-1 font-display text-2xl">Create a certificate</h2>
            <p className="mt-1 text-xs text-white/65">
              Enter donor details below, then review and print the official certificate.
            </p>
          </div>
          <form onSubmit={generateForEnteredDonor} className="grid gap-5 p-5 md:grid-cols-2 md:p-6 lg:grid-cols-4">
            <label className="block lg:col-span-2">
              <span className="mb-2 block text-[10px] font-bold uppercase tracking-[.16em] text-black/50">Donor full name *</span>
              <input required value={donorName} onChange={(event) => setDonorName(event.target.value)} placeholder="e.g. Tendai Moyo" className="w-full border border-black/15 px-3 py-3 text-sm outline-none transition focus:border-maroon" />
            </label>
            <label className="block">
              <span className="mb-2 block text-[10px] font-bold uppercase tracking-[.16em] text-black/50">Donor ID</span>
              <input value={donorId} onChange={(event) => setDonorId(event.target.value)} placeholder="e.g. NBSZ-10482" className="w-full border border-black/15 px-3 py-3 text-sm outline-none transition focus:border-maroon" />
            </label>
            <label className="block">
              <span className="mb-2 block text-[10px] font-bold uppercase tracking-[.16em] text-black/50">Donations *</span>
              <select required value={donationCount} onChange={(event) => setDonationCount(event.target.value)} className="w-full border border-black/15 bg-white px-3 py-3 text-sm outline-none focus:border-maroon">
                <option value="10">10 donations</option>
                <option value="25">25 donations</option>
                <option value="50">50 donations</option>
                <option value="75">75 donations</option>
                <option value="100+">100+ donations</option>
              </select>
            </label>
            <label className="block">
              <span className="mb-2 block text-[10px] font-bold uppercase tracking-[.16em] text-black/50">Certificate date *</span>
              <input required type="date" value={awardDate} onChange={(event) => setAwardDate(event.target.value)} className="w-full border border-black/15 px-3 py-3 text-sm outline-none focus:border-maroon" />
            </label>
            <div className="flex items-end md:col-span-2 lg:col-span-3">
              {formError && <p className="text-xs text-crimson">{formError}</p>}
            </div>
            <button type="submit" className="flex items-center justify-center gap-2 bg-maroon px-5 py-3 text-xs font-bold uppercase tracking-[.13em] text-white transition hover:bg-crimson">
              <FileText size={16} /> Generate certificate
            </button>
          </form>
        </section>
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <div className="border border-black/10 bg-white p-5">
            <div className="mb-8 flex justify-between">
              <Award size={18} className="text-maroon" />
              <span className="text-[10px] uppercase tracking-widest text-black/35">
                Top honour
              </span>
            </div>
            <p className="font-display text-2xl text-ink">Century Club</p>
            <p className="mt-1 text-xs text-black/45">
              100+ life-saving donations
            </p>
          </div>
          <div className="border border-black/10 bg-white p-5">
            <div className="mb-8 flex justify-between">
              <FileText size={18} className="text-maroon" />
              <span className="text-[10px] uppercase tracking-widest text-black/35">
                Recent activity
              </span>
            </div>
            <p className="font-display text-2xl text-ink">Today, 09:42</p>
            <p className="mt-1 text-xs text-black/45">
              Last certificate printed
            </p>
          </div>
          <div className="border border-black/10 bg-maroon p-5 text-white">
            <div className="mb-8 flex justify-between">
              <ShieldCheck size={18} className="text-[#e8b5b9]" />
              <span className="text-[10px] uppercase tracking-widest text-white/50">
                Your access
              </span>
            </div>
            <p className="font-display text-2xl">Clerk</p>
            <p className="mt-1 text-xs text-white/60">
              Search and print enabled
            </p>
          </div>
        </div>
        <section className="border border-black/10 bg-white">
          <div className="flex flex-col gap-4 border-b border-black/10 p-5 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="font-display text-2xl text-ink">
                Donor directory
              </h2>
              <p className="mt-1 text-xs text-black/45">
                {filtered.length} verified donors available for recognition
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="flex min-w-[260px] items-center border border-black/15 px-3">
                <Search size={16} className="mr-2 text-maroon" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search name or donor ID"
                  className="w-full py-2.5 text-xs outline-none placeholder:text-black/35"
                />
              </div>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="border border-black/15 bg-white px-3 py-2 text-xs text-charcoal outline-none"
              >
                <option>All milestones</option>
                <option>10 units</option>
                <option>25 units</option>
                <option>50 units</option>
                <option>75 units</option>
                <option>100+ units</option>
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left">
              <thead className="bg-[#faf8f6] text-[10px] uppercase tracking-[.15em] text-black/40">
                <tr>
                  <th className="px-5 py-4 font-bold">Donor</th>
                  <th className="px-5 py-4 font-bold">Donor ID</th>
                  <th className="px-5 py-4 font-bold">Milestone</th>
                  <th className="px-5 py-4 font-bold">Last donation</th>
                  <th className="px-5 py-4" />
                </tr>
              </thead>
              <tbody>
                {filtered.map((donor) => (
                  <tr
                    key={donor.id}
                    className="border-t border-black/10 transition hover:bg-[#fcfaf8]"
                  >
                    <td className="px-5 py-4">
                      <p className="text-sm font-semibold text-ink">
                        {donor.name}
                      </p>
                      <p className="mt-1 text-[10px] uppercase tracking-widest text-black/35">
                        Verified donor
                      </p>
                    </td>
                    <td className="px-5 py-4 font-mono text-xs text-black/55">
                      {donor.id}
                    </td>
                    <td className="px-5 py-4">
                      <span className="border border-maroon/20 bg-maroon/5 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-maroon">
                        {donor.units} units
                      </span>
                    </td>
                    <td className="px-5 py-4 text-xs text-black/55">
                      {donor.lastDonation}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        type="button"
                        data-testid={`generate-certificate-${donor.id}`}
                        onClick={(event) => {
                          event.preventDefault();
                          setSelected({
                            donor,
                            certificateDate: new Date().toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "long",
                              year: "numeric",
                            }),
                            certificateNumber: createCertificateNumber(),
                          });
                        }}
                        className="bg-maroon px-4 py-2.5 text-[10px] font-bold uppercase tracking-[.13em] text-white transition hover:bg-crimson"
                      >
                        Generate certificate
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
      {selected && (
        <Certificate certificate={selected} onClose={() => setSelected(null)} />
      )}
    </main>
  );
}

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  return loggedIn ? (
    <Dashboard onLogout={() => setLoggedIn(false)} />
  ) : (
    <Login onLogin={() => setLoggedIn(true)} />
  );
}

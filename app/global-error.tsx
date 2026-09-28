"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body style={{ margin: 0, background: "#f7f4f1", fontFamily: '"Avenir Next", Avenir, sans-serif' }}>
        <main
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            backgroundImage: "radial-gradient(rgba(122,27,41,.045) .7px, transparent .7px)",
            backgroundSize: "7px 7px",
          }}
        >
          <section
            style={{
              width: "100%",
              maxWidth: "560px",
              background: "#ffffff",
              border: "1px solid rgba(122,27,41,0.2)",
              boxShadow: "0 24px 70px rgba(74,35,35,.12)",
              padding: "48px 32px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: "64px",
                height: "64px",
                margin: "0 auto",
                borderRadius: "9999px",
                border: "2px solid #7A1B29",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "8px",
              }}
            >
              <img
                src="/zbsnlogo.jpeg"
                alt="National Blood Service Zimbabwe logo"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </div>

            <p
              style={{
                marginTop: "32px",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                fontSize: "10px",
                fontWeight: 700,
                color: "#7A1B29",
              }}
            >
              NBSZ system alert
            </p>
            <h1 style={{ marginTop: "12px", fontSize: "44px", color: "#2C2C2C" }}>
              Something isn&apos;t working
            </h1>
            <p style={{ marginTop: "20px", fontSize: "14px", lineHeight: 1.7, color: "rgba(44,44,44,0.7)" }}>
              The certificate workspace hit an unexpected issue. Please try again or return to the dashboard.
            </p>

            <div style={{ marginTop: "32px", display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
              <button
                type="button"
                onClick={() => reset()}
                style={{
                  background: "#7A1B29",
                  color: "#ffffff",
                  border: "none",
                  padding: "12px 20px",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                }}
              >
                Try again
              </button>
              <a
                href="/"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid rgba(122,27,41,0.2)",
                  color: "#7A1B29",
                  background: "#ffffff",
                  padding: "12px 20px",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                }}
              >
                Return to dashboard
              </a>
            </div>

            {error.digest ? (
              <p
                style={{
                  marginTop: "24px",
                  fontSize: "10px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(44,44,44,0.45)",
                }}
              >
                Reference: {error.digest}
              </p>
            ) : null}
          </section>
        </main>
      </body>
    </html>
  );
}

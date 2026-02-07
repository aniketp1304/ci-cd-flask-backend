import { useEffect, useRef, useState } from "react";

function App() {
  const [status, setStatus] = useState("CHECKING");
  const [hideScroll, setHideScroll] = useState(false);

  const bgFar = useRef(null);
  const bgNear = useRef(null);

  /* ===== Backend health ===== */
  useEffect(() => {
    fetch("http://localhost:8080/health")
      .then((r) => (r.ok ? setStatus("ONLINE") : setStatus("OFFLINE")))
      .catch(() => setStatus("OFFLINE"));
  }, []);

  /* ===== Visible parallax (royal depth) ===== */
  useEffect(() => {
    const move = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;

      if (bgFar.current) {
        bgFar.current.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
      }
      if (bgNear.current) {
        bgNear.current.style.transform = `translate(${x * 0.6}px, ${y * 0.6}px)`;
      }
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  /* ===== Scroll CTA hide ===== */
  useEffect(() => {
    const onScroll = () => setHideScroll(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ===== Reveal on scroll ===== */
  useEffect(() => {
    const items = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.25 }
    );
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const statusColor =
    status === "ONLINE"
      ? "#34d399"
      : status === "OFFLINE"
      ? "#f87171"
      : "#9ca3af";

  return (
    <div>
      {/* Background layers */}
      <div
        ref={bgFar}
        style={{
          position: "fixed",
          inset: "-25%",
          background:
            "radial-gradient(circle at 20% 20%, rgba(231,199,135,0.14), transparent 60%)",
          zIndex: -2,
        }}
      />
      <div
        ref={bgNear}
        style={{
          position: "fixed",
          inset: "-25%",
          background:
            "radial-gradient(circle at 80% 70%, rgba(255,255,255,0.05), transparent 55%)",
          zIndex: -1,
        }}
      />

      {/* Scroll CTA */}
      <div
        className={`scroll-cta ${hideScroll ? "hidden" : ""}`}
        onClick={() =>
          document
            .getElementById("details")
            .scrollIntoView({ behavior: "smooth" })
        }
      >
        Scroll
      </div>

      {/* HERO */}
      <section>
        <div>
          <h1
            className="reveal"
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: "64px",
              fontWeight: 600,
              letterSpacing: "-1.5px",
              marginBottom: "24px",
            }}
          >
            AETHER GRID
          </h1>

          <p
            className="reveal"
            style={{
              fontSize: "19px",
              lineHeight: "1.9",
              color: "#b6b6b6",
              maxWidth: "560px",
              marginBottom: "52px",
            }}
          >
            Aether Grid is a refined control surface designed to
            observe, validate, and interact with backend systems
            operating in production environments.
          </p>

          <div className="reveal" style={{ fontSize: 16 }}>
            <span style={{ color: "#9ca3af" }}>Service state:</span>{" "}
            <strong style={{ color: statusColor }}>{status}</strong>
          </div>
        </div>
      </section>

      {/* DETAILS */}
      <section id="details">
        <div style={{ maxWidth: "720px" }}>
          <h2
            className="reveal"
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: "34px",
              marginBottom: "28px",
            }}
          >
            Philosophy
          </h2>

          <p
            className="reveal"
            style={{
              fontSize: 16,
              lineHeight: "2",
              color: "#b6b6b6",
              marginBottom: 28,
            }}
          >
            Aether Grid prioritizes operational clarity over visual
            excess. Every motion, transition, and layout choice exists
            to reinforce trust in the system being observed.
          </p>

          <p
            className="reveal"
            style={{
              fontSize: 16,
              lineHeight: "2",
              color: "#b6b6b6",
            }}
          >
            It reflects how modern cloud and DevOps platforms are
            evaluated — not through decoration, but through consistency,
            responsiveness, and calm confidence.
          </p>

          <div
            className="reveal"
            style={{
              marginTop: 64,
              fontSize: 14,
              letterSpacing: "0.04em",
              color: "#9ca3af",
            }}
          >
            <strong style={{ color: "#f5f5f5" }}>
              Engineered & operated by Aniket Palsodkar
            </strong>
            <br />
            Cloud • DevOps • Production Systems
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
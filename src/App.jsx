import { useEffect, useRef, useState } from "react";

export default function App() {
  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: "", tone: "success" });
  const inputRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    if (!toast.show) return;
    const t = setTimeout(() => setToast((x) => ({ ...x, show: false })), 3000);
    return () => clearTimeout(t);
  }, [toast.show]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;

    setIsSending(true);

    // Simulate a quick async submit
    setTimeout(() => {
      setIsSending(false);
      setToast({
        show: true,
        msg: "Thanks! We’ll let you know when we launch.",
        tone: "success",
      });
      setEmail("");
      // Return focus to input for quick re-entry
      inputRef.current?.focus();
    }, 800);
  }

  return (
    <div className="cn-wrap">
      {/* Background rings */}
      <div className="cn-ring r1"></div>
      <div className="cn-ring r2"></div>

      {/* Toast (polite live region) */}
      <div
        className={`toast ${toast.show ? "toast--show" : ""} toast--${
          toast.tone
        }`}
        role="status"
        aria-live="polite"
      >
        {toast.msg}
      </div>

      {/* Card */}
      <main className="cn-card">
        <header className="brand">
          <img
            src="/Smartnavcolor.png"
            alt="SMARTNAV.AI"
            className="brand__logo"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
        </header>

        <h2 className="h1">
          We’re <span className="accent">coming soon</span>
        </h2>
        <p className="p">
          Moving UAVs beyond simple automation to true, predictive
          intelligence.. Sign up to be the first to know when we launch.
        </p>

        <form className="form" onSubmit={handleSubmit} noValidate>
          <input
            ref={inputRef}
            className="input"
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-label="Email address"
            autoComplete="email"
          />
          <button
            ref={btnRef}
            className="btn"
            type="submit"
            disabled={isSending}
            aria-busy={isSending}
          >
            {isSending ? "Sending…" : "Notify Me"}
          </button>
        </form>

        <div className="fine">
          By subscribing, you agree to receive updates from SMARTNAV.AI.
        </div>

        <footer className="footer">
          <img
            src="/onlylogo.png"
            alt="logo mark"
            className="footer__mark"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
          <span>
            © {new Date().getFullYear()} SMARTNAV.AI • All rights reserved
          </span>
        </footer>
      </main>
    </div>
  );
}

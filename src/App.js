import { useState } from "react";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --ink: #1a1a2e;
    --ink-soft: #4a4a6a;
    --ink-muted: #8888aa;
    --paper: #f7f6f2;
    --paper-warm: #eeeae0;
    --accent: #5b5bd6;
    --accent-light: #ededfc;
    --accent-dark: #3d3d9e;
    --green: #2d7a4f;
    --green-light: #e8f5ee;
    --red: #b94040;
    --red-light: #fdeaea;
    --border: #dddad2;
    --shadow: 0 1px 3px rgba(26,26,46,0.08), 0 4px 16px rgba(26,26,46,0.06);
    --shadow-lg: 0 8px 32px rgba(26,26,46,0.12);
  }

  body {
    font-family: 'Inter', sans-serif;
    background: var(--paper);
    color: var(--ink);
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
  }

  .app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  /* ── HEADER ── */
  .header {
    background: var(--ink);
    padding: 0 40px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .logo {
    font-family: 'DM Serif Display', serif;
    font-size: 20px;
    color: #fff;
    letter-spacing: -0.3px;
  }

  .logo span {
    color: #a5a5f5;
  }

  .header-badge {
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--ink-muted);
    background: rgba(255,255,255,0.07);
    border: 1px solid rgba(255,255,255,0.1);
    padding: 4px 10px;
    border-radius: 20px;
    color: #a5a5f5;
  }

  /* ── HERO ── */
  .hero {
    background: var(--ink);
    padding: 60px 40px 80px;
    text-align: center;
    position: relative;
    overflow: hidden;
  }

  .hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 60% 50% at 50% 100%, rgba(91,91,214,0.25) 0%, transparent 70%);
    pointer-events: none;
  }

  .hero-eyebrow {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #a5a5f5;
    margin-bottom: 20px;
  }

  .hero h1 {
    font-family: 'DM Serif Display', serif;
    font-size: clamp(36px, 5vw, 58px);
    color: #fff;
    line-height: 1.1;
    letter-spacing: -1px;
    margin-bottom: 18px;
    position: relative;
  }

  .hero h1 em {
    font-style: italic;
    color: #a5a5f5;
  }

  .hero-sub {
    font-size: 17px;
    color: rgba(255,255,255,0.55);
    max-width: 480px;
    margin: 0 auto 36px;
    line-height: 1.6;
    font-weight: 300;
  }

  .hero-stats {
    display: flex;
    gap: 32px;
    justify-content: center;
    flex-wrap: wrap;
  }

  .stat {
    text-align: center;
  }

  .stat-num {
    font-family: 'DM Serif Display', serif;
    font-size: 28px;
    color: #fff;
    display: block;
  }

  .stat-label {
    font-size: 12px;
    color: rgba(255,255,255,0.4);
    letter-spacing: 0.04em;
  }

  .stat-divider {
    width: 1px;
    background: rgba(255,255,255,0.1);
    align-self: stretch;
  }

  /* ── MAIN LAYOUT ── */
  .main {
    flex: 1;
    max-width: 900px;
    margin: 0 auto;
    width: 100%;
    padding: 48px 24px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    align-items: start;
  }

  @media (max-width: 700px) {
    .main { grid-template-columns: 1fr; padding: 24px 16px; }
    .hero { padding: 40px 24px 60px; }
    .header { padding: 0 20px; }
    .hero-stats { gap: 20px; }
    .stat-divider { display: none; }
  }

  /* ── CARDS ── */
  .card {
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 28px;
    box-shadow: var(--shadow);
  }

  .card-title {
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--ink-muted);
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .card-title-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--accent);
    flex-shrink: 0;
  }

  /* ── FORM ── */
  .field {
    margin-bottom: 16px;
  }

  .field label {
    display: block;
    font-size: 13px;
    font-weight: 500;
    color: var(--ink-soft);
    margin-bottom: 6px;
  }

  .field select,
  .field textarea,
  .field input {
    width: 100%;
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    color: var(--ink);
    background: var(--paper);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 10px 12px;
    outline: none;
    transition: border-color 0.15s, box-shadow 0.15s;
    resize: vertical;
  }

  .field select:focus,
  .field textarea:focus,
  .field input:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px rgba(91,91,214,0.1);
    background: #fff;
  }

  .field textarea {
    min-height: 110px;
    line-height: 1.55;
  }

  .char-count {
    font-size: 11px;
    color: var(--ink-muted);
    text-align: right;
    margin-top: 4px;
  }

  /* ── GENERATE BUTTON ── */
  .btn-generate {
    width: 100%;
    padding: 14px;
    background: var(--accent);
    color: #fff;
    border: none;
    border-radius: 10px;
    font-family: 'Inter', sans-serif;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.15s, transform 0.1s, box-shadow 0.15s;
    margin-top: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    box-shadow: 0 2px 8px rgba(91,91,214,0.3);
  }

  .btn-generate:hover:not(:disabled) {
    background: var(--accent-dark);
    box-shadow: 0 4px 16px rgba(91,91,214,0.4);
  }

  .btn-generate:active:not(:disabled) {
    transform: scale(0.99);
  }

  .btn-generate:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }

  .spinner {
    width: 16px;
    height: 16px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
    flex-shrink: 0;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  /* ── OUTPUT ── */
  .output-card {
    grid-row: span 2;
  }

  .output-empty {
    min-height: 320px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 12px;
    color: var(--ink-muted);
  }

  .output-empty-icon {
    font-size: 40px;
    opacity: 0.4;
  }

  .output-empty p {
    font-size: 14px;
    line-height: 1.5;
    max-width: 220px;
  }

  .soap-output {
    font-family: 'JetBrains Mono', monospace;
    font-size: 12.5px;
    line-height: 1.7;
    color: var(--ink);
    white-space: pre-wrap;
    word-break: break-word;
  }

  .soap-section-header {
    font-weight: 500;
    color: var(--accent);
    letter-spacing: 0.04em;
  }

  .output-actions {
    display: flex;
    gap: 10px;
    margin-top: 20px;
    padding-top: 16px;
    border-top: 1px solid var(--border);
  }

  .btn-secondary {
    flex: 1;
    padding: 9px 14px;
    border-radius: 8px;
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.15s;
    border: 1px solid var(--border);
    background: var(--paper);
    color: var(--ink-soft);
  }

  .btn-secondary:hover {
    background: var(--paper-warm);
    border-color: #ccc;
  }

  .btn-copy {
    background: var(--green-light);
    border-color: #b2dcc4;
    color: var(--green);
  }

  .btn-copy:hover {
    background: #d4edde;
  }

  .copied-check {
    color: var(--green);
    font-weight: 600;
  }

  /* ── TIPS CARD ── */
  .tips-card {
    background: var(--accent-light);
    border-color: #c5c5f0;
  }

  .tip {
    display: flex;
    gap: 10px;
    margin-bottom: 12px;
    font-size: 13px;
    color: var(--ink-soft);
    line-height: 1.5;
  }

  .tip:last-child { margin-bottom: 0; }

  .tip-icon {
    font-size: 14px;
    flex-shrink: 0;
    margin-top: 1px;
  }

  /* ── ERROR ── */
  .error-banner {
    background: var(--red-light);
    border: 1px solid #e5b5b5;
    border-radius: 8px;
    padding: 12px 14px;
    font-size: 13px;
    color: var(--red);
    margin-top: 12px;
    line-height: 1.5;
  }

  /* ── FOOTER ── */
  .footer {
    background: var(--paper-warm);
    border-top: 1px solid var(--border);
    padding: 20px 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: gap;
    gap: 12px;
  }

  .footer-text {
    font-size: 12px;
    color: var(--ink-muted);
  }

  .hipaa-badge {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--green);
    background: var(--green-light);
    border: 1px solid #b2dcc4;
    padding: 5px 10px;
    border-radius: 20px;
  }

  /* ── LOADING SKELETON ── */
  .skeleton-line {
    height: 12px;
    background: linear-gradient(90deg, #eee 25%, #f5f5f5 50%, #eee 75%);
    background-size: 200% 100%;
    animation: shimmer 1.3s infinite;
    border-radius: 4px;
    margin-bottom: 10px;
  }

  .skeleton-line:last-child { width: 60%; }

  @keyframes shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }

  /* ── PROGRESS ── */
  .progress-bar {
    height: 2px;
    background: var(--accent-light);
    border-radius: 1px;
    margin-bottom: 16px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: var(--accent);
    border-radius: 1px;
    animation: progress 2.5s ease-in-out infinite;
  }

  @keyframes progress {
    0% { width: 0%; margin-left: 0; }
    50% { width: 70%; margin-left: 0; }
    100% { width: 0%; margin-left: 100%; }
  }
`;

const SYSTEM_PROMPT = `You are a clinical documentation assistant helping therapists write professional SOAP notes. 
Generate a complete, professional SOAP note based on the therapist's session summary.

Format the output EXACTLY as follows (use these exact headers):

SUBJECTIVE
[Client's reported experiences, feelings, complaints, and self-reported progress. Write in third person. 2-4 sentences.]

OBJECTIVE
[Observable, measurable, and factual information: affect, behavior, appearance, engagement level, any assessments used. 2-3 sentences.]

ASSESSMENT
[Clinical interpretation: progress toward goals, diagnostic impressions, risk factors, clinical reasoning. 2-3 sentences.]

PLAN
[Next steps: interventions planned, homework assigned, referrals, next appointment, any adjustments to treatment plan. 2-4 sentences.]

Write clinically but clearly. Use appropriate therapeutic terminology. Do not include any preamble or explanation — output only the SOAP note itself.`;

const MODALITIES = [
  "CBT (Cognitive Behavioral Therapy)",
  "DBT (Dialectical Behavior Therapy)",
  "Psychodynamic",
  "Person-Centered / Rogerian",
  "EMDR",
  "ACT (Acceptance & Commitment Therapy)",
  "Solution-Focused",
  "Trauma-Informed Care",
  "Motivational Interviewing",
  "Somatic / Body-Based",
  "Other / Mixed",
];

const SESSION_TYPES = ["Individual", "Couples", "Family", "Group"];

export default function SOAPNoteGenerator() {
  const [form, setForm] = useState({
    sessionType: "Individual",
    modality: "CBT (Cognitive Behavioral Therapy)",
    summary: "",
    goals: "",
    riskNotes: "",
  });
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const canGenerate = form.summary.trim().length > 20 && !loading;

  const generate = async () => {
    setLoading(true);
    setError("");
    setOutput("");

    const userMessage = `Session type: ${form.sessionType}
Therapeutic modality: ${form.modality}
${form.goals ? `Treatment goals: ${form.goals}` : ""}
${form.riskNotes ? `Risk/safety notes: ${form.riskNotes}` : ""}

Session summary:
${form.summary}

Generate a professional SOAP note.`;

    try {
      const res = await fetch("http://localhost:3001/generate", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    systemPrompt: SYSTEM_PROMPT,
    userMessage: userMessage,
  }),
});

const data = await res.json();

if (!res.ok) {
  throw new Error(data?.error || "API error");
}

const text = data.text || "";
      setOutput(text);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const reset = () => {
    setOutput("");
    setForm((f) => ({ ...f, summary: "", goals: "", riskNotes: "" }));
  };

  // Render SOAP output with colored headers
  const renderOutput = (text) => {
    if (!text) return null;
    return text.split("\n").map((line, i) => {
      const isHeader = /^(SUBJECTIVE|OBJECTIVE|ASSESSMENT|PLAN)/.test(line.trim());
      return (
        <span key={i}>
          {isHeader ? (
            <span className="soap-section-header">{line}</span>
          ) : (
            line
          )}
          {"\n"}
        </span>
      );
    });
  };

  return (
    <>
      <style>{STYLES}</style>
      <div className="app">
        {/* Header */}
        <header className="header">
          <div className="logo">Note<span>craft</span></div>
          <div className="header-badge">Clinical Documentation AI</div>
        </header>

        {/* Hero */}
        <section className="hero">
          <p className="hero-eyebrow">Built for therapists, counselors & social workers</p>
          <h1>Your session notes,<br /><em>written in seconds.</em></h1>
          <p className="hero-sub">
            Describe what happened in plain language. Get a polished, professional SOAP note — ready to paste into any EHR.
          </p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-num">45 min</span>
              <span className="stat-label">saved per day</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-num">~15s</span>
              <span className="stat-label">per note</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-num">DSM-5</span>
              <span className="stat-label">aligned language</span>
            </div>
          </div>
        </section>

        {/* Main */}
        <main className="main">
          {/* Input Card */}
          <div className="card">
            <div className="card-title">
              <div className="card-title-dot" />
              Session Details
            </div>

            <div className="field">
              <label>Session Type</label>
              <select value={form.sessionType} onChange={(e) => set("sessionType", e.target.value)}>
                {SESSION_TYPES.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>

            <div className="field">
              <label>Therapeutic Modality</label>
              <select value={form.modality} onChange={(e) => set("modality", e.target.value)}>
                {MODALITIES.map((m) => <option key={m}>{m}</option>)}
              </select>
            </div>

            <div className="field">
              <label>Session Summary <span style={{ color: "#b94040" }}>*</span></label>
              <textarea
                placeholder="Describe what happened in the session in your own words. Client presented with... We discussed... Client reported..."
                value={form.summary}
                onChange={(e) => set("summary", e.target.value)}
                rows={5}
              />
              <div className="char-count">{form.summary.length} chars</div>
            </div>

            <div className="field">
              <label>Active Treatment Goals <span style={{ color: "var(--ink-muted)", fontWeight: 400 }}>(optional)</span></label>
              <textarea
                placeholder="e.g. Reduce panic attacks, improve emotion regulation, process grief..."
                value={form.goals}
                onChange={(e) => set("goals", e.target.value)}
                rows={2}
              />
            </div>

            <div className="field">
              <label>Risk / Safety Notes <span style={{ color: "var(--ink-muted)", fontWeight: 400 }}>(optional)</span></label>
              <textarea
                placeholder="e.g. No SI/HI, safety plan reviewed, PHQ-9 administered..."
                value={form.riskNotes}
                onChange={(e) => set("riskNotes", e.target.value)}
                rows={2}
              />
            </div>

            <button className="btn-generate" onClick={generate} disabled={!canGenerate}>
              {loading ? (
                <>
                  <div className="spinner" />
                  Writing your note…
                </>
              ) : (
                "Generate SOAP Note →"
              )}
            </button>

            {error && <div className="error-banner">⚠️ {error}</div>}
          </div>

          {/* Output Card */}
          <div className="card output-card">
            <div className="card-title">
              <div className="card-title-dot" style={{ background: output ? "var(--green)" : "var(--ink-muted)" }} />
              Generated SOAP Note
            </div>

            {loading && (
              <>
                <div className="progress-bar"><div className="progress-fill" /></div>
                {[100, 85, 92, 70, 100, 60].map((w, i) => (
                  <div key={i} className="skeleton-line" style={{ width: `${w}%` }} />
                ))}
              </>
            )}

            {!loading && !output && (
              <div className="output-empty">
                <div className="output-empty-icon">📋</div>
                <p>Fill in your session details and click Generate to create your SOAP note.</p>
              </div>
            )}

            {!loading && output && (
              <>
                <div className="soap-output">{renderOutput(output)}</div>
                <div className="output-actions">
                  <button className={`btn-secondary btn-copy`} onClick={copyToClipboard}>
                    {copied ? <span className="copied-check">✓ Copied!</span> : "Copy Note"}
                  </button>
                  <button className="btn-secondary" onClick={reset}>
                    New Note
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Tips Card */}
          <div className="card tips-card">
            <div className="card-title" style={{ color: "#5050b8" }}>
              <div className="card-title-dot" style={{ background: "#5b5bd6" }} />
              Tips for better notes
            </div>
            <div className="tip">
              <span className="tip-icon">✍️</span>
              <span>Write your summary naturally — no clinical jargon needed. The AI translates it.</span>
            </div>
            <div className="tip">
              <span className="tip-icon">🎯</span>
              <span>Adding treatment goals ties the Assessment section to measurable outcomes.</span>
            </div>
            <div className="tip">
              <span className="tip-icon">⚠️</span>
              <span>Always document SI/HI status and safety planning in the Risk field for compliance.</span>
            </div>
            <div className="tip">
              <span className="tip-icon">✅</span>
              <span>Review every note before filing — you are the clinician of record, not the AI.</span>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="footer">
          <p className="footer-text">Notecraft · For solo practitioners & group practices · Notes are not stored</p>
          <div className="hipaa-badge">
            🔒 Notes not stored
          </div>
        </footer>
      </div>
    </>
  );
}
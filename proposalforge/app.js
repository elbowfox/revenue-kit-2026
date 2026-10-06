(function () {
  const cfg = window.PF_CONFIG;
  const $ = (id) => document.getElementById(id);
  const fields = ["fromName","fromEmail","client","title","summary","items","timeline","deposit","valid","terms"];
  const buy = $("buy");
  if (buy) buy.href = cfg.checkoutUrl;
  function licensed() { return localStorage.getItem("pf_license") === "yes"; }
  function money(n) {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n || 0);
  }
  function parseItems(text) {
    return text.split("\n").map((line) => line.trim()).filter(Boolean).map((line) => {
      const parts = line.split("|");
      const name = (parts[0] || "Item").trim();
      const amount = Number(String(parts[1] || "0").replace(/[^0-9.]/g, "")) || 0;
      return { name, amount };
    });
  }
  function render() {
    const data = Object.fromEntries(fields.map((id) => [id, $(id).value]));
    const items = parseItems(data.items);
    const total = items.reduce((s, i) => s + i.amount, 0);
    const depositPct = Math.min(100, Math.max(0, Number(data.deposit) || 0));
    const num = "PF-" + Math.abs(hash(data.client + data.title)).toString().slice(0, 4);
    $("dMeta").textContent = "Proposal " + num + " · valid " + (data.valid || 14) + " days";
    $("dTitle").textContent = data.title || "Untitled proposal";
    $("dSummary").textContent = data.summary;
    $("dItems").innerHTML = items.map((i) => `<div class="line-item"><span>${escapeHtml(i.name)}</span><span>${money(i.amount)}</span></div>`).join("");
    $("dTotal").innerHTML = `<span>Total</span><span>${money(total)}</span>`;
    $("dDeposit").textContent = `To start: ${depositPct}% deposit (${money(total * depositPct / 100)}). Balance due at delivery.`;
    $("dTimeline").textContent = data.timeline;
    $("dTerms").textContent = data.terms;
    $("dFrom").textContent = data.fromName + " · " + data.fromEmail + " · prepared for " + data.client;
    const wm = $("wm");
    if (licensed()) { wm.style.display = "none"; $("status").textContent = "Licensed"; }
    else { wm.style.display = "block"; wm.textContent = cfg.watermark; $("status").textContent = "Free · watermarked"; }
    localStorage.setItem("pf_draft", JSON.stringify(data));
  }
  function hash(str) { let h = 0; for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0; return h; }
  function escapeHtml(s) { return String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])); }
  const saved = localStorage.getItem("pf_draft");
  if (saved) { try { const data = JSON.parse(saved); fields.forEach((id) => { if (data[id] != null) $(id).value = data[id]; }); } catch (e) {} }
  fields.forEach((id) => $(id).addEventListener("input", render));
  $("unlock").addEventListener("click", () => {
    const key = $("license").value.trim();
    if (cfg.demoKeys.includes(key) || /^PF-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(key)) {
      localStorage.setItem("pf_license", "yes");
      render();
    } else {
      alert("That key is not recognized. Use a demo key (PF-DEMO-2026) or a key shaped like PF-AB12-CD34 after you wire real checkout.");
    }
  });
  $("print").addEventListener("click", () => window.print());
  render();
})();

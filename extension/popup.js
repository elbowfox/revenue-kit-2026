const out = document.getElementById("out");
document.getElementById("cap").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id) return;
  const [{ result }] = await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => ({
      title: document.title,
      url: location.href,
      selection: (window.getSelection() || "").toString().trim().slice(0, 2000)
    })
  });
  const brief = [
    "# Client brief",
    "",
    "Source: " + (result?.title || tab.title || ""),
    result?.url || tab.url || "",
    "",
    "## Highlight",
    result?.selection || "(no text highlighted — add the ask in your own words)",
    "",
    "## Proposed next step",
    "- Confirm scope",
    "- Send a fixed price and deposit",
    "- Book only after deposit clears"
  ].join("\n");
  out.value = brief;
  const prev = await chrome.storage.local.get({ briefs: [] });
  prev.briefs.unshift({ at: Date.now(), brief });
  await chrome.storage.local.set({ briefs: prev.briefs.slice(0, 30) });
});
document.getElementById("copy").addEventListener("click", async () => {
  await navigator.clipboard.writeText(out.value);
});

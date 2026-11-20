const statusEl = document.getElementById("status");
const remote = document.getElementById("remote");
async function refreshStatus() {
  try {
    const r = await fetch("/api/status");
    const data = await r.json();
    statusEl.textContent = data.ready ? "Remote browser ready" : "Starting remote browser…";
    statusEl.previousElementSibling.style.background = data.ready ? "#56d69a" : "#e2ad54";
  } catch {
    statusEl.textContent = "Connection unavailable";
  }
}
refreshStatus();
setInterval(refreshStatus, 5000);

document.getElementById("fullscreen").addEventListener("click", async () => {
  const frame = document.getElementById("browserFrame");
  if (!document.fullscreenElement) await frame.requestFullscreen();
  else await document.exitFullscreen();
});
const panel = document.getElementById("locationPanel");
document.getElementById("locationToggle").onclick = () => panel.hidden = !panel.hidden;
document.getElementById("closeLocation").onclick = () => panel.hidden = true;

document.getElementById("applyLocation").onclick = async () => {
  const latitude = Number(document.getElementById("latitude").value);
  const longitude = Number(document.getElementById("longitude").value);
  const message = document.getElementById("locationMessage");
  message.textContent = "Applying…";
  try {
    const r = await fetch("/api/geolocation", {
      method: "POST", headers: {"Content-Type":"application/json"},
      body: JSON.stringify({latitude, longitude})
    });
    const data = await r.json();
    message.textContent = data.message || data.error || "Could not apply location.";
  } catch { message.textContent = "Could not contact Orbit."; }
};
document.getElementById("clearLocation").onclick = async () => {
  const message = document.getElementById("locationMessage");
  try {
    const r = await fetch("/api/geolocation/clear", {method:"POST"});
    const data = await r.json();
    message.textContent = data.message || data.error;
  } catch { message.textContent = "Could not contact Orbit."; }
};

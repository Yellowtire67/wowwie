const express = require("express");
const { chromium } = require("playwright-core");
const path = require("path");

const app = express();
app.use(express.json({ limit: "1mb" }));
app.use(express.static(path.join(__dirname, "public")));

let browser;
async function getContext() {
  if (!browser || !browser.isConnected()) {
    browser = await chromium.connectOverCDP("http://127.0.0.1:9222");
  }
  const contexts = browser.contexts();
  if (!contexts.length) throw new Error("The remote browser is not ready yet.");
  return contexts[0];
}

app.get("/api/status", async (_req, res) => {
  try {
    const context = await getContext();
    res.json({ ready: true, pages: context.pages().length });
  } catch (e) {
    res.status(503).json({ ready: false, error: e.message });
  }
});

app.post("/api/geolocation", async (req, res) => {
  const { latitude, longitude } = req.body || {};
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude) ||
      latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
    return res.status(400).json({ error: "Enter valid latitude and longitude." });
  }
  try {
    const context = await getContext();
    await context.grantPermissions(["geolocation"]);
    await context.setGeolocation({ latitude, longitude, accuracy: 100 });
    res.json({ ok: true, message: "Browser geolocation updated. Reload the website to apply it." });
  } catch (e) {
    res.status(503).json({ error: e.message });
  }
});

app.post("/api/geolocation/clear", async (_req, res) => {
  try {
    const context = await getContext();
    await context.clearPermissions();
    await context.setGeolocation(null);
    res.json({ ok: true, message: "Browser geolocation override cleared." });
  } catch (e) {
    res.status(503).json({ error: e.message });
  }
});

app.listen(3000, "127.0.0.1", () => console.log("Orbit control service listening on 3000"));

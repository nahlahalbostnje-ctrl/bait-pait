import * as THREE from "three";

function canvas(w: number, h: number) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d");
  if (!ctx) throw new Error("ctx");
  return { c, ctx };
}

function toTex(c: HTMLCanvasElement) {
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  t.needsUpdate = true;
  return t;
}

export function makeAiScreen() {
  const { c, ctx } = canvas(1600, 1000);
  const g = ctx.createRadialGradient(900, 200, 40, 800, 500, 900);
  g.addColorStop(0, "#1e1140");
  g.addColorStop(0.45, "#0a0618");
  g.addColorStop(1, "#041016");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 1600, 1000);

  ctx.fillStyle = "rgba(103,232,249,0.08)";
  for (let i = 0; i < 22; i += 1) ctx.fillRect(0, i * 46, 1600, 1);

  ctx.fillStyle = "#67E8F9";
  ctx.font = "700 34px 'Plus Jakarta Sans', sans-serif";
  ctx.fillText("NEURAL ENGINE", 64, 72);
  ctx.fillStyle = "rgba(192,132,252,0.95)";
  ctx.font = "600 20px 'Plus Jakarta Sans', sans-serif";
  ctx.fillText("multimodal  ·  48 TFLOPS  ·  realtime inference", 64, 108);

  ctx.strokeStyle = "#22D3EE";
  ctx.shadowColor = "#22D3EE";
  ctx.shadowBlur = 18;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(64, 250);
  for (let x = 0; x < 1470; x += 6) {
    const y = 250 + Math.sin(x * 0.018) * 58 + Math.sin(x * 0.07) * 18;
    ctx.lineTo(64 + x, y);
  }
  ctx.stroke();
  ctx.shadowBlur = 0;

  const bars = [0.45, 0.72, 0.38, 0.94, 0.66, 0.5, 0.84, 0.58, 0.91, 0.4];
  bars.forEach((b, i) => {
    const grd = ctx.createLinearGradient(0, 900, 0, 900 - b * 220);
    grd.addColorStop(0, "#06B6D4");
    grd.addColorStop(1, "#C084FC");
    ctx.fillStyle = grd;
    ctx.fillRect(64 + i * 148, 900 - b * 220, 110, b * 220);
  });

  ctx.fillStyle = "rgba(226,232,240,0.88)";
  ctx.font = "600 22px ui-monospace, monospace";
  ctx.fillText("architecture.generate(vision)", 64, 420);
  ctx.fillText("accuracy     99.41%", 64, 456);
  ctx.fillStyle = "#34D399";
  ctx.fillText("core         ONLINE", 64, 492);
  return toTex(c);
}

export function makeCodeScreen() {
  const { c, ctx } = canvas(768, 1400);
  const g = ctx.createLinearGradient(0, 0, 0, 1400);
  g.addColorStop(0, "#12081f");
  g.addColorStop(1, "#061018");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 768, 1400);

  ctx.fillStyle = "#67E8F9";
  ctx.font = "800 40px 'Plus Jakarta Sans', sans-serif";
  ctx.fillText("BAIT PAIT", 48, 90);
  ctx.fillStyle = "#94A3B8";
  ctx.font = "500 22px ui-monospace, monospace";
  [
    "const mind = await AI.think();",
    "cloud.scale(Infinity);",
    "ship.product();",
    "",
    "model    frontier",
    "latency  9ms",
    "status   live",
  ].forEach((l, i) => {
    ctx.fillStyle = i < 3 ? "#DDD6FE" : "#67E8F9";
    ctx.fillText(l, 48, 200 + i * 46);
  });

  const card = ctx.createLinearGradient(48, 620, 720, 900);
  card.addColorStop(0, "#EC4899");
  card.addColorStop(1, "#7C3AED");
  ctx.fillStyle = card;
  ctx.beginPath();
  ctx.roundRect(48, 620, 672, 280, 36);
  ctx.fill();
  ctx.fillStyle = "#fff";
  ctx.font = "800 40px Tajawal, sans-serif";
  ctx.fillText("مساعد ذكي", 80, 730);
  ctx.font = "500 26px Tajawal, sans-serif";
  ctx.fillText("صمم · برمج · أطلق", 80, 790);
  return toTex(c);
}

export function makeAppScreen() {
  const { c, ctx } = canvas(1200, 800);
  const g = ctx.createLinearGradient(0, 0, 1200, 800);
  g.addColorStop(0, "#22104a");
  g.addColorStop(1, "#06202c");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 1200, 800);
  ctx.fillStyle = "#F5F3FF";
  ctx.font = "800 44px 'Plus Jakarta Sans', sans-serif";
  ctx.fillText("INTELLIGENCE OS", 50, 80);
  ["Clients", "Models", "Uptime"].forEach((label, i) => {
    ctx.fillStyle = "rgba(255,255,255,0.08)";
    ctx.beginPath();
    ctx.roundRect(50 + i * 370, 130, 340, 170, 28);
    ctx.fill();
    ctx.fillStyle = "#67E8F9";
    ctx.font = "800 48px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText(["+400", "24", "99.99%"][i], 78 + i * 370, 220);
    ctx.fillStyle = "#CBD5E1";
    ctx.font = "600 20px sans-serif";
    ctx.fillText(label, 78 + i * 370, 262);
  });
  ctx.strokeStyle = "#F472B6";
  ctx.shadowColor = "#EC4899";
  ctx.shadowBlur = 16;
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(50, 560);
  ctx.bezierCurveTo(280, 380, 620, 680, 1150, 430);
  ctx.stroke();
  return toTex(c);
}

export function makeCodePanel() {
  const { c, ctx } = canvas(720, 460);
  ctx.fillStyle = "rgba(10,6,22,0.92)";
  ctx.fillRect(0, 0, 720, 460);
  ctx.strokeStyle = "rgba(192,132,252,0.45)";
  ctx.strokeRect(10, 10, 700, 440);
  ctx.fillStyle = "#67E8F9";
  ctx.font = "600 22px ui-monospace, monospace";
  [
    "deploy.pipeline()",
    "latency   9ms",
    "models    24",
    "status    LIVE",
    "uptime    99.99%",
  ].forEach((l, i) => {
    ctx.fillStyle = i === 0 ? "#DDD6FE" : i === 3 ? "#34D399" : "#67E8F9";
    ctx.fillText(l, 36, 70 + i * 62);
  });
  return toTex(c);
}

export function makeHoloScreen() {
  const { c, ctx } = canvas(900, 500);
  ctx.clearRect(0, 0, 900, 500);
  ctx.fillStyle = "rgba(8,6,20,0.35)";
  ctx.fillRect(0, 0, 900, 500);
  ctx.strokeStyle = "rgba(103,232,249,0.55)";
  ctx.strokeRect(16, 16, 868, 468);
  ctx.fillStyle = "#67E8F9";
  ctx.font = "700 28px 'Plus Jakarta Sans', sans-serif";
  ctx.fillText("VISION  ·  LLM  ·  EDGE", 40, 70);
  ctx.fillStyle = "rgba(233,213,255,0.9)";
  ctx.font = "500 20px ui-monospace, monospace";
  ctx.fillText("rendering cinematic intelligence…", 40, 120);
  ctx.fillText("gpu cluster   8×", 40, 160);
  ctx.fillText("tokens / s    128k", 40, 200);
  return toTex(c);
}

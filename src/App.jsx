import { useState, useEffect } from "react";

// ─── Palette ────────────────────────────────────────────────────────────────
const C = {
  pinkBg:     "#fff5f7",
  pinkLight:  "#FBD9D9",
  pinkMid:    "#f0a0a8",
  pinkDark:   "#b5555f",
  pinkText:   "#7a2a32",

  blueBg:     "#f0f8ff",
  blueLight:  "#B8E2F2",
  blueMid:    "#7bc4e0",
  blueDark:   "#3a87b0",
  blueText:   "#1a5070",

  lavBg:      "#f5f0ff",
  lavLight:   "#e8d8f8",
  lavMid:     "#c4a0e0",
  lavText:    "#5a3080",

  mintBg:     "#f0fbf5",
  mintLight:  "#c8eedd",
  mintMid:    "#7dcca8",
  mintText:   "#2a6b50",

  cream:      "#fffaf8",
  border:     "#f0dde0",
  borderBlue: "#cce8f4",
  textMain:   "#3d2c2c",
  textMuted:  "#9a8585",
  textSoft:   "#c4adb0",
  white:      "#ffffff",
};

const P = {
  lift:    { bg: C.pinkLight,  border: C.pinkMid,  label: C.pinkDark,  text: C.pinkText },
  pilates: { bg: C.mintLight,  border: C.mintMid,  label: C.mintText,  text: C.mintText },
  run:     { bg: C.blueLight,  border: C.blueMid,  label: C.blueDark,  text: C.blueText },
  rest:    { bg: "#f5eeee",    border: "#e8d5d5",  label: C.textMuted, text: C.textMuted },
  push:    { bg: C.pinkLight,  border: C.pinkMid,  label: C.pinkDark,  text: C.pinkText },
  pull:    { bg: C.blueLight,  border: C.blueMid,  label: C.blueDark,  text: C.blueText },
  legs:    { bg: C.lavLight,   border: C.lavMid,   label: C.lavText,   text: C.lavText  },
};

const MEAL_BADGE = {
  "Pre-run": { bg: C.blueLight,  color: C.blueText },
  Breakfast: { bg: "#fef3e2",    color: "#a06020" },
  Lunch:     { bg: C.mintLight,  color: C.mintText },
  Snack:     { bg: C.pinkLight,  color: C.pinkText },
  Dinner:    { bg: C.lavLight,   color: C.lavText  },
};

// ─── Data ────────────────────────────────────────────────────────────────────
const LUNCH_ROTATION = [
  { name: "Tuna rice bowl",          desc: "100g canned tuna, 80g rice, cucumber, avocado, soy sauce",         kcal: 450, protein: 32 },
  { name: "Egg & veggie wrap",       desc: "2 eggs, spinach, tomato, feta, wholegrain wrap",                   kcal: 440, protein: 28 },
  { name: "Lentil & roasted veg",    desc: "150g lentils, roasted zucchini & capsicum, tahini drizzle",        kcal: 420, protein: 22 },
  { name: "Cottage cheese bowl",     desc: "150g cottage cheese, 60g quinoa, cherry tomatoes, cucumber",       kcal: 410, protein: 30 },
  { name: "Chicken soba salad",      desc: "100g grilled chicken, soba, edamame, sesame dressing",             kcal: 460, protein: 35 },
  { name: "Tofu stir-fry",           desc: "150g firm tofu, bok choy, broccoli, 70g brown rice, ginger soy",  kcal: 400, protein: 25 },
  { name: "Salmon rice bowl",        desc: "100g canned salmon, 80g rice, cucumber, avocado, soy sauce",       kcal: 455, protein: 34 },
];

const WORKOUTS = {
  push: {
    label: "Push", subtitle: "Chest · Shoulders · Triceps", color: "push",
    exercises: [
      { name: "DB Bench Press",            sets: 3, reps: "10–12", note: "Flat bench, controlled descent" },
      { name: "Incline DB Press",          sets: 3, reps: "10–12", note: "45° incline, squeeze at top" },
      { name: "DB Lateral Raise",          sets: 3, reps: "12–15", note: "Slight bend in elbows" },
      { name: "Seated DB Overhead Press",  sets: 3, reps: "10–12", note: "Don't lock elbows at top" },
      { name: "DB Tricep Kickback",        sets: 3, reps: "12",    note: "Keep upper arm still" },
      { name: "Tricep Overhead Extension", sets: 2, reps: "12",    note: "Both hands on one dumbbell" },
    ],
  },
  pull: {
    label: "Pull", subtitle: "Back · Biceps", color: "pull",
    exercises: [
      { name: "DB Bent-Over Row",   sets: 3, reps: "10–12",  note: "Hinge at hips, flat back" },
      { name: "Single-Arm DB Row",  sets: 3, reps: "10 each",note: "Knee on bench for support" },
      { name: "DB Reverse Fly",     sets: 3, reps: "12–15",  note: "Slight bend in elbows" },
      { name: "DB Shrug",           sets: 3, reps: "15",     note: "Hold 1 sec at top" },
      { name: "DB Bicep Curl",      sets: 3, reps: "12",     note: "Don't swing at the top" },
      { name: "Hammer Curl",        sets: 2, reps: "12",     note: "Neutral grip, slow down" },
    ],
  },
  legs: {
    label: "Legs & Core", subtitle: "Legs · Glutes · Core", color: "legs",
    exercises: [
      { name: "DB Goblet Squat",       sets: 3, reps: "12",     note: "Hold DB at chest, knees out" },
      { name: "DB Romanian Deadlift",  sets: 3, reps: "10–12",  note: "Hinge hips, slight knee bend" },
      { name: "DB Reverse Lunge",      sets: 3, reps: "10 each",note: "Step back, front shin vertical" },
      { name: "DB Step-Up (bench)",    sets: 3, reps: "10 each",note: "Drive through heel" },
      { name: "DB Calf Raise",         sets: 3, reps: "15",     note: "Pause at top and bottom" },
      { name: "Plank",                 sets: 3, reps: "30–45s", note: "Hips level, breathe normally" },
    ],
  },
};

const SCHEDULE = [
  { day: "Monday",    short: "MON", activity: "Lift — Push", icon: "💪", tag: "lift",    workout: "push" },
  { day: "Tuesday",   short: "TUE", activity: "Pilates",     icon: "🧘", tag: "pilates", workout: null },
  { day: "Wednesday", short: "WED", activity: "Lift — Pull", icon: "💪", tag: "lift",    workout: "pull" },
  { day: "Thursday",  short: "THU", activity: "Lift — Legs", icon: "💪", tag: "lift",    workout: "legs" },
  { day: "Friday",    short: "FRI", activity: "Rest",        icon: "😴", tag: "rest",    workout: null },
  { day: "Saturday",  short: "SAT", activity: "Easy Run",    icon: "🏃", tag: "run",     workout: null },
  { day: "Sunday",    short: "SUN", activity: "Rest",        icon: "😴", tag: "rest",    workout: null },
];

const GROCERIES = [
  { category: "Protein",    emoji: "🥩", items: ["Ground beef (700g)", "Canned tuna (3 × 100g)", "Chicken breast (200g)", "Firm tofu (150g)", "Eggs (1 dozen)", "Unflavoured protein powder"] },
  { category: "Dairy",      emoji: "🥛", items: ["Greek yogurt (700g)", "Cottage cheese (150g)", "Feta cheese (small block)"] },
  { category: "Grains",     emoji: "🌾", items: ["Brown rice (500g)", "Quinoa (200g)", "Soba noodles (1 pack)", "Wholegrain wraps (4–6 pack)"] },
  { category: "Fruit",      emoji: "🍎", items: ["Apples (4–5)", "Bananas (2–3)", "Mixed berries (500g)"] },
  { category: "Vegetables", emoji: "🥦", items: ["Cabbage (1 head)", "Kale (1 bunch)", "Baby spinach (200g)", "Tomatoes (4–5)", "Cherry tomatoes (punnet)", "Cucumber (2)", "Avocado (3–4)", "Zucchini (2)", "Capsicum (2)", "Bok choy (1 bunch)", "Broccoli (1 head)", "Edamame frozen (200g)"] },
  { category: "Pantry",     emoji: "🫙", items: ["Chia seeds (200g)", "Chickpeas (2 × 400g cans)", "Lentils (400g can)", "Almonds (small bag)", "Soy sauce", "Tahini", "Sesame oil", "Ginger"] },
];

function getLunch(w, d) { return LUNCH_ROTATION[(w * 7 + d) % LUNCH_ROTATION.length]; }

function buildDays(weekIndex) {
  return SCHEDULE.map((d, i) => {
    const lunch = getLunch(weekIndex, i);
    const isLift = d.tag === "lift", isRun = d.tag === "run", withPowder = isLift || isRun;
    const meals = [];
    if (isRun) meals.push({ type: "Pre-run",  food: "½ banana (30 min before)", kcal: 45, protein: 0 });
    meals.push({ type: "Breakfast", food: `Greek yogurt + chia seeds + ½ apple + berries${withPowder ? " + protein powder" : ""}`, kcal: withPowder ? 480 : 380, protein: withPowder ? 38 : 15 });
    meals.push({ type: "Lunch",     food: `${lunch.name}: ${lunch.desc}`, kcal: lunch.kcal, protein: lunch.protein });
    if (isLift) meals.push({ type: "Snack",   food: "2 boiled eggs", kcal: 140, protein: 12 });
    meals.push({ type: "Dinner",    food: "Beef & chickpea soup with cabbage, tomato, kale, spinach", kcal: 480, protein: 38 });
    return { ...d, meals };
  });
}

// ─── Weight Chart ─────────────────────────────────────────────────────────────
function WeightChart({ weights, startW, goalW }) {
  const W = 340, H = 160, PL = 38, PR = 16, PT = 16, PB = 28;
  const iW = W - PL - PR, iH = H - PT - PB;

  // Build points: start at week 0 = startW, then each logged entry
  const allPoints = [{ week: -0.5, kg: startW }, ...weights];
  const maxWeek = Math.max(weights.length > 0 ? weights[weights.length - 1].week : 0, 3);
  const minKg = Math.min(goalW - 0.5, ...weights.map(w => w.kg));
  const maxKg = Math.max(startW + 0.3, ...weights.map(w => w.kg));
  const kgRange = maxKg - minKg || 1;

  const xOf = week => PL + ((week + 0.5) / (maxWeek + 0.5)) * iW;
  const yOf = kg => PT + (1 - (kg - minKg) / kgRange) * iH;

  const pts = allPoints.map(p => ({ x: xOf(p.week), y: yOf(p.kg), kg: p.kg, week: p.week }));
  const goalY = yOf(goalW);

  // Smooth polyline path
  const linePath = pts.length > 1
    ? pts.map((p, i) => (i === 0 ? `M${p.x},${p.y}` : `L${p.x},${p.y}`)).join(" ")
    : null;

  // Y axis labels (3 ticks)
  const yTicks = [maxKg, (maxKg + minKg) / 2, minKg].map(kg => ({
    kg: Math.round(kg * 10) / 10,
    y: yOf(kg),
  }));

  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: "block" }}>
      {/* Goal line */}
      <line x1={PL} y1={goalY} x2={W - PR} y2={goalY} stroke={C.blueMid} strokeWidth="1" strokeDasharray="4 3" />
      <text x={W - PR + 2} y={goalY + 4} fontSize="9" fill={C.blueDark} fontFamily="sans-serif">goal</text>

      {/* Y axis ticks */}
      {yTicks.map((t, i) => (
        <g key={i}>
          <line x1={PL - 4} y1={t.y} x2={PL} y2={t.y} stroke={C.border} strokeWidth="1" />
          <text x={PL - 6} y={t.y + 4} fontSize="9" fill={C.textSoft} textAnchor="end" fontFamily="sans-serif">{t.kg}</text>
        </g>
      ))}

      {/* X axis */}
      <line x1={PL} y1={PT + iH} x2={W - PR} y2={PT + iH} stroke={C.border} strokeWidth="1" />

      {/* Grid lines */}
      {yTicks.map((t, i) => (
        <line key={i} x1={PL} y1={t.y} x2={W - PR} y2={t.y} stroke={C.border} strokeWidth="0.5" />
      ))}

      {/* Gradient fill under line */}
      {linePath && (
        <>
          <defs>
            <linearGradient id="wfill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={C.pinkMid} stopOpacity="0.25" />
              <stop offset="100%" stopColor={C.pinkMid} stopOpacity="0.02" />
            </linearGradient>
          </defs>
          <path
            d={`${linePath} L${pts[pts.length - 1].x},${PT + iH} L${pts[0].x},${PT + iH} Z`}
            fill="url(#wfill)"
          />
          <path d={linePath} fill="none" stroke={C.pinkMid} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}

      {/* Dots + week labels */}
      {pts.map((p, i) => {
        if (p.week < 0) return null;
        return (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="4" fill={C.white} stroke={C.pinkMid} strokeWidth="2" />
            <text x={p.x} y={PT + iH + 11} fontSize="9" fill={C.textSoft} textAnchor="middle" fontFamily="sans-serif">
              W{p.week + 1}
            </text>
          </g>
        );
      })}

      {/* Start dot */}
      <circle cx={pts[0].x} cy={pts[0].y} r="3.5" fill={C.border} stroke={C.textSoft} strokeWidth="1.5" />
    </svg>
  );
}

// ─── Shared style helpers ────────────────────────────────────────────────────
const s = {
  card: { background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: "hidden" },
  cardP: { background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, padding: "12px 14px" },
};

// ─── App ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [view, setView]               = useState("workout");
  const [week, setWeek]               = useState(0);
  const [day,  setDay]                = useState(0);
  const [checked, setChecked]         = useState({});
  const [sets, setSets]               = useState({});
  const [weights, setWeights]         = useState([]);
  const [wInput, setWInput]           = useState("");
  const [showWInput, setShowWInput]   = useState(false);

  useEffect(() => {
    try {
      const w = localStorage.getItem("mp_week"); if (w) setWeek(+w);
      const wts = localStorage.getItem("mp_weights"); if (wts) setWeights(JSON.parse(wts));
    } catch {}
  }, []);
  useEffect(() => { try { localStorage.setItem("mp_week", week); } catch {} }, [week]);
  useEffect(() => { try { localStorage.setItem("mp_weights", JSON.stringify(weights)); } catch {} }, [weights]);
  useEffect(() => { setChecked({}); setSets({}); }, [week]);

  const days       = buildDays(week);
  const d          = days[day];
  const c          = P[d.tag];
  const workout    = d.workout ? WORKOUTS[d.workout] : null;
  const wc         = workout ? P[workout.color] : null;
  const totals     = d.meals.reduce((a, m) => ({ kcal: a.kcal + m.kcal, protein: a.protein + m.protein }), { kcal: 0, protein: 0 });
  const pTarget    = d.tag === "lift" ? 120 : 100;
  const checkedN   = Object.values(checked).filter(Boolean).length;
  const totalItems = GROCERIES.reduce((a, g) => a + g.items.length, 0);

  const startW = 54, goalW = 50;
  const latestW  = weights.length ? weights[weights.length - 1].kg : startW;
  const lost     = parseFloat((startW - latestW).toFixed(1));
  const toGo     = parseFloat((latestW - goalW).toFixed(1));
  const pct      = Math.min(100, Math.max(0, Math.round(((startW - latestW) / (startW - goalW)) * 100)));

  const toggleSet  = (e, s2) => { const k = `${day}-${e}-${s2}`; setSets(p => ({ ...p, [k]: !p[k] })); };
  const isDone     = (e, s2) => !!sets[`${day}-${e}-${s2}`];
  const toggleItem = (cat, item) => { const k = `${cat}::${item}`; setChecked(p => ({ ...p, [k]: !p[k] })); };
  const addWeight  = () => {
    const val = parseFloat(wInput);
    if (isNaN(val) || val < 30 || val > 200) return;
    setWeights(p => [...p.filter(x => x.week !== week), { week, kg: val, date: new Date().toLocaleDateString("en-AU", { day: "numeric", month: "short" }) }].sort((a, b) => a.week - b.week));
    setWInput(""); setShowWInput(false);
  };

  const tabs = [
    { id: "workout",  label: "Workout" },
    { id: "plan",     label: "Meals" },
    { id: "shop",     label: `Shop (${checkedN}/${totalItems})` },
    { id: "progress", label: "Progress" },
  ];

  // ── Sub-components ──────────────────────────────────────────────────────────
  const DayStrip = () => (
    <div style={{ display: "flex", gap: 6, overflowX: "auto", padding: "14px 0", scrollbarWidth: "none" }}>
      {days.map((x, i) => {
        const xc = P[x.tag], active = i === day;
        return (
          <button key={x.short} onClick={() => setDay(i)} style={{ flexShrink: 0, width: 52, padding: "9px 0", border: `1.5px solid ${active ? xc.border : C.border}`, borderRadius: 12, background: active ? xc.bg : C.white, cursor: "pointer", textAlign: "center", transition: "all 0.15s" }}>
            <div style={{ fontSize: 17 }}>{x.icon}</div>
            <div style={{ fontSize: 9, fontWeight: 600, color: active ? xc.label : C.textSoft, letterSpacing: 1.5, marginTop: 3 }}>{x.short}</div>
          </button>
        );
      })}
    </div>
  );

  const DayHeader = () => (
    <div style={{ background: c.bg, border: `1.5px solid ${c.border}`, borderRadius: 16, padding: "14px 16px", marginBottom: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div>
        <div style={{ fontSize: 20, fontWeight: 600, color: c.text }}>{d.day}</div>
        <div style={{ fontSize: 13, color: c.label, marginTop: 2 }}>{d.icon} {d.activity}</div>
      </div>
      <div style={{ display: "flex", gap: 6 }}>
        {["workout", "plan"].map(tid => (
          <button key={tid} onClick={() => setView(tid)} style={{ fontSize: 12, padding: "5px 11px", borderRadius: 20, border: `1.5px solid ${view === tid ? c.border : C.border}`, background: view === tid ? c.bg : C.white, color: view === tid ? c.label : C.textMuted, fontWeight: view === tid ? 600 : 400, transition: "all 0.15s" }}>
            {tid === "workout" ? "Workout" : "Meals"}
          </button>
        ))}
      </div>
    </div>
  );

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: "100vh", background: C.pinkBg, color: C.textMain, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>

      {/* ── Header ── */}
      <div style={{ background: C.white, borderBottom: `1px solid ${C.border}`, padding: "16px 16px 0", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: 480, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 11, letterSpacing: 2, color: C.textSoft, textTransform: "uppercase" }}>Week {week + 1}</div>
              <div style={{ fontSize: 21, fontWeight: 600, color: C.textMain }}>My plan 🌸</div>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              {[["‹", () => { setWeek(w => Math.max(0, w - 1)); setDay(0); }, week === 0],
                ["›", () => { setWeek(w => w + 1); setDay(0); }, false]].map(([lbl, fn, dis]) => (
                <button key={lbl} onClick={fn} disabled={dis} style={{ width: 33, height: 33, borderRadius: 10, border: `1px solid ${C.pinkLight}`, background: C.pinkLight, fontSize: 17, color: dis ? C.textSoft : C.pinkDark, opacity: dis ? 0.4 : 1 }}>{lbl}</button>
              ))}
            </div>
          </div>
          <div style={{ display: "flex" }}>
            {tabs.map(t => (
              <button key={t.id} onClick={() => setView(t.id)} style={{ flex: 1, padding: "9px 2px", border: "none", background: "transparent", color: view === t.id ? C.textMain : C.textMuted, fontSize: 11, cursor: "pointer", borderBottom: view === t.id ? `2.5px solid ${C.pinkMid}` : "2.5px solid transparent", fontWeight: view === t.id ? 600 : 400, transition: "all 0.15s", whiteSpace: "nowrap" }}>{t.label}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 480, margin: "0 auto", padding: "0 16px 80px" }}>

        {/* ── WORKOUT ── */}
        {view === "workout" && (
          <>
            <DayStrip />
            <DayHeader />
            {workout ? (
              <>
                <div style={{ background: wc.bg, border: `1.5px solid ${wc.border}`, borderRadius: 14, padding: "11px 15px", marginBottom: 13, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: wc.text }}>{workout.label} day</div>
                    <div style={{ fontSize: 12, color: wc.label, marginTop: 2 }}>{workout.subtitle}</div>
                  </div>
                  <div style={{ fontSize: 11, color: C.textMuted }}>60–90s rest</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {workout.exercises.map((ex, ei) => {
                    const doneCt = Array.from({ length: ex.sets }, (_, si) => isDone(ei, si)).filter(Boolean).length;
                    const allDone = doneCt === ex.sets;
                    return (
                      <div key={ei} style={{ ...s.cardP, background: allDone ? wc.bg : C.white, border: `1px solid ${allDone ? wc.border : C.border}`, transition: "all 0.2s" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 14, fontWeight: 600, color: allDone ? wc.text : C.textMain }}>{ex.name}</div>
                            <div style={{ fontSize: 12, color: C.textMuted, marginTop: 2 }}>{ex.sets} sets × {ex.reps} · {ex.note}</div>
                          </div>
                          <div style={{ fontSize: 12, color: allDone ? wc.label : C.textSoft, marginLeft: 8, fontWeight: allDone ? 600 : 400 }}>{doneCt}/{ex.sets}</div>
                        </div>
                        <div style={{ display: "flex", gap: 7 }}>
                          {Array.from({ length: ex.sets }, (_, si) => {
                            const done = isDone(ei, si);
                            return (
                              <button key={si} onClick={() => toggleSet(ei, si)} style={{ flex: 1, padding: "8px 0", borderRadius: 10, border: `1.5px solid ${done ? wc.border : C.border}`, background: done ? wc.border : "#fdf6f7", color: done ? C.white : C.textMuted, fontSize: 12, fontWeight: done ? 600 : 400, transition: "all 0.15s" }}>
                                {done ? "✓" : `Set ${si + 1}`}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div style={{ marginTop: 12, fontSize: 12, color: C.textSoft, textAlign: "center", lineHeight: 1.7 }}>Tap each set to mark it done. Increase weight when all reps feel easy.</div>
              </>
            ) : (
              <div style={{ ...s.cardP, textAlign: "center", padding: "36px 16px" }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>{d.icon}</div>
                <div style={{ fontSize: 17, fontWeight: 600, color: c.text, marginBottom: 8 }}>
                  {d.tag === "pilates" ? "Pilates today" : d.tag === "run" ? "Easy run today" : "Rest day"}
                </div>
                <div style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.7, maxWidth: 260, margin: "0 auto" }}>
                  {d.tag === "pilates" && "Focus on core control and breathing. A great complement to your lifting days."}
                  {d.tag === "run"     && "Keep it conversational pace — you should be able to hold a full conversation. 20–40 mins is great."}
                  {d.tag === "rest"    && "Rest days are where the gains happen. Eat your protein, sleep well, and let your muscles rebuild."}
                </div>
              </div>
            )}
          </>
        )}

        {/* ── MEALS ── */}
        {view === "plan" && (
          <>
            <DayStrip />
            <DayHeader />
            <div style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: C.textMuted, marginBottom: 5, letterSpacing: 1 }}>
                <span>PROTEIN</span><span>{totals.protein}g / {pTarget}g</span>
              </div>
              <div style={{ background: C.border, borderRadius: 99, height: 7 }}>
                <div style={{ width: `${Math.min(100, Math.round((totals.protein / pTarget) * 100))}%`, background: C.pinkMid, height: "100%", borderRadius: 99, transition: "width 0.4s ease" }} />
              </div>
              <div style={{ textAlign: "right", marginTop: 4, fontSize: 11, color: C.textSoft }}>{totals.kcal} kcal total</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {d.meals.map((meal, i) => {
                const mb = MEAL_BADGE[meal.type] || { bg: "#f5eeee", color: C.textMuted };
                return (
                  <div key={i} style={{ ...s.cardP, display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <div style={{ background: mb.bg, color: mb.color, borderRadius: 8, padding: "4px 9px", fontSize: 11, fontWeight: 600, whiteSpace: "nowrap", flexShrink: 0, minWidth: 66, textAlign: "center" }}>{meal.type}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, lineHeight: 1.5, color: C.textMain }}>{meal.food}</div>
                      <div style={{ marginTop: 5, display: "flex", gap: 10 }}>
                        <span style={{ fontSize: 12, color: C.textSoft }}>{meal.kcal} kcal</span>
                        <span style={{ fontSize: 12, color: c.label, fontWeight: 600 }}>{meal.protein}g protein</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {d.tag === "lift" && <div style={{ marginTop: 12, background: C.pinkLight, border: `1px dashed ${C.pinkMid}`, borderRadius: 12, padding: "10px 14px", fontSize: 13, color: C.pinkText }}>Lift day: add protein powder to your yogurt bowl to hit 120g protein.</div>}
            {d.tag === "run"  && <div style={{ marginTop: 12, background: C.blueLight, border: `1px dashed ${C.blueMid}`, borderRadius: 12, padding: "10px 14px", fontSize: 13, color: C.blueText }}>Run day: eat ½ banana 30 min before heading out.</div>}
          </>
        )}

        {/* ── SHOP ── */}
        {view === "shop" && (
          <>
            <div style={{ padding: "16px 0 10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 18, fontWeight: 600 }}>Week {week + 1} groceries</div>
                <div style={{ fontSize: 13, color: C.textSoft, marginTop: 2 }}>Lunches rotate each week</div>
              </div>
              {checkedN > 0 && <button onClick={() => setChecked({})} style={{ fontSize: 12, color: C.pinkDark, background: "none", border: "none" }}>Reset</button>}
            </div>
            <div style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: C.textMuted, marginBottom: 5, letterSpacing: 1 }}>
                <span>CHECKED</span><span>{checkedN} / {totalItems}</span>
              </div>
              <div style={{ background: C.border, borderRadius: 99, height: 7 }}>
                <div style={{ width: `${Math.round((checkedN / totalItems) * 100)}%`, background: C.blueMid, height: "100%", borderRadius: 99, transition: "width 0.3s ease" }} />
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {GROCERIES.map(cat => {
                const catN = cat.items.filter(item => checked[`${cat.category}::${item}`]).length;
                return (
                  <div key={cat.category} style={s.card}>
                    <div style={{ padding: "10px 14px", background: C.blueBg, display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${C.borderBlue}` }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: C.blueText }}>{cat.emoji} {cat.category}</div>
                      <div style={{ fontSize: 12, color: C.blueDark }}>{catN}/{cat.items.length}</div>
                    </div>
                    {cat.items.map((item, i) => {
                      const key = `${cat.category}::${item}`;
                      const done = !!checked[key];
                      return (
                        <div key={i} onClick={() => toggleItem(cat.category, item)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 14px", cursor: "pointer", borderBottom: i < cat.items.length - 1 ? `1px solid ${C.border}` : "none", background: done ? "#f0f9ff" : C.white, transition: "background 0.15s" }}>
                          <div style={{ width: 19, height: 19, borderRadius: 6, border: `1.5px solid ${done ? C.blueMid : C.border}`, background: done ? C.blueMid : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.15s" }}>
                            {done && <span style={{ color: C.white, fontSize: 11 }}>✓</span>}
                          </div>
                          <span style={{ fontSize: 14, color: done ? C.blueDark : C.textMain, textDecoration: done ? "line-through" : "none" }}>{item}</span>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
            {checkedN === totalItems && totalItems > 0 && (
              <div style={{ marginTop: 14, background: C.blueLight, border: `1px solid ${C.blueMid}`, borderRadius: 14, padding: 16, textAlign: "center", fontSize: 15, color: C.blueText, fontWeight: 600 }}>All done — you're set for the week! 🛒</div>
            )}
          </>
        )}

        {/* ── PROGRESS ── */}
        {view === "progress" && (
          <>
            <div style={{ padding: "16px 0 10px" }}>
              <div style={{ fontSize: 18, fontWeight: 600 }}>Your progress</div>
              <div style={{ fontSize: 13, color: C.textSoft, marginTop: 2 }}>54kg → 50kg goal</div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 8, marginBottom: 14 }}>
              {[
                { label: "Lost",    value: lost > 0 ? `-${lost}kg` : "0kg",           bg: C.mintLight,  color: C.mintText },
                { label: "Current", value: `${latestW}kg`,                             bg: C.blueLight,  color: C.blueText },
                { label: "To go",   value: toGo > 0 ? `${toGo}kg` : "Done! 🎉",       bg: C.pinkLight,  color: C.pinkText },
              ].map(x => (
                <div key={x.label} style={{ background: x.bg, borderRadius: 14, padding: "12px 8px", textAlign: "center" }}>
                  <div style={{ fontSize: 10, color: x.color, letterSpacing: 1.5, marginBottom: 4, opacity: 0.8 }}>{x.label.toUpperCase()}</div>
                  <div style={{ fontSize: 19, fontWeight: 600, color: x.color }}>{x.value}</div>
                </div>
              ))}
            </div>

            {/* Weight chart */}
            <div style={{ ...s.card, marginBottom: 12 }}>
              <div style={{ padding: "11px 14px 4px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.pinkText }}>Weight over time</div>
                <div style={{ fontSize: 11, color: C.textSoft }}>{startW}kg → {goalW}kg</div>
              </div>
              <div style={{ padding: "4px 8px 10px" }}>
                {weights.length === 0
                  ? <div style={{ textAlign: "center", padding: "28px 0", fontSize: 13, color: C.textSoft }}>Log your first weigh-in to see your chart ✨</div>
                  : <WeightChart weights={weights} startW={startW} goalW={goalW} />
                }
              </div>
            </div>

            <div style={{ ...s.cardP, marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: C.textSoft, marginBottom: 8 }}>
                <span>54kg (start)</span><span>50kg (goal)</span>
              </div>
              <div style={{ background: C.pinkLight, borderRadius: 99, height: 11, overflow: "hidden" }}>
                <div style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${C.pinkMid}, ${C.blueMid})`, height: "100%", borderRadius: 99, transition: "width 0.5s ease" }} />
              </div>
              <div style={{ textAlign: "center", fontSize: 13, color: C.pinkDark, marginTop: 8, fontWeight: 600 }}>{pct}% there ✨</div>
            </div>

            <div style={{ ...s.cardP, marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: showWInput ? 12 : 0 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>Log this week's weight</div>
                <button onClick={() => setShowWInput(v => !v)} style={{ fontSize: 13, color: C.blueDark, background: "none", border: "none" }}>{showWInput ? "Cancel" : "+ Log"}</button>
              </div>
              {showWInput && (
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <input type="number" value={wInput} onChange={e => setWInput(e.target.value)} onKeyDown={e => e.key === "Enter" && addWeight()} placeholder="e.g. 53.2" step="0.1" style={{ flex: 1, padding: "8px 10px", border: `1px solid ${C.border}`, borderRadius: 10, fontSize: 14, background: C.pinkBg, color: C.textMain }} />
                  <span style={{ fontSize: 14, color: C.textMuted }}>kg</span>
                  <button onClick={addWeight} style={{ padding: "8px 16px", background: C.pinkMid, color: C.white, border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600 }}>Save</button>
                </div>
              )}
            </div>

            {weights.length > 0 ? (
              <div style={s.card}>
                <div style={{ padding: "10px 16px", background: C.pinkLight, borderBottom: `1px solid ${C.border}`, fontSize: 13, fontWeight: 600, color: C.pinkText }}>Weight history</div>
                {weights.map((w, i) => {
                  const prev = i > 0 ? weights[i - 1].kg : startW;
                  const diff = parseFloat((w.kg - prev).toFixed(1));
                  return (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "11px 16px", borderBottom: i < weights.length - 1 ? `1px solid ${C.border}` : "none", background: C.white }}>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600 }}>Week {w.week + 1}</div>
                        <div style={{ fontSize: 12, color: C.textSoft }}>{w.date}</div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: 16, fontWeight: 600 }}>{w.kg}kg</div>
                        {i > 0 && <div style={{ fontSize: 12, color: diff < 0 ? C.mintText : diff > 0 ? C.pinkDark : C.textSoft }}>{diff < 0 ? diff : diff > 0 ? `+${diff}` : "—"}kg</div>}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "32px 0", color: C.textSoft, fontSize: 14 }}>Log your first weigh-in above to start tracking.</div>
            )}
            <div style={{ marginTop: 14, fontSize: 12, color: C.textSoft, textAlign: "center", lineHeight: 1.7 }}>Weigh in on the same day each week, first thing in the morning.</div>
          </>
        )}
      </div>
    </div>
  );
}

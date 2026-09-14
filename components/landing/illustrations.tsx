import type { ReactNode } from "react";
import { ArrowUp, Check, FileText, Mail, MessageSquare, MousePointer2, Sparkles } from "lucide-react";
import { LogoMark } from "@/components/landing/logo";

// Code-drawn visuals for the landing page: no image files, crisp at any size, on-palette.

function WindowDots() {
  return (
    <>
      {[0, 1, 2].map((i) => (
        <span key={i} className="w-2.5 h-2.5 rounded-full bg-white/15" />
      ))}
    </>
  );
}

/* ---------- Services: code editor ---------- */

const CODE = `// app/dashboard/page.tsx
import { getMetrics } from "@/lib/analytics";
import { Chart } from "@/components/chart";

export default async function Dashboard() {
  const data = await getMetrics({ range: "30d" });

  return (
    <main className="grid gap-6">
      <Chart title="Revenue" data={data.revenue} />
      <Chart title="Active users" data={data.users} />
    </main>
  );
}`;

const TOKEN = /("[^"]*"|<\/?\w+|\b(?:import|from|export|default|async|function|const|await|return)\b)/;

function highlight(line: string) {
  if (line.trimStart().startsWith("//")) return <span className="text-white/30">{line}</span>;
  // split() with one capture group alternates: even index = plain text, odd = token
  return line.split(TOKEN).map((part, i) => (
    <span
      key={i}
      className={
        i % 2 === 0
          ? "text-white/70"
          : part.startsWith('"')
            ? "text-brand"
            : part.startsWith("<")
              ? "text-brand-soft"
              : "text-brand-amber"
      }
    >
      {part}
    </span>
  ));
}

export function CodeWindow() {
  const lines = CODE.split("\n");
  return (
    <div aria-hidden="true" className="absolute inset-0 flex items-center pl-6">
      <div className="absolute right-0 top-1/4 w-80 h-80 rounded-full bg-brand-amber/20 blur-[100px]" />
      <div className="relative w-[115%] rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm shadow-2xl">
        <div className="flex items-center gap-2 px-4 h-10 border-b border-white/10">
          <WindowDots />
          <span className="ml-4 text-xs font-mono text-white/40">page.tsx</span>
        </div>
        <div className="p-5 font-mono text-[13px] leading-6">
          {lines.map((line, i) => (
            <div key={i} className="flex">
              <span className="w-8 shrink-0 text-white/20 select-none">{i + 1}</span>
              <span className="whitespace-pre">{highlight(line)}</span>
            </div>
          ))}
          <div className="flex">
            <span className="w-8 shrink-0 text-white/20 select-none">{lines.length + 1}</span>
            <span className="w-2 h-5 mt-0.5 bg-brand animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Services: custom software (admin dashboard) ---------- */

const ORDERS: [string, string, string][] = [
  ["#1024", "Acme Corp", "Paid"],
  ["#1023", "Northwind", "Pending"],
  ["#1022", "Globex", "Shipped"],
];

export function SoftwareWindow() {
  return (
    <div aria-hidden="true" className="absolute inset-0 flex items-end justify-center px-6 sm:px-12 pt-8">
      <div className="absolute left-1/2 top-1/3 w-64 h-64 -translate-x-1/2 rounded-full bg-brand-soft/10 blur-[80px]" />
      <div className="relative w-full max-w-lg h-full flex flex-col rounded-t-xl border border-b-0 border-white/10 bg-white/[0.03] overflow-hidden">
        <div className="flex items-center gap-2 px-4 h-8 shrink-0 border-b border-white/10">
          <WindowDots />
          <span className="ml-3 text-[10px] font-mono text-white/40">operations / orders</span>
        </div>
        <div className="flex flex-1 min-h-0">
          <div className="hidden sm:flex w-28 shrink-0 flex-col gap-1.5 p-3 border-r border-white/10">
            {["Dashboard", "Orders", "Inventory", "Reports"].map((item) => (
              <span
                key={item}
                className={`px-2 py-1 rounded text-[10px] ${item === "Orders" ? "bg-brand/15 text-brand" : "text-white/40"}`}
              >
                {item}
              </span>
            ))}
          </div>
          <div className="flex-1 p-4 space-y-3">
            <div className="grid grid-cols-3 gap-2">
              {[["Revenue", "$48.2k"], ["Orders", "1,284"], ["Stock", "92%"]].map(([label, value]) => (
                <div key={label} className="rounded-md border border-white/10 px-2.5 py-2">
                  <p className="text-[9px] text-white/40">{label}</p>
                  <p className="text-sm text-white/90 font-medium">{value}</p>
                </div>
              ))}
            </div>
            <div className="rounded-md border border-white/10 divide-y divide-white/10 text-[10px]">
              {ORDERS.map(([id, customer, status]) => (
                <div key={id} className="flex items-center gap-3 px-2.5 py-2">
                  <span className="font-mono text-white/40">{id}</span>
                  <span className="flex-1 text-white/70">{customer}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full ${status === "Paid" ? "bg-brand/15 text-brand" : "bg-white/5 text-white/50"}`}
                  >
                    {status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Services: mobile apps ---------- */

function Phone({ className = "", children }: { className?: string; children: ReactNode }) {
  return (
    <div className={`relative w-36 sm:w-40 h-72 shrink-0 rounded-[1.75rem] border-[5px] border-white/15 bg-black p-3 shadow-2xl ${className}`}>
      <div className="mx-auto mb-3 w-12 h-1.5 rounded-full bg-white/15" />
      {children}
    </div>
  );
}

export function PhoneMockups() {
  return (
    <div aria-hidden="true" className="absolute inset-0 flex justify-center gap-4 pt-8">
      <div className="absolute left-1/2 top-1/2 w-72 h-40 -translate-x-1/2 rounded-full bg-brand-amber/15 blur-[70px]" />
      <Phone className="mt-10">
        <p className="text-[9px] text-white/40">Good morning</p>
        <p className="text-xs text-white/90 font-medium mb-2">Wallet</p>
        <div className="rounded-xl p-2.5 bg-gradient-to-br from-brand to-brand-amber text-black">
          <p className="text-[8px] opacity-70">Balance</p>
          <p className="text-sm font-semibold">$12,480.00</p>
        </div>
        <div className="mt-3 space-y-2">
          {[["Groceries", "-$64.20"], ["Salary", "+$3,200"], ["Coffee", "-$4.50"]].map(([label, amount]) => (
            <div key={label} className="flex justify-between text-[9px]">
              <span className="text-white/60">{label}</span>
              <span className={amount.startsWith("+") ? "text-brand" : "text-white/40"}>{amount}</span>
            </div>
          ))}
        </div>
      </Phone>
      <Phone>
        <p className="text-xs text-white/90 font-medium mb-3">Activity</p>
        <div className="flex items-end gap-1.5 h-20 mb-3">
          {[40, 65, 45, 80, 55, 95, 70].map((h, i) => (
            <div key={i} className={`flex-1 rounded-sm ${i === 5 ? "bg-brand" : "bg-white/15"}`} style={{ height: `${h}%` }} />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[["Steps", "8.2k"], ["Sleep", "7h 40m"]].map(([label, value]) => (
            <div key={label} className="rounded-lg bg-white/5 p-2">
              <p className="text-[8px] text-white/40">{label}</p>
              <p className="text-[11px] text-white/90">{value}</p>
            </div>
          ))}
        </div>
      </Phone>
    </div>
  );
}

/* ---------- Services: AI & automation ---------- */

const AI_INPUTS = [
  { icon: Mail, label: "Email" },
  { icon: MessageSquare, label: "Chat" },
  { icon: FileText, label: "Docs" },
];

const AI_OUTPUTS = ["Ticket created", "CRM updated", "Reply drafted"];

const CHIP = "flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-white/10 bg-white/[0.03] text-[10px] sm:text-xs text-white/70 whitespace-nowrap";
const CONNECTOR = "w-5 sm:w-12 shrink-0 border-t border-dashed border-brand/50";

export function AiWorkflow() {
  return (
    <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center px-4">
      <div className="absolute left-1/2 top-1/2 w-56 h-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/10 blur-[70px]" />
      <div className="relative flex items-center">
        <div className="flex flex-col gap-2">
          {AI_INPUTS.map(({ icon: Icon, label }) => (
            <span key={label} className={CHIP}>
              <Icon className="w-3.5 h-3.5 text-white/40" />
              {label}
            </span>
          ))}
        </div>
        <span className={CONNECTOR} />
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-2xl border border-brand/40 bg-brand/10 flex flex-col items-center justify-center gap-1.5">
          <span className="absolute inset-0 rounded-2xl border border-brand/40 animate-ping" />
          <Sparkles className="w-6 h-6 text-brand" />
          <span className="text-[10px] font-mono text-brand">AI agent</span>
        </div>
        <span className={CONNECTOR} />
        <div className="flex flex-col gap-2">
          {AI_OUTPUTS.map((label) => (
            <span key={label} className={CHIP}>
              <Check className="w-3.5 h-3.5 text-brand" />
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- Services: UI/UX design canvas ---------- */

export function DesignCanvas() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 flex items-center justify-center"
      style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)", backgroundSize: "16px 16px" }}
    >
      <div className="relative w-60 sm:w-72 rounded-lg border border-white/10 bg-black p-3 space-y-2.5 shadow-2xl">
        <span className="absolute -top-5 left-0 text-[9px] font-mono text-white/40">Landing — Desktop</span>
        <div className="flex items-center justify-between">
          <span className="w-10 h-2 rounded-sm bg-white/25" />
          <span className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <span key={i} className="w-5 h-1.5 rounded-sm bg-white/10" />
            ))}
          </span>
        </div>
        <div className="rounded-md bg-white/[0.04] px-3 py-3 space-y-1.5">
          <span className="block w-2/3 h-2.5 rounded-sm bg-white/25" />
          <span className="block w-1/2 h-1.5 rounded-sm bg-white/10" />
          <span className="block w-12 h-3.5 mt-2 rounded-full bg-brand/80" />
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className={`relative h-12 rounded-md bg-white/[0.04] ${i === 1 ? "outline outline-1 outline-brand" : ""}`}>
              {i === 1 && (
                <>
                  {["-top-1 -left-1", "-top-1 -right-1", "-bottom-1 -left-1", "-bottom-1 -right-1"].map((pos) => (
                    <span key={pos} className={`absolute ${pos} w-1.5 h-1.5 bg-black border border-brand`} />
                  ))}
                  <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 px-1 rounded-sm bg-brand text-black text-[8px] font-mono whitespace-nowrap">
                    88 × 48
                  </span>
                </>
              )}
            </div>
          ))}
        </div>
        {/* Collaborator cursor */}
        <div className="absolute -right-8 bottom-4 flex items-start">
          <MousePointer2 className="w-4 h-4 text-brand-amber fill-brand-amber" />
          <span className="mt-3 -ml-1 px-1.5 py-0.5 rounded bg-brand-amber text-black text-[9px] font-medium">Designer</span>
        </div>
      </div>
      <div className="hidden sm:flex absolute right-6 top-1/2 -translate-y-1/2 flex-col gap-2 p-2 rounded-lg border border-white/10 bg-black">
        {["var(--color-brand)", "var(--color-brand-amber)", "var(--color-brand-soft)", "#f5f5f4"].map((color) => (
          <span key={color} className="w-5 h-5 rounded-full" style={{ backgroundColor: color }} />
        ))}
      </div>
    </div>
  );
}

/* ---------- Process: deploy terminal ---------- */

const DEPLOY_LOG: [string, string][] = [
  ["$ git push origin main", "text-white"],
  ["→ Running CI pipeline", "text-white/50"],
  ["  ✓ lint                   2.1s", "text-white/70"],
  ["  ✓ unit tests       148 passed", "text-white/70"],
  ["  ✓ e2e tests         32 passed", "text-white/70"],
  ["  ✓ build                 41.8s", "text-white/70"],
  ["→ Deploying to production", "text-white/50"],
  ["  ✓ app.yourproduct.com  healthy", "text-white/70"],
  ["  ✓ api.yourproduct.com  healthy", "text-white/70"],
  ["✓ Released v2.4.0 in 3m 12s", "text-brand"],
];

export function DeployTerminal({ visible }: { visible: boolean }) {
  return (
    <div aria-hidden="true" className="absolute inset-x-0 bottom-0">
      <div className="absolute -top-24 right-10 w-72 h-72 rounded-full bg-brand/15 blur-[100px]" />
      <div className="relative rounded-t-xl border border-b-0 border-white/15 bg-black/80 backdrop-blur-sm">
        <div className="flex items-center gap-2 px-4 h-10 border-b border-white/10">
          <WindowDots />
          <span className="ml-4 text-xs font-mono text-white/40">~/client-app — zsh</span>
        </div>
        <div className="p-5 lg:p-8 font-mono text-[11px] leading-5 lg:text-sm lg:leading-7">
          {DEPLOY_LOG.map(([text, tone], i) => {
            const [before, after] = text.split("✓");
            return (
              <div
                key={i}
                className={`whitespace-pre transition-opacity duration-300 ${tone} ${visible ? "opacity-100" : "opacity-0"}`}
                style={{ transitionDelay: `${400 + i * 250}ms` }}
              >
                {after === undefined ? text : <>{before}<span className="text-brand">✓</span>{after}</>}
              </div>
            );
          })}
          <div
            className={`flex items-center gap-2 text-white transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"}`}
            style={{ transitionDelay: `${400 + DEPLOY_LOG.length * 250}ms` }}
          >
            $ <span className="w-2 h-4 bg-white/70 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Engineering: system architecture ---------- */

const NODES: Record<string, [number, number, string]> = {
  web: [380, 90, "web app"],
  mobile: [610, 90, "mobile app"],
  api: [495, 230, "api gateway"],
  auth: [290, 370, "auth"],
  ai: [495, 370, "ai service"],
  jobs: [700, 370, "job queue"],
  db: [390, 510, "postgres"],
  cache: [600, 510, "redis"],
};

const EDGES = [
  ["web", "api"], ["mobile", "api"],
  ["api", "auth"], ["api", "ai"], ["api", "jobs"],
  ["auth", "db"], ["ai", "db"], ["ai", "cache"], ["jobs", "cache"],
];

export function ArchitectureDiagram() {
  const W = 150;
  const H = 44;
  return (
    <svg viewBox="0 0 800 600" preserveAspectRatio="xMaxYMax meet" aria-hidden="true" className="w-full h-full">
      <g fill="none">
        {EDGES.map(([a, b]) => {
          const [x1, y1] = NODES[a];
          const [x2, y2] = NODES[b];
          const d = `M${x1} ${y1 + H / 2} V${(y1 + y2) / 2} H${x2} V${y2 - H / 2}`;
          return (
            <g key={a + b}>
              <path d={d} stroke="white" strokeOpacity="0.12" />
              <path d={d} className="stroke-brand" strokeOpacity="0.8" strokeDasharray="6 14">
                <animate attributeName="stroke-dashoffset" from="20" to="0" dur="1s" repeatCount="indefinite" />
              </path>
            </g>
          );
        })}
      </g>
      {Object.entries(NODES).map(([key, [x, y, label]]) => (
        <g key={key}>
          <rect x={x - W / 2} y={y - H / 2} width={W} height={H} rx="8" fill="#0b0c10" stroke="white" strokeOpacity="0.15" />
          <circle cx={x - W / 2 + 18} cy={y} r="3" className="fill-brand" />
          <text x={x - W / 2 + 32} y={y + 4.5} fill="white" fillOpacity="0.7" fontSize="13" fontFamily="ui-monospace, monospace">
            {label}
          </text>
        </g>
      ))}
    </svg>
  );
}

/* ---------- Contact: client chat ---------- */

function Bubble({ mine, children }: { mine?: boolean; children: ReactNode }) {
  return (
    <div
      className={`max-w-[80%] w-fit px-4 py-3 rounded-2xl leading-relaxed ${
        mine ? "ml-auto rounded-br-sm bg-foreground text-background" : "rounded-bl-sm bg-brand/10"
      }`}
    >
      {children}
    </div>
  );
}

export function ChatMockup() {
  return (
    <div aria-hidden="true" className="relative w-full">
      <div className="absolute -inset-10 rounded-full bg-brand/10 blur-[80px]" />
      <div className="relative rounded-2xl border border-foreground/10 bg-background/80 backdrop-blur-sm overflow-hidden">
        <div className="flex items-center gap-3 px-5 h-16 border-b border-foreground/10">
          <LogoMark className="w-9 h-9" />
          <div className="leading-tight">
            <p className="text-sm font-medium">Heliqo</p>
            <p className="text-xs text-muted-foreground flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand" />
              Replies within 24h
            </p>
          </div>
        </div>

        <div className="p-5 space-y-4 text-sm">
          <Bubble mine>Hi! We&apos;re building a lending app and need an MVP — web and iOS. Can you help?</Bubble>
          <Bubble>Absolutely, that&apos;s exactly what we do. Free for a 30-minute call on Thursday?</Bubble>
          <Bubble mine>Thursday works. Sending over our brief now.</Bubble>
          <div className="flex justify-end">
            <span className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-foreground/10 font-mono text-xs text-muted-foreground">
              <FileText className="w-4 h-4" />
              product-brief.pdf · 2.4 MB
            </span>
          </div>
          <div className="flex gap-1 w-fit px-4 py-3 rounded-2xl rounded-bl-sm bg-brand/10">
            {[0, 1, 2].map((i) => (
              <span key={i} className="w-1.5 h-1.5 rounded-full bg-brand animate-bounce" style={{ animationDelay: `${i * 150}ms` }} />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 m-5 mt-1 pl-5 pr-2 h-12 rounded-full border border-foreground/10 text-sm text-muted-foreground">
          Tell us about your project…
          <span className="ml-auto w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center">
            <ArrowUp className="w-4 h-4" />
          </span>
        </div>
      </div>
    </div>
  );
}

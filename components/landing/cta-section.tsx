"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { CalendarDays, Mail } from "lucide-react";
import { ContactForm } from "@/components/landing/contact-form";
import { CALENDLY_URL } from "@/lib/contact";

const EMAIL = "hello@heliqo.com";

declare global {
  interface Window {
    Calendly?: { initInlineWidget(options: { url: string; parentElement: HTMLElement }): void };
  }
}

// Calendly only applies custom colors on paid plans; free plans show its default light theme.
const CALENDLY_EMBED_URL =
  CALENDLY_URL &&
  `${CALENDLY_URL}${CALENDLY_URL.includes("?") ? "&" : "?"}hide_gdpr_banner=1&background_color=0a0a0c&text_color=f5f5f4&primary_color=fb923c`;

const TABS = [
  { id: "message", label: "Send a message", icon: Mail },
  { id: "meeting", label: "Schedule a meeting", icon: CalendarDays },
] as const;

function CalendlyEmbed() {
  const container = useRef<HTMLDivElement>(null);

  if (!CALENDLY_EMBED_URL) {
    return (
      <div className="flex flex-col items-start gap-4 py-12">
        <span className="w-12 h-12 rounded-full bg-brand/15 text-brand flex items-center justify-center">
          <CalendarDays className="w-6 h-6" />
        </span>
        <h3 className="text-3xl font-display">Online booking is coming soon.</h3>
        <p className="text-muted-foreground max-w-md">
          Email{" "}
          <a
            href={`mailto:${EMAIL}?subject=Meeting%20request`}
            className="text-foreground underline underline-offset-4 hover:text-brand"
          >
            {EMAIL}
          </a>{" "}
          with a few times that work for you, and we&apos;ll send a calendar invite.
        </p>
      </div>
    );
  }

  return (
    <>
      <div ref={container} className="w-full h-[700px] overflow-hidden rounded-xl border border-foreground/10" />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        onReady={() => {
          if (container.current && !container.current.hasChildNodes()) {
            window.Calendly?.initInlineWidget({ url: CALENDLY_EMBED_URL, parentElement: container.current });
          }
        }}
      />
    </>
  );
}

export function CtaSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("message");
  // Mount Calendly on first open only, then keep it mounted so switching tabs doesn't reload it
  const [calendarOpened, setCalendarOpened] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Any link to #schedule (nav, footer, left column) opens the meeting tab
  useEffect(() => {
    const openMeeting = () => {
      setTab("meeting");
      setCalendarOpened(true);
    };
    if (window.location.hash === "#schedule") openMeeting();
    const onClick = (e: MouseEvent) => {
      if (e.target instanceof Element && e.target.closest('a[href="#schedule"]')) openMeeting();
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <section id="contact" ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div
          className={`relative border border-foreground transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          onMouseMove={handleMouseMove}
        >
          {/* Spotlight effect */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none transition-opacity duration-300"
            style={{
              background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(0,0,0,0.15), transparent 40%)`
            }}
          />

          <div className="relative z-10 grid lg:grid-cols-12 gap-14 lg:gap-16 px-6 sm:px-8 lg:px-16 py-16 lg:py-20">
            {/* Left: pitch + direct contact */}
            <div className="lg:col-span-5">
              <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-8">
                <span className="w-8 h-px bg-foreground/30" />
                Contact us
              </span>
              <h2 className="text-5xl md:text-6xl font-display tracking-tight mb-8 leading-[0.95]">
                Have a project
                <br />
                in mind?
              </h2>
              <p className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-md">
                Tell us what you&apos;re building or book a call. We&apos;ll reply within 24 hours with ideas,
                a rough timeline, and next steps.
              </p>
              <a
                href={`mailto:${EMAIL}`}
                className="flex w-fit items-center gap-3 text-foreground hover:text-brand transition-colors"
              >
                <Mail className="w-5 h-5" />
                {EMAIL}
              </a>
              <a
                href="#schedule"
                className="mt-4 flex w-fit items-center gap-3 text-foreground hover:text-brand transition-colors"
              >
                <CalendarDays className="w-5 h-5" />
                Book a free 30-minute call
              </a>
            </div>

            {/* Right: message form or meeting scheduler */}
            <div className="lg:col-span-7">
              <div
                id="schedule"
                role="tablist"
                aria-label="How would you like to reach us?"
                className="scroll-mt-32 flex w-full sm:inline-flex sm:w-auto gap-1 p-1 mb-10 rounded-full border border-foreground/10 bg-foreground/[0.03]"
              >
                {TABS.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    type="button"
                    role="tab"
                    aria-selected={tab === id}
                    aria-controls={`contact-${id}`}
                    onClick={() => {
                      setTab(id);
                      if (id === "meeting") setCalendarOpened(true);
                    }}
                    className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-3 sm:px-5 h-11 rounded-full text-sm transition-colors ${
                      tab === id ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Icon className="hidden sm:block w-4 h-4" />
                    {label}
                  </button>
                ))}
              </div>

              {/* `hidden` instead of unmounting keeps typed form input when switching tabs */}
              <div id="contact-message" role="tabpanel" hidden={tab !== "message"}>
                <ContactForm />
              </div>
              <div id="contact-meeting" role="tabpanel" hidden={tab !== "meeting"}>
                {calendarOpened && <CalendlyEmbed />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import { ArchitectureDiagram } from "@/components/landing/illustrations";

const features = [
  {
    title: "Clean architecture",
    description: "Scalable, documented structure from day one."
  },
  {
    title: "Tested & reviewed",
    description: "Automated tests and code review on every change."
  },
  {
    title: "Cloud & DevOps",
    description: "AWS, Docker, and CI/CD from the first sprint."
  },
  {
    title: "Post-launch support",
    description: "Monitoring, maintenance, and new features."
  },
];

// Logos from Devicon (MIT), saved in public/images/tech. `filter` makes dark logos readable on black.
const stack = [
  {
    group: "Languages",
    items: [
      { name: "JavaScript", icon: "javascript" },
      { name: "TypeScript", icon: "typescript" },
      { name: "Python", icon: "python" },
      { name: "Go", icon: "go" },
      { name: "Swift", icon: "swift" },
    ],
  },
  {
    group: "Frameworks",
    items: [
      { name: "React", icon: "react" },
      { name: "Next.js", icon: "nextjs", filter: "invert" },
      { name: "Node.js", icon: "nodejs" },
      { name: "React Native", icon: "reactnative" },
      { name: "Laravel", icon: "laravel" },
      { name: "Tailwind CSS", icon: "tailwindcss" },
      { name: "FastAPI", icon: "fastapi" },
    ],
  },
  {
    group: "Data & tools",
    items: [
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "MongoDB", icon: "mongodb" },
      { name: "Firebase", icon: "firebase" },
      { name: "Docker", icon: "docker" },
      { name: "AWS", icon: "amazonwebservices", filter: "brightness-0 invert" },
      { name: "Figma", icon: "figma" },
    ],
  },
];

export function DevelopersSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

  return (
    <section id="engineering" ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header — Full width */}
        <div
          className={`mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-8 h-px bg-foreground/30" />
            Engineering
          </span>
          <h2 className="text-6xl md:text-7xl lg:text-[128px] font-display tracking-tight leading-[0.9]">
            Built with
            <br />
            <span className="text-muted-foreground">proven tech.</span>
          </h2>
        </div>

        {/* Description + features on the left, architecture diagram on the right */}
        <div
          className={`grid lg:grid-cols-2 gap-12 items-center transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div>
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed max-w-md">
              Clean, tested, documented code on a modern stack — built to be
              maintained long after launch.
            </p>
            <div className="grid grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className={`transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${index * 50 + 200}ms` }}
                >
                  <h3 className="font-medium mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:block h-[420px]">
            <ArchitectureDiagram />
          </div>
        </div>

        {/* Tech stack logos */}
        <div
          className={`mt-24 space-y-10 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {stack.map(({ group, items }) => (
            <div key={group} className="grid lg:grid-cols-[180px_1fr] gap-4 lg:gap-8 items-start">
              <span className="text-sm font-mono text-muted-foreground lg:pt-8">{group}</span>
              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-3">
                {items.map((tech) => (
                  <div
                    key={tech.name}
                    className="group flex flex-col items-center justify-center gap-3 p-5 border border-foreground/10 bg-foreground/[0.02] hover:border-foreground/30 hover:bg-foreground/[0.04] transition-colors"
                  >
                    <img
                      src={`/images/tech/${tech.icon}.svg`}
                      alt=""
                      className={`w-10 h-10 object-contain transition-transform duration-300 group-hover:scale-110 ${
                        "filter" in tech ? tech.filter : ""
                      }`}
                    />
                    <span className="text-xs text-center text-muted-foreground group-hover:text-foreground transition-colors">
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

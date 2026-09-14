import { ArrowUpRight } from "lucide-react";
import { LogoMark } from "@/components/landing/logo";

const footerLinks = {
  Services: [
    { name: "Web platforms", href: "#services" },
    { name: "Custom software", href: "#services" },
    { name: "Mobile apps", href: "#services" },
    { name: "AI & automation", href: "#services" },
    { name: "UI/UX design", href: "#services" },
  ],
  Company: [
    { name: "Process", href: "#how-it-works" },
    { name: "Why Heliqo", href: "#why-us" },
    { name: "Engineering", href: "#engineering" },
  ],
  Contact: [
    { name: "hello@heliqo.com", href: "mailto:hello@heliqo.com" },
    { name: "Contact us", href: "#contact" },
    { name: "Schedule a meeting", href: "#schedule" },
  ],
  Legal: [
    { name: "Privacy", href: "#" },
    { name: "Terms", href: "#" },
  ],
};

const socialLinks = [
  { name: "LinkedIn", href: "#" },
  { name: "GitHub", href: "#" },
  { name: "X", href: "#" },
];

export function FooterSection() {
  return (
    <footer className="relative bg-black">
      {/* Banner: perspective grid floor + outlined wordmark */}
      <div aria-hidden="true" className="relative w-full h-[340px] md:h-[420px] overflow-hidden [perspective:500px]">
        <div
          className="absolute -inset-x-1/2 bottom-0 h-[140%] origin-bottom [transform:rotateX(65deg)]"
          style={{
            backgroundImage:
              "linear-gradient(to right, color-mix(in srgb, var(--color-brand) 35%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, var(--color-brand) 35%, transparent) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        {/* Fade grid into the horizon and into the footer */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/30 to-black" />
        {/* Subtle dark vignette on sides */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="font-display text-[26vw] md:text-[20vw] leading-none tracking-tighter text-transparent select-none"
            style={{ WebkitTextStroke: "1px rgba(255,255,255,0.35)" }}
          >
            Heliqo
          </span>
        </div>
      </div>

      {/* Footer content — black background, white text */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Main Footer */}
        <div className="py-16 lg:py-20">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-12 lg:gap-8">
            {/* Brand Column */}
            <div className="col-span-2">
              <a href="#" className="inline-flex items-center gap-3 mb-6">
                <LogoMark className="w-8 h-8" />
                <span className="text-2xl font-display text-white">Heliqo</span>
              </a>

              <p className="text-white/50 leading-relaxed mb-8 max-w-xs text-sm">
                A software development agency building web platforms, mobile apps, and AI-powered products that ship fast and scale.
              </p>

              {/* Social Links */}
              <div className="flex gap-6">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-sm text-white/40 hover:text-white transition-colors flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </a>
                ))}
              </div>
            </div>

            {/* Link Columns */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="text-sm font-medium text-white mb-6">{title}</h3>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-sm text-white/40 hover:text-white transition-colors break-all"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/30">
            &copy; {new Date().getFullYear()} Heliqo. All rights reserved.
          </p>

          <div className="flex items-center gap-4 text-sm text-white/30">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand" />
              Available for new projects
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { cn } from "@repo/styles/cn";
import { Link } from "@tanstack/react-router";
import type { LinkProps } from "@tanstack/react-router";

const sections = [
  {
    title: "About Us",
    description:
      "Learn who we are, what we believe in, and the vision behind our platform.",
    to: "/company/about",
    icon: "🌐",
    accent: "from-sky-500/30 to-cyan-500/10",
  },
  {
    title: "Awards",
    description:
      "Explore the milestones, recognitions, and achievements we've earned.",
    to: "/company/awards",
    icon: "🏆",
    accent: "from-amber-500/30 to-yellow-500/10",
  },
  {
    title: "News",
    description:
      "Stay updated with the latest announcements, releases, and platform updates.",
    to: "/company/news",
    icon: "📰",
    accent: "from-violet-500/30 to-fuchsia-500/10",
  },
] satisfies {
  title: string;
  description: string;
  to: LinkProps["to"];
  icon: string;
  accent: string;
}[];

export function CompanyHome() {
  return (
    <main className="default-padding relative overflow-hidden py-20">
      {/* Background */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(168,85,247,.12),transparent_55%)]"
      />

      {/* Hero */}
      <section className="relative mx-auto mb-16 max-w-3xl text-center">
        <div className="mb-4 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1 text-sm backdrop-blur">
          ✨ Welcome
        </div>

        <h1 className="font-brand-secondary text-4xl font-bold md:text-6xl">
          Explore{" "}
          <span className="from-primary-500 to-secondary-500 bg-linear-to-r bg-clip-text text-transparent">
            Company
          </span>
        </h1>

        <p className="text-foreground/70 mx-auto mt-5 max-w-xl text-lg">
          Everything you want to know about our company—from updates and awards
          to our story.
        </p>
      </section>

      {/* Cards */}
      <section className="relative flex flex-wrap justify-center gap-8">
        {sections.map((section) => (
          <Link
            key={section.to}
            to={section.to}
            className={cn(
              "group hover:border-primary-500/60 relative grow basis-100 overflow-hidden rounded-3xl border border-white/10 bg-white/3 p-8 backdrop-blur transition-all duration-300 hover:-translate-y-3 hover:shadow-[0_0_50px_rgba(124,58,237,.18)]",
            )}
          >
            {/* Hover gradient */}
            <div
              className={cn(
                "absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100",
                "bg-linear-to-br",
                section.accent,
              )}
            />

            {/* Decorative circle */}
            <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-white/5 transition-transform duration-500 group-hover:scale-150" />

            <div className="relative z-10">
              <div className="mb-6 text-6xl transition-transform duration-300 group-hover:scale-125 group-hover:rotate-6">
                {section.icon}
              </div>

              <h2 className="mb-3 text-2xl font-bold">{section.title}</h2>

              <p className="text-foreground/70 leading-relaxed">
                {section.description}
              </p>

              <div className="text-primary-500 mt-8 flex items-center gap-2 font-medium">
                <span>Explore</span>

                <span className="transition-transform duration-300 group-hover:translate-x-2">
                  →
                </span>
              </div>
            </div>

            {/* Animated border glow */}
            <div className="group-hover:ring-primary-500/40 pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-transparent transition-all duration-300" />
          </Link>
        ))}
      </section>

      {/* Bottom hint */}
      <div className="text-foreground/50 mt-16 text-center text-sm">
        Hover over a card to preview it and click to continue.
      </div>
    </main>
  );
}

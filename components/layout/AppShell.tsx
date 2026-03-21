"use client";

import Header from "@/components/layout/Header";
import PageTransition from "@/components/layout/PageTransition";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

const NAV_ITEMS = ["/track", "/season", "/compare"];

export default function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLanding = pathname === "/";

  // Keyboard navigation bonus (Phase 5 Roadmap)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isLanding) return;
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLSelectElement) return;

      const idx = NAV_ITEMS.findIndex(item => pathname.startsWith(item));
      if (idx === -1) return;

      if (e.key === "ArrowRight") {
        const nextIdx = (idx + 1) % NAV_ITEMS.length;
        router.push(NAV_ITEMS[nextIdx]);
      } else if (e.key === "ArrowLeft") {
        const prevIdx = (idx - 1 + NAV_ITEMS.length) % NAV_ITEMS.length;
        router.push(NAV_ITEMS[prevIdx]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [pathname, isLanding, router]);

  if (isLanding) {
    // Landing page manages its own nav & footer
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main className="main-content" id="main">
        <PageTransition>{children}</PageTransition>
      </main>
      <footer className="site-footer">
        <p>
          Live data:{" "}
          <a href="https://jolpi.ca" target="_blank" rel="noopener">
            Jolpica F1 API
          </a>{" "}
          · Telemetry:{" "}
          <a
            href="https://github.com/theOehrly/Fast-F1"
            target="_blank"
            rel="noopener"
          >
            FastF1
          </a>{" "}
          · Next.js App Router ·{" "}
          <a href="/track">Track Analyzer →</a>
        </p>
      </footer>
    </>
  );
}

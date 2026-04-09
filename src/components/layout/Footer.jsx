import React from "react";
import { Link } from "react-router-dom";
import { BarChart2 } from "lucide-react";

const NAV_LINKS = [
  { label: "About", to: "/about" },
  { label: "Plans", to: "/plans" },
  { label: "Privacy", to: "/privacy" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col items-center gap-6 sm:flex-row sm:justify-between sm:gap-0">
        {/* Brand */}
        <Link
          to="/"
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <BarChart2 className="w-4 h-4" />
          <span className="text-sm font-semibold tracking-tight">
            Wage Comparator
          </span>
        </Link>

        {/* Nav links */}
        <nav className="flex items-center gap-6">
          {NAV_LINKS.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Copyright */}
        <p className="text-xs text-muted-foreground/60">
          &copy; {year} Wage Comparator
        </p>
      </div>
    </footer>
  );
}

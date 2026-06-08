"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { LogIn, Map, Menu, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/map", label: "Map" },
  { href: "/dashboard", label: "Analytics" },
  { href: "/emergency", label: "Emergency" },
  { href: "/admin", label: "Admin" }
];

export function Nav() {
  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-[#05070d]/80 backdrop-blur-2xl"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-md bg-cyber-cyan text-cyber-ink shadow-glow">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <span className="text-base font-semibold tracking-wide text-white">SafeRouteX</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="rounded-md px-4 py-2 text-sm text-white/70 transition hover:bg-white/10 hover:text-white">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
            <Map className="h-4 w-4" />
            Live Demo
          </Button>
          <Button size="sm">
            <LogIn className="h-4 w-4" />
            Sign in
          </Button>
          <Button variant="outline" size="icon" className="md:hidden" aria-label="Open menu">
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.header>
  );
}

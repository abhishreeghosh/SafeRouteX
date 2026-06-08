import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#030407] py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-md bg-cyber-cyan text-cyber-ink">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <div>
            <p className="font-semibold text-white">SafeRouteX</p>
            <p className="text-sm text-white/50">AI crime intelligence and safe navigation.</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-white/70">
          <Link href="/map" className="hover:text-white">Map</Link>
          <Link href="/dashboard" className="hover:text-white">Analytics</Link>
          <Link href="/emergency" className="hover:text-white">Emergency</Link>
          <Link href="/admin" className="hover:text-white">Admin</Link>
        </div>
      </div>
    </footer>
  );
}

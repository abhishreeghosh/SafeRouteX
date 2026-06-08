import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "danger" | "outline";
  size?: "sm" | "md" | "lg" | "icon";
};

export function Button({ className, variant = "primary", size = "md", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md font-medium transition duration-300 focus:outline-none focus:ring-2 focus:ring-cyber-cyan/50 disabled:pointer-events-none disabled:opacity-50",
        variant === "primary" && "bg-cyber-cyan text-cyber-ink shadow-glow hover:bg-white",
        variant === "ghost" && "text-white/70 hover:bg-white/10 hover:text-white",
        variant === "danger" && "bg-cyber-red text-white shadow-danger hover:bg-white hover:text-cyber-ink",
        variant === "outline" && "border border-white/20 bg-white/5 text-white hover:border-cyber-cyan/70 hover:bg-cyber-cyan/10",
        size === "sm" && "h-9 px-3 text-sm",
        size === "md" && "h-11 px-5 text-sm",
        size === "lg" && "h-12 px-7 text-base",
        size === "icon" && "h-10 w-10 p-0",
        className
      )}
      {...props}
    />
  );
}

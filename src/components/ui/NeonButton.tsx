import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  href?: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  pulse?: boolean;
};

export function NeonButton({
  href,
  children,
  variant = "primary",
  className = "",
  type = "button",
  onClick,
  pulse,
}: Props) {
  const styles =
    variant === "primary"
      ? `border border-white/20 bg-gradient-to-l from-brand to-brand-light text-white shadow-glow ${pulse ? "pulse-glow" : ""}`
      : "glass text-white hover:bg-white/10";

  const cls = `inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm font-bold transition duration-300 hover:-translate-y-0.5 ${styles} ${className}`;

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={cls}>
      {children}
    </button>
  );
}

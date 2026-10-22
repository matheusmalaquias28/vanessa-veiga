import Link from "next/link";
import type { ReactNode } from "react";

export function ArrowLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  const external = href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");
  const inner = (
    <>
      <span>{children}</span>
      <span className="cta-rule" aria-hidden />
    </>
  );
  return external ? (
    <a href={href} className={`cta-line ${className}`} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
      {inner}
    </a>
  ) : (
    <Link href={href} className={`cta-line ${className}`}>
      {inner}
    </Link>
  );
}

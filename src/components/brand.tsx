import { FULL_NAME_VIEWBOX, TSURU_VIEWBOX, fullNamePaths, tsuruPaths } from "./brand-paths";

type TsuruProps = {
  className?: string;
  /** cor das dobras claras; por padrão amarelo */
  ink?: string;
  accent?: string;
  title?: string;
};

export function Tsuru({ className, ink = "var(--color-gold)", accent = "var(--color-crimson)", title }: TsuruProps) {
  return (
    <svg viewBox={TSURU_VIEWBOX} className={className} role={title ? "img" : undefined} aria-hidden={title ? undefined : true}>
      {title && <title>{title}</title>}
      {tsuruPaths.map((p, i) => (
        <path key={i} d={p.d} fill={p.tone === "accent" ? accent : ink} />
      ))}
    </svg>
  );
}

export function NameMark({ className }: { className?: string }) {
  return (
    <svg viewBox={FULL_NAME_VIEWBOX} className={className} aria-hidden>
      {fullNamePaths.map((d, i) => (
        <path key={i} d={d} fill="currentColor" />
      ))}
    </svg>
  );
}

/** Tsuru + nome, usado no cabeçalho */
export function Logo({ className, ink }: { className?: string; ink?: string }) {
  return (
    <span className={`flex items-center gap-3 ${className ?? ""}`}>
      <Tsuru className="h-8 w-auto shrink-0 md:h-9" ink={ink} />
      <NameMark className="h-[0.7rem] w-auto md:h-3" />
      <span className="sr-only">Vanessa Veiga, Direção de Elenco</span>
    </span>
  );
}

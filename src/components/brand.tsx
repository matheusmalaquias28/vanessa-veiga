import { NAME_VIEWBOX, TSURU_VIEWBOX, namePaths, tsuruPaths } from "./brand-paths";

type TsuruProps = {
  className?: string;
  /** cor das dobras escuras; por padrão segue a cor do texto */
  ink?: string;
  accent?: string;
  title?: string;
};

export function Tsuru({ className, ink = "currentColor", accent = "var(--color-crimson)", title }: TsuruProps) {
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
    <svg viewBox={NAME_VIEWBOX} className={className} aria-hidden>
      {namePaths.map((d, i) => (
        <path key={i} d={d} fill="currentColor" />
      ))}
    </svg>
  );
}

/** Tsuru + nome, usado no cabeçalho */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={`flex items-center gap-3 ${className ?? ""}`}>
      <Tsuru className="h-8 w-auto shrink-0 md:h-9" />
      <NameMark className="h-[0.7rem] w-auto md:h-3" />
      <span className="sr-only">Vanessa Veiga, Direção de Elenco</span>
    </span>
  );
}

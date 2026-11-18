const STAR = "M12 2.5l2.94 6.1 6.56.86-4.8 4.62 1.2 6.52L12 17.4l-5.9 3.2 1.2-6.52-4.8-4.62 6.56-.86z";

/** Estrelas de avaliação (aceita meia estrela). */
export function Stars({ value, className = "h-4" }: { value: number; className?: string }) {
  return (
    <span className="inline-flex items-center gap-0.5" role="img" aria-label={`${value.toLocaleString("pt-BR", { maximumFractionDigits: 1 })} de 5 estrelas`}>
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, value - i));
        return (
          <svg key={i} viewBox="0 0 24 24" className={`${className} w-auto`} aria-hidden>
            <path d={STAR} fill="var(--color-ink)" opacity={0.15} />
            {fill > 0 && (
              <path d={STAR} fill="var(--color-gold)" stroke="#b38f00" strokeWidth={0.6} strokeLinejoin="round" style={fill < 1 ? { clipPath: `inset(0 ${100 - fill * 100}% 0 0)` } : undefined} />
            )}
          </svg>
        );
      })}
    </span>
  );
}

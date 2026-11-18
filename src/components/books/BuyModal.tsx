"use client";

import Image from "next/image";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { checkout, contact } from "@/lib/content";
import { getLenis } from "../layout/SmoothScroll";

type BookInfo = { title: string; cover?: string; price?: string; tone: string };

type Form = {
  name: string;
  email: string;
  phone: string;
  cpf: string;
  cep: string;
  street: string;
  number: string;
  complement: string;
  district: string;
  city: string;
  uf: string;
};

const empty: Form = { name: "", email: "", phone: "", cpf: "", cep: "", street: "", number: "", complement: "", district: "", city: "", uf: "" };

const UFS = "AC AL AP AM BA CE DF ES GO MA MT MS MG PA PB PR PE PI RJ RN RS RO RR SC SP SE TO".split(" ");

const brl = (n: number) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
/** "R$ 49,90" → 49.9 */
const parsePrice = (s?: string) => (s ? Number(s.replace(/[^\d,]/g, "").replace(",", ".")) || undefined : undefined);

const digits = (s: string) => s.replace(/\D/g, "");
const maskPhone = (s: string) => {
  const d = digits(s).slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
};
const maskCpf = (s: string) =>
  digits(s)
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
const maskCep = (s: string) => digits(s).slice(0, 8).replace(/(\d{5})(\d)/, "$1-$2");

function validate(f: Form) {
  const e: Partial<Record<keyof Form, string>> = {};
  if (f.name.trim().split(/\s+/).length < 2) e.name = "Informe nome e sobrenome";
  if (!/^\S+@\S+\.\S+$/.test(f.email)) e.email = "E-mail inválido";
  if (digits(f.phone).length < 10) e.phone = "Telefone incompleto";
  if (digits(f.cpf).length !== 11) e.cpf = "CPF incompleto";
  if (digits(f.cep).length !== 8) e.cep = "CEP incompleto";
  if (!f.street.trim()) e.street = "Informe a rua";
  if (!f.number.trim()) e.number = "Nº";
  if (!f.district.trim()) e.district = "Informe o bairro";
  if (!f.city.trim()) e.city = "Informe a cidade";
  if (!f.uf) e.uf = "UF";
  return e;
}

function Finder({ x, y }: { x: number; y: number }) {
  return (
    <>
      <rect x={x} y={y} width={7} height={7} rx={1.4} fill="currentColor" />
      <rect x={x + 1} y={y + 1} width={5} height={5} rx={0.9} fill="#fff" />
      <rect x={x + 2} y={y + 2} width={3} height={3} rx={0.6} fill="currentColor" />
    </>
  );
}

/** QR Code ilustrativo: padrão determinístico com os três quadrados de posição, sem dados reais. */
function FakeQr({ seed, className }: { seed: string; className?: string }) {
  const n = 29;
  const cells = useMemo(() => {
    let h = 2166136261;
    for (const c of seed) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
    const rnd = () => ((h = Math.imul(h ^ (h >>> 15), 2246822507) ^ Math.imul(h ^ (h >>> 13), 3266489909)) >>> 0) / 4294967296;
    const finder = (x: number, y: number) =>
      [
        [0, 0],
        [n - 7, 0],
        [0, n - 7],
      ].some(([fx, fy]) => x >= fx - 1 && x <= fx + 7 && y >= fy - 1 && y <= fy + 7);
    const out: [number, number][] = [];
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) if (!finder(x, y) && rnd() > 0.52) out.push([x, y]);
    return out;
  }, [seed]);
  return (
    <svg viewBox={`-2 -2 ${n + 4} ${n + 4}`} className={className} role="img" aria-label="QR Code Pix ilustrativo">
      <rect x={-2} y={-2} width={n + 4} height={n + 4} fill="#fff" />
      {cells.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x + 0.06} y={y + 0.06} width={0.88} height={0.88} rx={0.2} fill="currentColor" />
      ))}
      <Finder x={0} y={0} />
      <Finder x={n - 7} y={0} />
      <Finder x={0} y={n - 7} />
    </svg>
  );
}

function Field({
  label,
  error,
  className = "",
  ...input
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string }) {
  const id = useId();
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-[0.75rem] font-medium text-ink/60">
        {label}
      </label>
      <input
        id={id}
        aria-invalid={!!error}
        className={`w-full rounded-xl border bg-white/70 px-4 py-3 text-[0.9375rem] text-ink outline-none transition-[border-color,box-shadow] placeholder:text-ink/30 focus:border-ink focus:shadow-[0_0_0_4px_rgba(20,20,20,0.07)] ${
          error ? "border-crimson" : "border-ink/15"
        }`}
        {...input}
      />
      {error && <p className="mt-1 text-[0.75rem] text-crimson">{error}</p>}
    </div>
  );
}

function ShippingBadge({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 rounded-full bg-gold px-3 py-1.5 text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-ink ${className}`}>
      <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
        <path d="M1.5 4h8v6.5h-8zM9.5 6.5h3l2 2v2h-5M4 12.5a1.2 1.2 0 1 0 0-.01M12 12.5a1.2 1.2 0 1 0 0-.01" />
      </svg>
      Frete fixo
    </span>
  );
}

export function BuyModal({ book }: { book: BookInfo }) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [qty, setQty] = useState(1);
  const [form, setForm] = useState<Form>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [cepState, setCepState] = useState<"idle" | "loading" | "error">("idle");
  const [copied, setCopied] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const titleId = useId();

  const unit = parsePrice(book.price);
  const subtotal = unit ? unit * qty : undefined;
  const total = subtotal !== undefined ? subtotal + checkout.shipping : undefined;

  // trava a rolagem da página (Lenis + nativa), Esc fecha e devolve o foco ao botão
  useEffect(() => {
    if (!open) return;
    const lenis = getLenis();
    lenis?.stop();
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const t = setTimeout(() => panel.current?.querySelector<HTMLElement>("input, button")?.focus(), 60);
    const btn = trigger.current;
    return () => {
      lenis?.start();
      html.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      clearTimeout(t);
      btn?.focus();
    };
  }, [open]);

  useEffect(() => {
    panel.current?.scrollTo({ top: 0 });
  }, [step]);

  const set = (k: keyof Form, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  // CEP completo: preenche rua, bairro, cidade e UF pelo ViaCEP
  const onCep = async (raw: string) => {
    const v = maskCep(raw);
    set("cep", v);
    const d = digits(v);
    if (d.length !== 8) return setCepState("idle");
    setCepState("loading");
    try {
      const r = await fetch(`https://viacep.com.br/ws/${d}/json/`);
      const j = await r.json();
      if (j.erro) throw new Error();
      setForm((f) => ({
        ...f,
        street: j.logradouro || f.street,
        district: j.bairro || f.district,
        city: j.localidade || f.city,
        uf: j.uf || f.uf,
      }));
      setErrors((e) => ({ ...e, street: undefined, district: undefined, city: undefined, uf: undefined }));
      setCepState("idle");
    } catch {
      setCepState("error");
    }
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length) {
      panel.current?.querySelector<HTMLElement>("[aria-invalid=true]")?.focus();
      return;
    }
    setStep(2);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(checkout.pixCode);
    } catch {
      /* sem permissão de área de transferência: o código continua visível para copiar à mão */
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const address = `${form.street}, ${form.number}${form.complement ? ` – ${form.complement}` : ""}, ${form.district}, ${form.city}/${form.uf}, CEP ${form.cep}`;
  const waText = [
    "Olá, Vanessa! Fiz o pagamento via Pix e gostaria de confirmar meu pedido.",
    "",
    `Livro: ${book.title} (${qty}x)`,
    total !== undefined ? `Total: ${brl(total)} (frete fixo incluso)` : `Frete fixo: ${brl(checkout.shipping)}`,
    "",
    `Nome: ${form.name}`,
    `E-mail: ${form.email}`,
    `Telefone: ${form.phone}`,
    `CPF: ${form.cpf}`,
    `Endereço: ${address}`,
  ].join("\n");
  const waHref = `https://wa.me/${digits(contact.phoneHref)}?text=${encodeURIComponent(waText)}`;

  const close = () => setOpen(false);

  const summary = (
    <div className="flex gap-4 lg:flex-col lg:gap-6">
      <div
        className="relative aspect-[2/3] w-16 shrink-0 overflow-hidden rounded-md shadow-[0_18px_40px_-18px_rgba(0,0,0,0.6)] lg:w-40"
        style={{ background: book.tone }}
      >
        {book.cover && <Image src={book.cover} alt="" fill sizes="160px" className="object-cover" />}
      </div>
      <div className="min-w-0 flex-1">
        <p className="eyebrow text-paper/50">Seu pedido</p>
        <p className="mt-1.5 text-[0.9375rem] font-semibold leading-snug lg:text-lg">{book.title}</p>
        <dl className="mt-4 space-y-2 text-sm font-light text-paper/70">
          <div className="flex items-center justify-between gap-4">
            <dt>Quantidade</dt>
            <dd className="flex items-center gap-1 rounded-full border border-paper/20 p-0.5">
              <button
                type="button"
                aria-label="Diminuir quantidade"
                disabled={step === 2 || qty <= 1}
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="grid size-7 place-items-center rounded-full transition-colors hover:bg-paper/10 disabled:opacity-30"
              >
                −
              </button>
              <span className="w-5 text-center tabular-nums text-paper">{qty}</span>
              <button
                type="button"
                aria-label="Aumentar quantidade"
                disabled={step === 2 || qty >= 10}
                onClick={() => setQty((q) => Math.min(10, q + 1))}
                className="grid size-7 place-items-center rounded-full transition-colors hover:bg-paper/10 disabled:opacity-30"
              >
                +
              </button>
            </dd>
          </div>
          {subtotal !== undefined && (
            <div className="flex justify-between">
              <dt>Livro{qty > 1 ? "s" : ""}</dt>
              <dd className="tabular-nums">{brl(subtotal)}</dd>
            </div>
          )}
          <div className="flex justify-between">
            <dt>Frete fixo</dt>
            <dd className="tabular-nums">{brl(checkout.shipping)}</dd>
          </div>
          {total !== undefined && (
            <div className="flex justify-between border-t border-paper/15 pt-3 text-base font-semibold text-paper">
              <dt>Total</dt>
              <dd className="tabular-nums">{brl(total)}</dd>
            </div>
          )}
        </dl>
      </div>
    </div>
  );

  const shippingNotice = (
    <div className="rounded-2xl border border-gold/40 bg-gold/10 p-4">
      <ShippingBadge />
      <p className="mt-2.5 text-[0.8125rem] font-light leading-relaxed text-paper/75">
        Frete único de <strong className="font-semibold text-paper">{brl(checkout.shipping)}</strong> para todo o Brasil, por pedido.
      </p>
    </div>
  );

  return (
    <>
      <button
        ref={trigger}
        type="button"
        onClick={() => {
          setStep(1);
          setOpen(true);
        }}
        className="flex w-full items-center justify-center gap-3 bg-ink px-8 py-5 text-sm font-medium uppercase tracking-[0.2em] text-paper transition-colors duration-300 hover:bg-crimson sm:w-auto sm:self-start"
      >
        Quero comprar
        <span aria-hidden>→</span>
      </button>
      <p className="mt-4 flex flex-wrap items-center gap-3 text-sm font-light text-ink/55">
        <span className="rounded-full bg-gold px-2.5 py-1 text-[0.625rem] font-bold uppercase tracking-[0.16em] text-ink">Frete fixo</span>
        {brl(checkout.shipping)} para todo o Brasil · pagamento via Pix
      </p>

      {/* só abre depois de um clique, então já estamos no navegador e o portal é seguro */}
      {open &&
        createPortal(
          <div className="fixed inset-0 z-[120] flex items-end justify-center sm:items-center sm:p-6" role="presentation">
            <div className="modal-fade absolute inset-0 bg-ink/70 backdrop-blur-md" onClick={close} aria-hidden />
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              className="modal-rise relative flex max-h-[94svh] w-full max-w-5xl flex-col overflow-hidden rounded-t-3xl bg-canvas text-ink shadow-[0_40px_120px_-30px_rgba(0,0,0,0.7)] sm:max-h-[90svh] sm:rounded-3xl lg:flex-row"
            >
              {/* resumo */}
              <aside className="shrink-0 bg-ink p-5 text-paper sm:p-7 lg:flex lg:w-[340px] lg:flex-col lg:justify-between lg:p-9">
                {summary}
                <div className="mt-5 hidden lg:block">{shippingNotice}</div>
              </aside>

              {/* etapas */}
              <div ref={panel} data-lenis-prevent className="relative flex-1 overflow-y-auto overscroll-contain p-5 sm:p-8 lg:p-10">
                <button
                  type="button"
                  onClick={close}
                  aria-label="Fechar"
                  className="absolute right-4 top-4 grid size-10 place-items-center rounded-full text-ink/60 transition-colors hover:bg-ink/5 hover:text-ink sm:right-6 sm:top-6"
                >
                  <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                    <path d="m3 3 10 10M13 3 3 13" />
                  </svg>
                </button>

                <ol className="flex items-center gap-3 pr-12 text-[0.75rem] font-medium" aria-label="Etapas">
                  {["Dados e entrega", "Pagamento"].map((s, i) => {
                    const n = (i + 1) as 1 | 2;
                    const done = step > n;
                    const current = step === n;
                    return (
                      <li key={s} className="flex items-center gap-3" aria-current={current ? "step" : undefined}>
                        {i > 0 && <span className="h-px w-6 bg-ink/20 sm:w-10" aria-hidden />}
                        <span
                          className={`grid size-6 place-items-center rounded-full text-[0.6875rem] tabular-nums transition-colors ${
                            current ? "bg-ink text-paper" : done ? "bg-crimson text-paper" : "bg-ink/10 text-ink/50"
                          }`}
                        >
                          {done ? "✓" : n}
                        </span>
                        <span className={current ? "text-ink" : "text-ink/45"}>{s}</span>
                      </li>
                    );
                  })}
                </ol>

                {step === 1 ? (
                  <form onSubmit={submit} noValidate className="modal-step mt-7">
                    <h2 id={titleId} className="display text-[clamp(1.75rem,3vw,2.5rem)]">
                      Para onde vamos <span className="serif-accent text-crimson">enviar?</span>
                    </h2>
                    <p className="mt-2 text-sm font-light text-ink/60">Preencha seus dados. Leva menos de um minuto.</p>

                    <div className="mt-5 lg:hidden">
                      <div className="flex items-center gap-3 rounded-2xl bg-gold/15 p-3.5 text-[0.8125rem] font-light text-ink/75">
                        <ShippingBadge className="shrink-0" />
                        {brl(checkout.shipping)} para todo o Brasil
                      </div>
                    </div>

                    <fieldset className="mt-7">
                      <legend className="eyebrow mb-4 text-ink/45">Seus dados</legend>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="Nome completo" autoComplete="name" value={form.name} onChange={(e) => set("name", e.target.value)} error={errors.name} className="sm:col-span-2" placeholder="Como está no documento" />
                        <Field label="E-mail" type="email" inputMode="email" autoComplete="email" value={form.email} onChange={(e) => set("email", e.target.value)} error={errors.email} placeholder="voce@email.com" />
                        <Field label="WhatsApp / telefone" type="tel" inputMode="tel" autoComplete="tel-national" value={form.phone} onChange={(e) => set("phone", maskPhone(e.target.value))} error={errors.phone} placeholder="(00) 00000-0000" />
                        <Field label="CPF" inputMode="numeric" value={form.cpf} onChange={(e) => set("cpf", maskCpf(e.target.value))} error={errors.cpf} placeholder="000.000.000-00" />
                      </div>
                    </fieldset>

                    <fieldset className="mt-8">
                      <legend className="eyebrow mb-4 text-ink/45">Endereço de entrega</legend>
                      <div className="grid grid-cols-6 gap-4">
                        <div className="col-span-6 sm:col-span-3">
                          <Field label="CEP" inputMode="numeric" autoComplete="postal-code" value={form.cep} onChange={(e) => onCep(e.target.value)} error={errors.cep} placeholder="00000-000" />
                          <p className="mt-1 h-4 text-[0.6875rem] text-ink/45" aria-live="polite">
                            {cepState === "loading" ? "Buscando endereço…" : cepState === "error" ? "CEP não encontrado. Preencha à mão." : "O endereço é preenchido pelo CEP."}
                          </p>
                        </div>
                        <Field label="Rua / avenida" autoComplete="address-line1" value={form.street} onChange={(e) => set("street", e.target.value)} error={errors.street} className="col-span-6" />
                        <Field label="Número" inputMode="numeric" value={form.number} onChange={(e) => set("number", e.target.value)} error={errors.number} className="col-span-2" />
                        <Field label="Complemento (opcional)" autoComplete="address-line2" value={form.complement} onChange={(e) => set("complement", e.target.value)} className="col-span-4" placeholder="Apto, bloco…" />
                        <Field label="Bairro" value={form.district} onChange={(e) => set("district", e.target.value)} error={errors.district} className="col-span-6 sm:col-span-3" />
                        <Field label="Cidade" autoComplete="address-level2" value={form.city} onChange={(e) => set("city", e.target.value)} error={errors.city} className="col-span-4 sm:col-span-2" />
                        <div className="col-span-2 sm:col-span-1">
                          <label htmlFor={`${titleId}-uf`} className="mb-1.5 block text-[0.75rem] font-medium text-ink/60">
                            UF
                          </label>
                          <select
                            id={`${titleId}-uf`}
                            autoComplete="address-level1"
                            aria-invalid={!!errors.uf}
                            value={form.uf}
                            onChange={(e) => set("uf", e.target.value)}
                            className={`w-full appearance-none rounded-xl border bg-white/70 px-3 py-3 text-[0.9375rem] outline-none focus:border-ink ${errors.uf ? "border-crimson" : "border-ink/15"}`}
                          >
                            <option value="">—</option>
                            {UFS.map((u) => (
                              <option key={u}>{u}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </fieldset>

                    <button
                      type="submit"
                      className="mt-9 flex w-full items-center justify-center gap-3 rounded-full bg-ink px-8 py-4 text-sm font-medium uppercase tracking-[0.18em] text-paper transition-colors hover:bg-crimson"
                    >
                      Continuar para o pagamento <span aria-hidden>→</span>
                    </button>
                  </form>
                ) : (
                  <div className="modal-step mt-7">
                    <h2 id={titleId} className="display text-[clamp(1.75rem,3vw,2.5rem)]">
                      Pague com <span className="serif-accent text-crimson">Pix.</span>
                    </h2>
                    <p className="mt-2 text-sm font-light text-ink/60">
                      O pagamento vai <strong className="font-semibold text-ink">direto para a conta da Vanessa</strong>. Escaneie o QR Code
                      ou use o Pix copia e cola.
                    </p>

                    <div className="mt-6 grid gap-6 sm:grid-cols-[auto_1fr] sm:items-start">
                      <div className="mx-auto w-full max-w-[220px] rounded-2xl border border-ink/10 bg-white p-4 sm:mx-0 sm:w-52">
                        <FakeQr seed={`${book.title}-${qty}`} className="w-full text-ink" />
                        <p className="mt-2 text-center text-[0.625rem] uppercase tracking-[0.18em] text-ink/40">QR Code ilustrativo</p>
                      </div>

                      <div className="min-w-0 space-y-4">
                        {total !== undefined && (
                          <div>
                            <p className="text-[0.75rem] font-medium text-ink/55">Valor a pagar</p>
                            <p className="text-3xl font-semibold tracking-tight tabular-nums">{brl(total)}</p>
                            <p className="text-[0.75rem] font-light text-ink/50">Já inclui o frete fixo de {brl(checkout.shipping)}</p>
                          </div>
                        )}
                        <div>
                          <p className="mb-1.5 text-[0.75rem] font-medium text-ink/55">Pix copia e cola</p>
                          <div className="flex items-stretch gap-2">
                            <code className="min-w-0 flex-1 truncate rounded-xl border border-ink/15 bg-white/70 px-3 py-3 font-mono text-[0.75rem] text-ink/70">
                              {checkout.pixCode}
                            </code>
                            <button
                              type="button"
                              onClick={copy}
                              className={`shrink-0 rounded-xl px-4 text-[0.75rem] font-semibold uppercase tracking-[0.12em] transition-colors ${
                                copied ? "bg-crimson text-paper" : "bg-ink text-paper hover:bg-crimson"
                              }`}
                            >
                              {copied ? "Copiado!" : "Copiar"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 rounded-2xl border border-ink/10 bg-white/60 p-5">
                      <p className="eyebrow text-ink/45">Dados da conta</p>
                      <dl className="mt-3 grid gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
                        {[
                          ["Titular", checkout.holder],
                          ["CNPJ", checkout.cnpj],
                          ["Banco", checkout.bank],
                          ["Agência / Conta", `${checkout.agency} / ${checkout.account}`],
                          ["Chave Pix (CNPJ)", checkout.pixKey],
                        ].map(([k, v]) => (
                          <div key={k}>
                            <dt className="text-[0.6875rem] text-ink/50">{k}</dt>
                            <dd className="font-medium">{v}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>

                    <div className="mt-4 flex items-center gap-3 rounded-2xl bg-gold/15 p-3.5 text-[0.8125rem] font-light text-ink/75">
                      <ShippingBadge className="shrink-0" />
                      {brl(checkout.shipping)} para todo o Brasil, já calculado no seu pedido.
                    </div>

                    <div className="mt-8 rounded-3xl bg-ink p-6 text-paper sm:flex sm:items-center sm:justify-between sm:gap-6">
                      <p className="text-lg font-semibold leading-snug">
                        Fez o pagamento? <span className="font-light text-paper/70">Me chame no WhatsApp para confirmar.</span>
                      </p>
                      <a
                        href={waHref}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-5 flex shrink-0 items-center justify-center gap-2.5 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-ink transition-transform hover:scale-[1.03] sm:mt-0"
                      >
                        <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden>
                          <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.7.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.8 9.8 0 1 1 12 21.8zm0-21.6A11.8 11.8 0 0 0 1.9 18L.2 24l6.2-1.6A11.8 11.8 0 1 0 12 .2z" />
                        </svg>
                        Falar comigo
                      </a>
                    </div>

                    <button type="button" onClick={() => setStep(1)} className="mt-6 text-sm font-light text-ink/55 underline-offset-4 hover:text-ink hover:underline">
                      ← Corrigir meus dados
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}

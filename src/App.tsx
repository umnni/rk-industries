import { type ReactNode, useEffect, useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  ArrowRight, ArrowUpRight, Boxes, Building2, Check, ChevronDown, Clock3,
  FileText, FlaskConical, Globe2, Mail, MapPin, Menu, MessageCircle,
  Package, Phone, Search, Send, ShieldCheck, SlidersHorizontal, Sparkles, X,
} from 'lucide-react';
import { Link, Route, Router as WouterRouter, Switch, useLocation } from 'wouter';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';

const queryClient = new QueryClient();

const imageUrls = {
  soap: 'https://2.wlimg.com/product_images/bc-small/dir_137/4084098/soap-noodles-1477542308-2511778.jpeg',
  prills: 'https://2.wlimg.com/product_images/bc-small/2023/8/4084098/caustic-soda-prills-1693460585-5895115.jpeg',
  potassium: 'https://2.wlimg.com/product_images/bc-small/2023/9/4084098/potassium-carbonate-powder-1693460769-7058083.jpeg',
  phosphate: 'https://2.wlimg.com/product_images/bc-small/dir_137/4084098/trisodium-phosphate-1477541467-2511768.jpeg',
  citrate: 'https://2.wlimg.com/product_images/bc-small/dir_137/4084098/potassium-citrate-1477544684-2511794.jpeg',
  silicate: 'https://2.wlimg.com/product_images/bc-small/2023/9/4084098/sodium-meta-silicate-1693460813-7058087.jpeg',
  nitrate: 'https://2.wlimg.com/product_images/bc-small/dir_137/4084098/sodium-nitrate-1477542075-2511775.jpeg',
  flakes: 'https://2.wlimg.com/product_images/bc-small/dir_137/4084098/caustic-soda-flakes-1477541795-2511773.jpeg',
};

type Product = { name: string; category: string; image?: string; note: string };
const products: Product[] = [
  { name: 'Soap Noodles', category: 'Specialty materials', image: imageUrls.soap, note: 'For soap and personal care manufacturing.' },
  { name: 'Caustic Soda Prills', category: 'Alkaline chemistry', image: imageUrls.prills, note: 'A consistent, free-flowing alkaline raw material.' },
  { name: 'Potassium Carbonate Powder', category: 'Industrial salts', image: imageUrls.potassium, note: 'A dependable carbonate for industrial formulations.' },
  { name: 'Trisodium Phosphate Powder', category: 'Phosphates', image: imageUrls.phosphate, note: 'A versatile phosphate for cleaning and process use.' },
  { name: 'Potassium Citrate', category: 'Citrates', image: imageUrls.citrate, note: 'A specialty citrate for formulation requirements.' },
  { name: 'Sodium Meta Silicate', category: 'Silicates', image: imageUrls.silicate, note: 'For cleaning, detergent and industrial applications.' },
  { name: 'Sodium Nitrate', category: 'Industrial salts', image: imageUrls.nitrate, note: 'A carefully sourced nitrate raw material.' },
  { name: 'Caustic Soda Flakes', category: 'Alkaline chemistry', image: imageUrls.flakes, note: 'A widely used industrial alkali in flake form.' },
  { name: 'Sodium Nitrite Powder', category: 'Industrial salts', note: 'For industrial and process applications.' },
  { name: 'Tetrasodium Pyrophosphate Powder', category: 'Phosphates', note: 'A specialty phosphate for formulated products.' },
  { name: 'Sodium Acid Pyrophosphate Powder', category: 'Phosphates', note: 'A functional ingredient for formulation work.' },
  { name: 'Sodium Hexametaphosphate Powder', category: 'Phosphates', note: 'For water treatment and industrial formulations.' },
  { name: 'Sodium Citrate', category: 'Citrates', note: 'A useful citrate salt for formulation needs.' },
  { name: 'Tripotassium Citrate Monohydrate', category: 'Citrates', note: 'A specialty citrate material.' },
  { name: 'Sodium Carbonate Powder', category: 'Industrial salts', note: 'A foundational industrial carbonate.' },
  { name: 'Phosphoric Acid', category: 'Acids', note: 'For industrial processing and formulation.' },
  { name: 'Ammonium Phosphate Powder', category: 'Phosphates', note: 'A versatile phosphate raw material.' },
  { name: 'Disodium Phosphate Anhydrous', category: 'Phosphates', note: 'For dependable formulation support.' },
  { name: 'Sodium Hydroxide Pellets', category: 'Alkaline chemistry', note: 'A concentrated alkali in pellet form.' },
  { name: 'Potassium Hydroxide Pellets', category: 'Alkaline chemistry', note: 'A high-utility potassium alkali.' },
  { name: 'Caustic Potash Flakes', category: 'Alkaline chemistry', note: 'A practical flake-form caustic potash.' },
  { name: 'Glycerin Liquid', category: 'Specialty materials', note: 'A versatile liquid material for formulation.' },
  { name: 'Stearic Acid Flakes', category: 'Specialty materials', note: 'A dependable fatty acid material.' },
  { name: 'Ammonium Bicarbonate Powder', category: 'Industrial salts', note: 'For industrial processing and formulation use.' },
  { name: 'Manganese Carbonate Powder', category: 'Industrial salts', note: 'A specialty manganese compound.' },
  { name: 'Hydrogenated Castor Oil', category: 'Specialty materials', note: 'A functional specialty raw material.' },
];

const categories = ['All materials', 'Alkaline chemistry', 'Phosphates', 'Citrates', 'Industrial salts', 'Specialty materials', 'Acids'];

function usePageMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title;
    const upsert = (selector: string, attrs: Record<string, string>) => {
      let el = document.head.querySelector(selector) as HTMLMetaElement | null;
      if (!el) { el = document.createElement('meta'); document.head.appendChild(el); }
      Object.entries(attrs).forEach(([key, value]) => el!.setAttribute(key, value));
    };
    upsert('meta[name="description"]', { name: 'description', content: description });
    upsert('meta[property="og:title"]', { property: 'og:title', content: title });
    upsert('meta[property="og:description"]', { property: 'og:description', content: description });
    upsert('meta[property="og:type"]', { property: 'og:type', content: 'website' });
  }, [title, description]);
}

function BrandMark({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3 group" data-testid="link-brand">
      <span className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-xl bg-[#07517c] shadow-[0_8px_18px_rgba(4,79,121,.22)]">
        <span className="absolute -right-2 -top-2 h-7 w-7 rounded-full bg-[#f47b2a]" />
        <span className="relative font-display text-xl font-bold italic tracking-[-.12em] text-white">rr</span>
      </span>
      <span className="leading-none">
        <span className={`block font-display text-[17px] font-bold tracking-[-.04em] ${light ? 'text-white' : 'text-[#064d76]'}`}>RK Industries</span>
        <span className={`mt-1 block font-mono-ui text-[8px] uppercase tracking-[.18em] ${light ? 'text-sky-100/55' : 'text-slate-500'}`}>Materially reliable</span>
      </span>
    </Link>
  );
}

function Header() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const isActive = (href: string) => location === href;
  const close = () => { setMobileOpen(false); setMoreOpen(false); };
  return (
    <>
      <div className="hidden bg-[#064b74] text-[10px] text-white/80 md:block">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between px-6 py-2 font-mono-ui">
          <span className="flex items-center gap-2"><MapPin size={12} className="text-[#f58a3a]" /> Lal Kuan, Ghaziabad</span>
          <span>INDUSTRIAL CHEMICALS · SPECIALTY RAW MATERIALS</span>
          <a href="tel:+91-XXXXXXXXXX" className="flex items-center gap-2 hover:text-white" data-testid="link-top-phone"><Phone size={12} /> +91-XXXXXXXXXX</a>
        </div>
      </div>
      <header className="sticky top-0 z-40 border-b border-[#d6e4ec]/80 bg-[rgba(247,250,252,.86)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between px-5 py-4 md:px-6">
          <BrandMark />
          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
            {[
              ['/', 'Home'], ['/about', 'About'], ['/products', 'Products'], ['/clients', 'Trade partners'],
            ].map(([href, label]) => (
              <Link key={href} href={href} onClick={close} className={`rounded-full px-4 py-2 text-[12px] font-bold transition ${isActive(href) ? 'bg-[#e7f2f7] text-[#06517d]' : 'text-slate-600 hover:bg-[#edf4f7] hover:text-[#06517d]'}`} data-testid={`link-nav-${label.toLowerCase().replace(/\s/g, '-')}`}>
                {label}
              </Link>
            ))}
            <div className="relative">
              <button type="button" onClick={() => setMoreOpen((v) => !v)} className={`flex items-center gap-1 rounded-full px-4 py-2 text-[12px] font-bold transition ${location === '/contact' ? 'bg-[#e7f2f7] text-[#06517d]' : 'text-slate-600 hover:bg-[#edf4f7]'}`} data-testid="button-more-menu">
                More <ChevronDown size={13} className={moreOpen ? 'rotate-180 transition' : 'transition'} />
              </button>
              {moreOpen && (
                <div className="absolute right-0 top-12 w-52 rounded-2xl border border-[#d6e4ec] bg-[rgba(255,255,255,.96)] p-2 shadow-[0_18px_40px_rgba(12,59,87,.13)]">
                  <Link href="/contact" onClick={close} className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-[#edf5f8]" data-testid="link-more-contact"><Mail size={16} className="text-[#ef7529]" /> Contact & enquiry</Link>
                  <Link href="/products" onClick={close} className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-[#edf5f8]" data-testid="link-more-products"><Package size={16} className="text-[#0879ac]" /> Material catalogue</Link>
                </div>
              )}
            </div>
          </nav>
          <div className="hidden items-center gap-3 md:flex">
            <a href="https://wa.me/91XXXXXXXXXX" target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-full border border-[#cddfe8] px-4 py-2 text-[11px] font-bold text-[#07517c] transition hover:border-[#f47b2a] hover:text-[#d45d18]" data-testid="link-whatsapp"><MessageCircle size={14} /> WhatsApp</a>
            <Link href="/contact" className="shine flex items-center gap-2 rounded-full bg-[#f47b2a] px-4 py-2.5 text-[11px] font-bold text-white shadow-[0_8px_18px_rgba(244,123,42,.2)] transition hover:-translate-y-0.5" data-testid="link-header-enquiry">Send an enquiry <ArrowUpRight size={14} /></Link>
          </div>
          <button type="button" className="rounded-xl p-2 text-[#07517c] md:hidden" onClick={() => setMobileOpen((v) => !v)} aria-label="Toggle navigation" data-testid="button-mobile-menu">
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {mobileOpen && (
          <div className="border-t border-[#d6e4ec] bg-[#f8fbfc] px-5 py-4 md:hidden">
            <div className="flex flex-col gap-1">
              {[['/', 'Home'], ['/about', 'About'], ['/products', 'Products'], ['/clients', 'Trade partners'], ['/contact', 'Contact & enquiry']].map(([href, label]) => (
                <Link key={href} href={href} onClick={close} className={`rounded-xl px-3 py-3 text-sm font-bold ${isActive(href) ? 'bg-[#e5f1f6] text-[#06517d]' : 'text-slate-600'}`} data-testid={`link-mobile-${label.toLowerCase().replace(/\s/g, '-')}`}>{label}</Link>
              ))}
              <a href="https://wa.me/91XXXXXXXXXX" target="_blank" rel="noreferrer" className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-[#07517c] px-4 py-3 text-sm font-bold text-white" data-testid="link-mobile-whatsapp"><MessageCircle size={16} /> WhatsApp +91-XXXXXXXXXX</a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

function Footer() {
  return (
    <footer className="bg-[#073b5c] text-white">
      <div className="mx-auto grid max-w-[1240px] gap-12 px-5 py-14 md:grid-cols-[1.4fr_.8fr_1fr] md:px-6">
        <div>
          <BrandMark />
          <p className="mt-5 max-w-sm text-sm leading-7 text-sky-100/70">A dependable sourcing partner for industrial chemicals and specialty raw materials from Lal Kuan, Ghaziabad.</p>
          <div className="mt-7 flex gap-2">
            <a href="https://wa.me/91XXXXXXXXXX" target="_blank" rel="noreferrer" className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-sky-100 transition hover:border-[#f47b2a] hover:text-[#f47b2a]" aria-label="WhatsApp" data-testid="link-footer-whatsapp"><MessageCircle size={17} /></a>
            <a href="mailto:info@rkindustries.com" className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-sky-100 transition hover:border-[#f47b2a] hover:text-[#f47b2a]" aria-label="Email" data-testid="link-footer-email"><Mail size={17} /></a>
          </div>
        </div>
        <div>
          <p className="font-mono-ui text-[10px] uppercase tracking-[.2em] text-[#f47b2a]">Navigate</p>
          <div className="mt-5 flex flex-col gap-3 text-sm text-sky-100/75">
            <Link href="/about" className="hover:text-white" data-testid="link-footer-about">Company & approach</Link>
            <Link href="/products" className="hover:text-white" data-testid="link-footer-products">Material catalogue</Link>
            <Link href="/clients" className="hover:text-white" data-testid="link-footer-clients">Trade partners</Link>
            <Link href="/contact" className="hover:text-white" data-testid="link-footer-contact">Contact & enquiry</Link>
          </div>
        </div>
        <div>
          <p className="font-mono-ui text-[10px] uppercase tracking-[.2em] text-[#f47b2a]">Find us</p>
          <address className="mt-5 not-italic text-sm leading-7 text-sky-100/75">15/1, S.S.G.T. Road,<br />Industrial Areai,<br />Ghaziabad (UP) 201001</address>
          <a href="tel:+91-XXXXXXXXXX" className="mt-4 block text-sm font-semibold text-white" data-testid="link-footer-phone">+91-XXXXXXXXXX</a>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-2 px-5 py-5 text-[10px] text-sky-100/45 md:flex-row md:items-center md:justify-between md:px-6">
          <span>RK Industries · Industrial chemicals & specialty materials</span>
          <span>Fax: +91-XXXXXXXXXX</span>
        </div>
      </div>
    </footer>
  );
}

function Shell({ children }: { children: ReactNode }) {
  return <div className="noise min-h-[100dvh] bg-[#f4f8fa]"><Header />{children}<Footer /></div>;
}

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <div className={`flex items-center gap-2 font-mono-ui text-[10px] font-medium uppercase tracking-[.2em] ${light ? 'text-[#f7a266]' : 'text-[#0879ac]'}`}><span className={`h-1.5 w-1.5 rounded-full ${light ? 'bg-[#f47b2a]' : 'bg-[#f47b2a]'}`} />{children}</div>;
}

function Home() {
  usePageMeta('RK Industries | Industrial Chemicals & Specialty Materials', 'RK Industries is a Ghaziabad-based supplier and trader of industrial chemicals and specialty raw materials from Lal Kuan.');
  return (
    <>
      <main>
        <section className="site-grid relative overflow-hidden">
          <div className="mx-auto grid max-w-[1240px] items-center gap-12 px-5 pb-16 pt-14 md:grid-cols-[1.03fr_.97fr] md:px-6 md:pb-24 md:pt-20">
            <div className="relative z-10 animate-rise">
              <Eyebrow>Lal Kuan, Ghaziabad · sourcing partner</Eyebrow>
              <h1 className="mt-6 max-w-2xl font-display text-[clamp(3rem,7vw,6.7rem)] font-bold leading-[.91] tracking-[-.075em] text-[#073b5c]">Materials that move <span className="text-[#e66c24]">industry.</span></h1>
              <p className="mt-7 max-w-lg text-base leading-8 text-slate-600 md:text-lg">Industrial chemicals and specialty raw materials, sourced with the clarity and responsiveness today’s buyers expect.</p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link href="/products" className="shine flex items-center gap-3 rounded-full bg-[#07517c] px-6 py-3.5 text-sm font-bold text-white shadow-[0_12px_26px_rgba(7,81,124,.2)] transition hover:-translate-y-1" data-testid="link-hero-products">Explore materials <ArrowRight size={16} /></Link>
                <Link href="/contact" className="flex items-center gap-2 rounded-full border border-[#bcd3de] bg-[rgba(255,255,255,.5)] px-6 py-3.5 text-sm font-bold text-[#07517c] transition hover:border-[#f47b2a]" data-testid="link-hero-enquiry">Start an enquiry <ArrowUpRight size={15} /></Link>
              </div>
              <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-[#d5e3e9] pt-5 text-[10px] font-bold uppercase tracking-[.16em] text-slate-500">
                <span className="flex items-center gap-2"><ShieldCheck size={15} className="text-[#0b83b3]" /> Product-led sourcing</span>
                <span className="flex items-center gap-2"><Clock3 size={15} className="text-[#0b83b3]" /> Clear communication</span>
              </div>
            </div>
            <div className="relative min-h-[410px] md:min-h-[540px]">
              <div className="absolute right-0 top-3 h-[80%] w-[80%] rounded-[4rem] bg-[#07517c] hero-glow" />
              <div className="absolute bottom-0 left-2 h-[74%] w-[76%] rounded-[3.5rem] border border-white/30 bg-[linear-gradient(145deg,rgba(248,177,109,.92),rgba(239,104,29,.75))] shadow-[0_24px_70px_rgba(211,104,34,.18)]" />
              <div className="absolute left-[11%] top-[12%] h-[68%] w-[74%] rotate-[-5deg] overflow-hidden rounded-[3rem] border-[10px] border-[rgba(235,247,250,.85)] bg-[#dcecf0] shadow-[0_25px_50px_rgba(1,45,72,.28)] animate-float">
                <img src={imageUrls.prills} alt="Caustic soda prills" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-[linear-gradient(150deg,rgba(1,72,106,.1),rgba(238,113,37,.13))]" />
              </div>
              <div className="absolute bottom-[7%] right-[5%] rounded-2xl border border-white/25 bg-[rgba(4,57,87,.83)] px-4 py-3 text-white backdrop-blur-md">
                <p className="font-mono-ui text-[9px] uppercase tracking-[.14em] text-sky-200">Featured material</p>
                <p className="mt-1 font-display text-lg font-bold">Caustic Soda Prills</p>
              </div>
              <span className="absolute right-[2%] top-[5%] h-16 w-16 rounded-full border border-[#f47b2a]/50" />
              <span className="absolute right-[5%] top-[8%] h-1.5 w-1.5 rounded-full bg-[#f47b2a]" />
            </div>
          </div>
        </section>

        <section className="bg-[#073b5c] text-white">
          <div className="mx-auto grid max-w-[1240px] gap-0 px-5 md:grid-cols-[.8fr_1.2fr] md:px-6">
            <div className="border-b border-white/10 py-12 md:border-b-0 md:border-r md:py-16 md:pr-16">
              <Eyebrow light>Built around your brief</Eyebrow>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-[-.05em] md:text-4xl">The right material is only the beginning.</h2>
            </div>
            <div className="grid gap-8 py-12 md:grid-cols-3 md:py-16 md:pl-16">
              {[
                [<FlaskConical size={20} />, 'Industrial focus', 'A considered range of chemicals, salts, phosphates and specialty materials.'],
                [<Boxes size={20} />, 'Practical range', 'From everyday production inputs to more specific formulation requirements.'],
                [<MessageCircle size={20} />, 'Direct dialogue', 'A straightforward line from your enquiry to the material you need.'],
              ].map(([icon, title, text]) => <div key={title as string}><div className="text-[#f47b2a]">{icon}</div><h3 className="mt-4 font-display text-lg font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-sky-100/65">{text}</p></div>)}
            </div>
          </div>
        </section>

        <section className="site-grid px-5 py-20 md:px-6 md:py-28">
          <div className="mx-auto max-w-[1240px]">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div><Eyebrow>Browse the range</Eyebrow><h2 className="mt-4 max-w-xl font-display text-4xl font-bold tracking-[-.06em] text-[#073b5c] md:text-5xl">A focused catalogue for real production work.</h2></div>
              <Link href="/products" className="group flex items-center gap-2 pb-1 text-sm font-bold text-[#07517c]" data-testid="link-home-catalogue">View full catalogue <ArrowRight size={16} className="transition group-hover:translate-x-1" /></Link>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-4">
              {products.slice(0, 4).map((product, index) => <ProductCard key={product.name} product={product} index={index} />)}
            </div>
          </div>
        </section>

        <section className="px-5 pb-20 md:px-6 md:pb-28">

          <div className="mx-auto grid max-w-[1240px] overflow-hidden rounded-[2rem] bg-[#e8f2f5] md:grid-cols-[1.1fr_.9fr]">
            <div className="p-8 md:p-14"><Eyebrow>From Lal Kuan, Ghaziabad</Eyebrow><h2 className="mt-5 max-w-lg font-display text-4xl font-bold leading-[.98] tracking-[-.06em] text-[#073b5c] md:text-5xl">A local address with a wider working view.</h2><p className="mt-5 max-w-md leading-7 text-slate-600">RK Industries brings the product fluency and directness of Ghaziabad’s chemical trading district to buyers looking for a capable sourcing partner.</p><Link href="/about" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#07517c] px-5 py-3 text-sm font-bold text-white" data-testid="link-home-about">How we work <ArrowRight size={15} /></Link></div>
            <div className="relative min-h-[300px] overflow-hidden bg-[#07517c] p-8"><div className="absolute -right-16 -top-20 h-64 w-64 rounded-full border-[32px] border-[#f47b2a]/80" /><div className="absolute bottom-8 left-8 right-8 rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-md"><MapPin className="text-[#f47b2a]" size={21} /><p className="mt-4 text-lg font-bold text-white">15/1, S.S.G.T. Road</p><p className="mt-1 text-sm text-sky-100/70">Industrial Area<br />Ghaziabad (UP) 201001, India</p></div></div>
          </div>
        </section>
      </main>
    </>
  );
}

function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  return (
    <article className="group relative overflow-hidden rounded-3xl border border-[#d8e6ec] bg-[rgba(255,255,255,.75)] p-3 shadow-[0_8px_25px_rgba(12,59,87,.04)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_34px_rgba(12,59,87,.1)]" style={{ animationDelay: `${index * 80}ms` }} data-testid={`card-product-${product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>
      <div className="relative aspect-[1.15] overflow-hidden rounded-2xl bg-[#e5f0f3]">
        {product.image ? <img src={product.image} alt={product.name} loading="lazy" className="h-full w-full object-cover mix-blend-multiply transition duration-500 group-hover:scale-105" /> : <div className="grid h-full place-items-center bg-[radial-gradient(circle_at_30%_30%,#f9bc82,#d96c2d_38%,#07517c_39%,#063f61_100%)]"><Package size={42} className="text-white/80" /></div>}
        <span className="absolute left-3 top-3 rounded-full bg-[rgba(247,251,252,.88)] px-2.5 py-1 font-mono-ui text-[9px] uppercase tracking-[.12em] text-[#07517c]">{product.category}</span>
      </div>
      <div className="p-3 pb-2"><h3 className="font-display text-lg font-bold leading-tight text-[#073b5c]">{product.name}</h3><p className="mt-2 min-h-10 text-xs leading-5 text-slate-500">{product.note}</p><Link href={`/contact?product=${encodeURIComponent(product.name)}`} className="mt-4 flex items-center justify-between border-t border-[#dce8ed] pt-3 text-xs font-bold text-[#0879ac]" data-testid={`link-enquire-${product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>Enquire <ArrowUpRight size={15} /></Link></div>
    </article>
  );
}

function PageIntro({ eyebrow, title, copy }: { eyebrow: string; title: ReactNode; copy: string }) {
  return <section className="site-grid border-b border-[#d8e6ec] px-5 pb-14 pt-16 md:px-6 md:pb-20 md:pt-24"><div className="mx-auto max-w-[1240px]"><Eyebrow>{eyebrow}</Eyebrow><h1 className="mt-5 max-w-4xl font-display text-[clamp(2.8rem,6vw,5.8rem)] font-bold leading-[.94] tracking-[-.075em] text-[#073b5c]">{title}</h1><p className="mt-7 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">{copy}</p></div></section>;
}

function About() {
  usePageMeta('About RK Industries | Direct, Product-Led Sourcing', 'Learn about RK Industries, a supplier and trader of industrial chemicals and specialty raw materials from Lal Kuan Ghaziabad.');
  return <main>
    <PageIntro eyebrow="Company & approach" title={<>A grounded partner for <span className="text-[#e66c24]">serious sourcing.</span></>} copy="RK Industries is a Ghaziabad-based supplier and trader of industrial chemicals and specialty raw materials. Our work is simple: understand the material brief, communicate clearly, and help buyers move forward." />
    <section className="mx-auto grid max-w-[1240px] gap-12 px-5 py-20 md:grid-cols-[.8fr_1.2fr] md:px-6 md:py-28">
      <div><Eyebrow>Our point of view</Eyebrow><h2 className="mt-5 font-display text-4xl font-bold leading-[1] tracking-[-.06em] text-[#073b5c]">Useful answers beat impressive noise.</h2></div>
      <div className="space-y-6 text-[15px] leading-8 text-slate-600"><p>Buying industrial materials rarely needs another layer of abstraction. It needs product knowledge, a practical range, and a partner who can keep the conversation moving.</p><p>From our base Lal Kuan Ghaziabad , we work across a focused catalogue of alkaline chemicals, phosphates, citrates, industrial salts and specialty materials.</p><div className="grid gap-4 border-t border-[#d8e6ec] pt-7 sm:grid-cols-2"><div className="rounded-2xl bg-[#e7f2f6] p-5"><ShieldCheck className="text-[#0879ac]" size={20} /><h3 className="mt-4 font-display text-xl font-bold text-[#073b5c]">Clear by default</h3><p className="mt-2 text-sm leading-6">Straightforward product conversations, without unnecessary complexity.</p></div><div className="rounded-2xl bg-[#fff0e6] p-5"><Sparkles className="text-[#e66c24]" size={20} /><h3 className="mt-4 font-display text-xl font-bold text-[#073b5c]">Specific when it matters</h3><p className="mt-2 text-sm leading-6">A catalogue built around materials buyers actually ask for.</p></div></div></div>
    </section>
    <section className="bg-[#073b5c] px-5 py-20 text-white md:px-6 md:py-24"><div className="mx-auto max-w-[1240px]"><Eyebrow light>What you can expect</Eyebrow><div className="mt-10 grid gap-8 md:grid-cols-3">{[['01', 'A relevant catalogue', 'A considered range spanning everyday industrial inputs and specialty raw materials.'], ['02', 'A direct conversation', 'Bring us a material requirement and get a clear, practical next step.'], ['03', 'A Ghaziabad vantage point', 'Lal Kuan location keeps us close to a deep, active trading ecosystem.']].map(([num, title, copy]) => <div key={num} className="border-t border-white/15 pt-5"><span className="font-mono-ui text-xs text-[#f47b2a]">{num}</span><h3 className="mt-6 font-display text-2xl font-bold">{title}</h3><p className="mt-3 max-w-xs text-sm leading-7 text-sky-100/65">{copy}</p></div>)}</div></div></section>
    <section className="site-grid px-5 py-20 md:px-6 md:py-24"><div className="mx-auto grid max-w-[1240px] gap-10 md:grid-cols-[1fr_.8fr]"><div><Eyebrow>Company details</Eyebrow><h2 className="mt-5 font-display text-4xl font-bold tracking-[-.06em] text-[#073b5c]">Find RK Industries in the heart of Ghaziabad .</h2></div><div className="rounded-3xl border border-[#d6e5eb] bg-[rgba(255,255,255,.65)] p-7"><div className="flex gap-4"><MapPin className="mt-1 shrink-0 text-[#e66c24]" size={20} /><p className="text-sm font-semibold leading-7 text-[#073b5c]">15/1, S.S.G.T. Road,
<br />Industrial Area,<br />Ghaziabad (UP) 201001</p></div><div className="mt-6 border-t border-[#d6e5eb] pt-6 text-sm leading-7 text-slate-600"><p><span className="font-semibold text-[#073b5c]">Phone</span> · +91-XXXXXXXXXX</p><p><span className="font-semibold text-[#073b5c]">Fax</span> · +91-XXXXXXXXXX</p><p><span className="font-semibold text-[#073b5c]">WhatsApp</span> · +91-XXXXXXXXXX</p></div></div></div></section>
  </main>;
}

function Products() {
  usePageMeta('Products | RK Industries Material Catalogue', 'Browse industrial chemicals and specialty raw materials supplied by RK Industries from Lal Kuan, Ghaziabad.');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All materials');
  const filtered = useMemo(() => products.filter((p) => (category === 'All materials' || p.category === category) && p.name.toLowerCase().includes(query.toLowerCase())), [category, query]);
  return <main>
    <PageIntro eyebrow="Material catalogue" title={<>The range, <span className="text-[#e66c24]">in focus.</span></>} copy="Search the catalogue by material or use a category to narrow the field. Every product is a starting point for a direct conversation." />
    <section className="mx-auto max-w-[1240px] px-5 py-12 md:px-6 md:py-16">
      <div className="flex flex-col gap-4 rounded-3xl border border-[#d7e5eb] bg-[rgba(255,255,255,.7)] p-4 md:flex-row md:items-center md:justify-between md:p-5">
        <label className="relative flex w-full items-center md:max-w-md"><Search size={18} className="absolute left-4 text-[#0879ac]" /><input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search materials..." className="h-12 w-full rounded-2xl border border-[#d4e3e9] bg-[#f6fafb] pl-11 pr-4 text-sm outline-none transition focus:border-[#0879ac] focus:ring-4 focus:ring-[#0879ac]/10" data-testid="input-product-search" /></label>
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500"><SlidersHorizontal size={16} className="text-[#e66c24]" /><span>{filtered.length} materials</span></div>
      </div>
      <div className="mt-5 flex gap-2 overflow-x-auto pb-2">{categories.map((item) => <button type="button" key={item} onClick={() => setCategory(item)} className={`whitespace-nowrap rounded-full px-4 py-2.5 text-xs font-bold transition ${category === item ? 'bg-[#07517c] text-white' : 'border border-[#d4e3e9] bg-[rgba(255,255,255,.55)] text-slate-600 hover:border-[#0879ac]'}`} data-testid={`button-filter-${item.toLowerCase().replace(/\s/g, '-')}`}>{item}</button>)}</div>
      {filtered.length ? <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{filtered.map((product, index) => <ProductCard key={product.name} product={product} index={index} />)}</div> : <div className="mt-10 rounded-3xl border border-dashed border-[#b9d0da] bg-[#edf5f7] px-6 py-16 text-center"><Package className="mx-auto text-[#0879ac]" size={28} /><h2 className="mt-4 font-display text-2xl font-bold text-[#073b5c]">No material matches that search.</h2><p className="mt-2 text-sm text-slate-500">Try a broader term or reset the category.</p><button type="button" onClick={() => { setQuery(''); setCategory('All materials'); }} className="mt-6 rounded-full bg-[#07517c] px-5 py-3 text-sm font-bold text-white" data-testid="button-reset-products">Reset catalogue</button></div>}
    </section>
  </main>;
}

function Clients() {
  usePageMeta('Trade Partners | RK Industries', 'RK Industries supports buyers across industrial and formulation-led material requirements with a direct, product-led approach.');
  return <main>
    <PageIntro eyebrow="Trade partners" title={<>Built for the work <span className="text-[#e66c24]">behind the product.</span></>} copy="Our role sits upstream of the finished goods you know: helping businesses source the chemicals and specialty raw materials their processes depend on." />
    <section className="mx-auto max-w-[1240px] px-5 py-20 md:px-6 md:py-28"><div className="grid gap-4 md:grid-cols-12 md:grid-rows-2">
      <div className="rounded-3xl bg-[#07517c] p-8 text-white md:col-span-7 md:row-span-2 md:p-12"><Globe2 className="text-[#f47b2a]" size={28} /><h2 className="mt-16 max-w-lg font-display text-4xl font-bold leading-[.98] tracking-[-.06em] md:text-5xl">A trade partner should make buying feel more considered.</h2><p className="mt-6 max-w-md text-sm leading-7 text-sky-100/70">Whether you are looking for an established industrial chemical or a more specific specialty raw material, start with the product and the requirement. We will take it from there.</p><Link href="/contact" className="mt-9 inline-flex items-center gap-2 rounded-full bg-[#f47b2a] px-5 py-3 text-sm font-bold text-white" data-testid="link-clients-contact">Discuss a requirement <ArrowUpRight size={15} /></Link></div>
      <div className="rounded-3xl bg-[#e8f2f5] p-8 md:col-span-5"><Building2 className="text-[#0879ac]" size={26} /><h3 className="mt-10 font-display text-2xl font-bold text-[#073b5c]">Industrial buyers</h3><p className="mt-3 text-sm leading-7 text-slate-600">For teams balancing quality, continuity and practical material decisions.</p></div>
      <div className="rounded-3xl bg-[#fff0e6] p-8 md:col-span-5"><FlaskConical className="text-[#e66c24]" size={26} /><h3 className="mt-10 font-display text-2xl font-bold text-[#073b5c]">Formulation-led businesses</h3><p className="mt-3 text-sm leading-7 text-slate-600">For buyers who need the right ingredient or compound to keep a product moving.</p></div>
    </div></section>
    <section className="border-y border-[#d8e6ec] bg-[#f9fbfc] px-5 py-20 md:px-6"><div className="mx-auto max-w-[1240px]"><Eyebrow>Working together</Eyebrow><div className="mt-10 grid gap-8 md:grid-cols-3">{[['01', 'Share the brief', 'Tell us the material, form or application you are working with.'], ['02', 'Review the range', 'Explore a focused catalogue built around industrial and specialty requirements.'], ['03', 'Move with clarity', 'Use a direct enquiry to get the conversation started.']].map(([num, title, text]) => <div key={num} className="flex gap-5 border-t border-[#cedfe7] pt-5"><span className="font-mono-ui text-xs text-[#e66c24]">{num}</span><div><h3 className="font-display text-xl font-bold text-[#073b5c]">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-500">{text}</p></div></div>)}</div></div></section>
  </main>;
}

function Contact() {
  usePageMeta('Contact RK Industries | Enquire About Materials', 'Contact RK Industries in Lal Kuan, Ghaziabad for industrial chemical and specialty raw material enquiries.');
  const [location] = useLocation();
  const params = new URLSearchParams(location.split('?')[1] || '');
  const initialProduct = params.get('product') || '';
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', product: initialProduct, message: '' });
  const update = (key: keyof typeof form, value: string) => setForm((current) => ({ ...current, [key]: value }));
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => { e.preventDefault(); setSubmitted(true); };
  return <main>
        <PageIntro eyebrow="Contact & enquiry" title={<>Let’s talk <span className="text-[#e66c24]">materials.</span></>} copy="Have a product requirement, a question about the range, or a material to source? Send the details below and start a direct conversation with RK Industries." />
    <section className="mx-auto grid max-w-[1240px] gap-12 px-5 py-16 md:grid-cols-[.72fr_1.28fr] md:px-6 md:py-24">
      <div>
        <Eyebrow>Direct lines</Eyebrow>
        <h2 className="mt-5 font-display text-4xl font-bold tracking-[-.06em] text-[#073b5c]">Reach the team in Ghaziabad .</h2>
        <div className="mt-10 space-y-5">
          <a href="tel:+91-XXXXXXXXXX" className="flex gap-4 rounded-2xl border border-[#d5e4ea] bg-[rgba(255,255,255,.65)] p-4 transition hover:border-[#0879ac]" data-testid="link-contact-phone"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#e6f2f6] text-[#0879ac]"><Phone size={18} /></span><span><span className="block text-xs font-bold uppercase tracking-[.13em] text-slate-400">Phone</span><span className="mt-1 block text-sm font-bold text-[#073b5c]">+91-XXXXXXXXXX</span></span></a>
          <a href="https://wa.me/91XXXXXXXXXX" target="_blank" rel="noreferrer" className="flex gap-4 rounded-2xl border border-[#d5e4ea] bg-[rgba(255,255,255,.65)] p-4 transition hover:border-[#0879ac]" data-testid="link-contact-whatsapp"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#fff0e6] text-[#e66c24]"><MessageCircle size={18} /></span><span><span className="block text-xs font-bold uppercase tracking-[.13em] text-slate-400">WhatsApp</span><span className="mt-1 block text-sm font-bold text-[#073b5c]">+91-XXXXXXXXXX</span></span></a>
          <div className="flex gap-4 rounded-2xl border border-[#d5e4ea] bg-[rgba(255,255,255,.65)] p-4"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#e6f2f6] text-[#0879ac]"><MapPin size={18} /></span><span><span className="block text-xs font-bold uppercase tracking-[.13em] text-slate-400">Address</span><span className="mt-1 block text-sm font-bold leading-6 text-[#073b5c]">15/1, S.S.G.T. Road,<br />Industrial Area, Ghaziabad (UP) 201001
</span></span></div>
        </div>
      </div>
      <div className="rounded-[2rem] border border-[#d5e4ea] bg-[rgba(255,255,255,.76)] p-6 shadow-[0_15px_40px_rgba(12,59,87,.06)] md:p-9">
        {submitted ? <div className="flex min-h-[430px] flex-col items-center justify-center text-center"><span className="grid h-16 w-16 place-items-center rounded-full bg-[#e4f3e9] text-[#24824b]"><Check size={30} /></span><h2 className="mt-6 font-display text-3xl font-bold text-[#073b5c]">Enquiry noted.</h2><p className="mt-3 max-w-sm text-sm leading-7 text-slate-500">Thank you for sharing the details. The RK Industries team will review your requirement and continue the conversation directly.</p><button type="button" onClick={() => { setSubmitted(false); setForm({ name: '', company: '', email: '', phone: '', product: '', message: '' }); }} className="mt-8 rounded-full border border-[#cbdde5] px-5 py-3 text-sm font-bold text-[#07517c]" data-testid="button-new-enquiry">Send another enquiry</button></div> : <form onSubmit={onSubmit} className="space-y-5"><div className="flex items-center justify-between"><div><p className="font-mono-ui text-[10px] uppercase tracking-[.18em] text-[#0879ac]">Material enquiry</p><h2 className="mt-2 font-display text-2xl font-bold text-[#073b5c]">Tell us what you’re working on.</h2></div><FileText className="text-[#f47b2a]" size={25} /></div><div className="grid gap-5 sm:grid-cols-2"><Field label="Your name" value={form.name} onChange={(v) => update('name', v)} required testId="input-name" /><Field label="Company" value={form.company} onChange={(v) => update('company', v)} testId="input-company" /><Field label="Email" type="email" value={form.email} onChange={(v) => update('email', v)} required testId="input-email" /><Field label="Phone" value={form.phone} onChange={(v) => update('phone', v)} testId="input-phone" /></div><Field label="Material of interest" value={form.product} onChange={(v) => update('product', v)} placeholder="e.g. Sodium Meta Silicate" testId="input-product" /><label className="block"><span className="mb-2 block text-xs font-bold text-[#35566a]">Requirement details</span><textarea value={form.message} onChange={(e) => update('message', e.target.value)} required rows={4} placeholder="Share the product, form or application you have in mind..." className="w-full resize-none rounded-2xl border border-[#d3e2e8] bg-[#f7fafb] px-4 py-3 text-sm outline-none transition focus:border-[#0879ac] focus:ring-4 focus:ring-[#0879ac]/10" data-testid="input-message" /></label><button type="submit" className="shine flex w-full items-center justify-center gap-3 rounded-2xl bg-[#07517c] py-4 text-sm font-bold text-white transition hover:bg-[#064365]" data-testid="button-submit-enquiry">Send enquiry <Send size={16} /></button><p className="text-center text-[11px] text-slate-400">Your details are used to respond to this enquiry.</p></form>}
      </div>
    </section>
  </main>;
}

function Field({ label, value, onChange, type = 'text', placeholder, required = false, testId }: { label: string; value: string; onChange: (value: string) => void; type?: string; placeholder?: string; required?: boolean; testId: string }) {
  return <label className="block"><span className="mb-2 block text-xs font-bold text-[#35566a]">{label}</span><input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} required={required} className="h-12 w-full rounded-2xl border border-[#d3e2e8] bg-[#f7fafb] px-4 text-sm outline-none transition focus:border-[#0879ac] focus:ring-4 focus:ring-[#0879ac]/10" data-testid={testId} /></label>;
}

function NotFound() {
  usePageMeta('Page not found | RK Industries', 'The requested RK Industries page could not be found.');
  return <main className="site-grid flex min-h-[60vh] items-center justify-center px-5 py-20 text-center"><div><Eyebrow>404 · off catalogue</Eyebrow><h1 className="mt-5 font-display text-6xl font-bold tracking-[-.08em] text-[#073b5c]">That page isn’t here.</h1><p className="mx-auto mt-5 max-w-md text-slate-500">Try the catalogue or return to the RK Industries home page.</p><Link href="/" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#07517c] px-5 py-3 text-sm font-bold text-white" data-testid="link-not-found-home">Back to home <ArrowRight size={15} /></Link></div></main>;
}

function Router() {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}><Shell><Switch><Route path="/" component={Home} /><Route path="/about" component={About} /><Route path="/products" component={Products} /><Route path="/clients" component={Clients} /><Route path="/contact" component={Contact} /><Route component={NotFound} /></Switch></Shell></ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;
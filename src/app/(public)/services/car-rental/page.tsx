import JsonLd from "@/components/seo/JsonLd";
import Link from "next/link";
import Image from "next/image";
import {
  Car,
  ArrowRight,
  ShieldCheck,
  Clock,
  MapPin,
  Users,
  Gauge,
  Sparkles,
  BadgeCheck,
  Phone,
  Check,
} from "lucide-react";

export const metadata = {
  title: "Lüks Araç Kiralama | Ege Motors",
  description: "İzmir'de lüks araç kiralama hizmeti. Günlük, haftalık veya aylık VIP araç kiralama seçenekleriyle konforu ve prestiji Ege Motors'ta yaşayın.",
  keywords: ["kiralıkaracım.com", "lüks araç kiralama", "izmir rent a car", "Ege Motors", "VIP araç kiralama", "spor araba kiralama"],
};

const FEATURES = [
  { icon: Sparkles, title: "Sıfır & Yeni Araçlar", desc: "Tüm filomuz düzenli bakımlı, en yeni modellerden oluşur." },
  { icon: Users, title: "Şoförlü Kiralama", desc: "VIP transfer ve özel günleriniz için profesyonel şoför desteği." },
  { icon: ShieldCheck, title: "Tam Kasko Güvence", desc: "Her kiralama tam kasko ile gönül rahatlığı sağlar." },
  { icon: Clock, title: "7/24 Yol Yardım", desc: "Kiralama boyunca kesintisiz yol yardım ve özel asistanlık." },
  { icon: MapPin, title: "Adrese Teslim", desc: "İzmir içinde aracınızı istediğiniz adrese getiriyoruz." },
  { icon: Gauge, title: "Esnek Kilometre", desc: "İhtiyacınıza göre genişletilebilir kilometre paketleri." },
];

const PLANS = [
  { name: "Günlük", tagline: "Kısa süreli ihtiyaçlar", perks: ["Esnek alış/teslim", "Tam kasko dahil", "Şehir içi teslim"], featured: false },
  { name: "Haftalık", tagline: "En çok tercih edilen", perks: ["%15'e varan indirim", "Ücretsiz adrese teslim", "Öncelikli destek", "Ek sürücü hakkı"], featured: true },
  { name: "Aylık", tagline: "Uzun dönem konfor", perks: ["Kurumsal fatura", "Bakım bizden", "Yedek araç güvencesi"], featured: false },
];

const STEPS = [
  { step: "01", title: "Aracını Seç", desc: "Filomuzdan sana uygun lüks aracı belirle." },
  { step: "02", title: "Rezerve Et", desc: "Online form veya WhatsApp ile yerini ayır." },
  { step: "03", title: "Teslim Al", desc: "Aracını adresinden teslim al ve yola çık." },
];

export default function CarRentalPage() {
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "AutoRental",
    "name": "Ege Motors Lüks Araç Kiralama",
    "description": "Geniş lüks araç filosu ile VIP araç kiralama hizmeti.",
    "url": "https://egemotors.net/services/car-rental",
    "telephone": "+90-545-337-0837",
  };

  return (
    <>
      <JsonLd data={jsonLdData} />

      {/* HERO */}
      <section className="relative overflow-hidden grain-surface border-b border-border">
        <div className="absolute -top-32 -right-32 w-[34rem] h-[34rem] rounded-full bg-primary/10 blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 lg:pt-40 lg:pb-24">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <span className="eyebrow mb-6">
                <span className="w-8 h-px bg-primary-hover" /> Araç Kiralama
              </span>
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.98] tracking-tight text-foreground">
                Lüks <span className="italic text-primary">araç</span>
                <br />kiralama
              </h1>
              <p className="mt-7 text-lg text-muted-foreground max-w-md leading-relaxed">
                kiralıkaracım.com güvencesiyle en seçkin markaların en prestijli
                modelleri; günlük, haftalık ve aylık seçeneklerle hizmetinizde.
              </p>
              <div className="mt-9 flex flex-col sm:flex-row gap-3">
                <Link href="/vehicles?type=Car" className="group inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-7 py-4 rounded-full font-semibold hover:bg-primary-hover transition-all shadow-lg shadow-primary/20">
                  Tüm Araçları Gör
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a href="https://wa.me/905453370837" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-border bg-card px-7 py-4 rounded-full font-semibold text-foreground hover:border-primary/50 transition-all">
                  <Phone className="w-4 h-4 text-primary" /> Hemen Teklif Al
                </a>
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="relative h-[320px] sm:h-[420px] rounded-[2rem] overflow-hidden border border-border shadow-2xl shadow-black/10 bg-card">
                <Image src="/hero-art.svg" alt="Lüks araç illüstrasyonu" fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover object-center" />
              </div>
              <div className="absolute -bottom-6 left-6 bg-card/90 backdrop-blur-md border border-border rounded-2xl px-5 py-4 shadow-xl shadow-black/10 flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-primary/15 text-primary flex items-center justify-center">
                  <Car className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-display text-xl text-foreground leading-none">120+ Araç</div>
                  <div className="text-xs text-muted-foreground mt-1">Premium filo</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="eyebrow mb-4 justify-center">Ayrıcalıklarımız</span>
            <h2 className="font-display text-4xl sm:text-5xl text-foreground">Neden Ege Motors?</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f) => (
              <div key={f.title} className="group rounded-3xl border border-border bg-card p-7 hover:border-primary/50 transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <f.icon className="w-6 h-6" />
                </div>
                <h3 className="font-display text-xl text-foreground mb-2">{f.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLANS */}
      <section className="py-24 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="eyebrow mb-4 justify-center">Kiralama seçenekleri</span>
            <h2 className="font-display text-4xl sm:text-5xl text-foreground">Size uygun paketi seçin</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {PLANS.map((p) => (
              <div
                key={p.name}
                className={`relative rounded-3xl p-8 flex flex-col ${
                  p.featured
                    ? "bg-foreground text-background border-2 border-primary shadow-2xl shadow-black/10 md:-translate-y-3"
                    : "bg-background border border-border"
                }`}
              >
                {p.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider">
                    Popüler
                  </span>
                )}
                <h3 className={`font-display text-3xl mb-1 ${p.featured ? "text-primary" : "text-foreground"}`}>{p.name}</h3>
                <p className={`text-sm mb-6 ${p.featured ? "text-background/60" : "text-muted-foreground"}`}>{p.tagline}</p>
                <ul className="space-y-3 flex-1">
                  {p.perks.map((perk) => (
                    <li key={perk} className={`flex items-start gap-3 text-sm ${p.featured ? "text-background/90" : "text-foreground"}`}>
                      <Check className={`w-4 h-4 mt-0.5 shrink-0 ${p.featured ? "text-primary" : "text-primary"}`} />
                      {perk}
                    </li>
                  ))}
                </ul>
                <a
                  href="https://wa.me/905453370837"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-8 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold transition-all ${
                    p.featured
                      ? "bg-primary text-primary-foreground hover:bg-primary-hover"
                      : "border border-border text-foreground hover:border-primary/50"
                  }`}
                >
                  Teklif Al <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="eyebrow mb-4 justify-center">Nasıl çalışır</span>
            <h2 className="font-display text-4xl sm:text-5xl text-foreground">Üç adımda direksiyonda</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {STEPS.map((s) => (
              <div key={s.step}>
                <div className="font-display text-6xl text-primary/20 mb-4">{s.step}</div>
                <h3 className="font-display text-2xl text-foreground mb-3">{s.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-[2.5rem] overflow-hidden bg-foreground text-background px-8 py-16 sm:px-16 sm:py-20 text-center">
            <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-primary/10 blur-3xl" />
            <div className="relative">
              <BadgeCheck className="w-12 h-12 text-primary mx-auto mb-5" />
              <h2 className="font-display text-4xl sm:text-5xl mb-5 leading-tight">
                Hayalindeki araç <span className="italic text-primary">seni bekliyor</span>
              </h2>
              <p className="text-background/70 max-w-xl mx-auto mb-9 text-lg">
                Geniş lüks filomuzu incele, dakikalar içinde rezervasyonunu tamamla.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/vehicles?type=Car" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold hover:bg-primary-hover transition-all">
                  Filoyu İncele <ArrowRight className="w-4 h-4" />
                </Link>
                <a href="https://wa.me/905453370837" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-white/20 px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-all">
                  <Phone className="w-4 h-4" /> WhatsApp'tan Yaz
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

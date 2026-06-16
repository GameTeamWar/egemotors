"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Star,
  Car,
  Phone,
  Wrench,
  Scale,
  Truck,
  ShoppingBag,
  ShieldCheck,
  Clock,
  MapPin,
  Quote,
} from "lucide-react";
import { getVehicleCoverImage } from "@/utils/vehicleImage";

const BRANDS = ["Mercedes-Benz", "BMW", "Audi", "Porsche", "Ducati", "Yamaha", "Range Rover", "Honda"];

const STATS = [
  { value: "10+", label: "Yıllık Tecrübe" },
  { value: "3.000+", label: "Mutlu Müşteri" },
  { value: "120+", label: "Premium Araç" },
  { value: "7/24", label: "Kesintisiz Destek" },
];

const PROCESS = [
  { step: "01", title: "Aracını Seç", desc: "Lüks filomuzdan sana uygun araç veya motoru saniyeler içinde bul." },
  { step: "02", title: "Rezerve Et", desc: "Online formu doldur ya da WhatsApp'tan tek mesajla yerini ayır." },
  { step: "03", title: "Direksiyona Geç", desc: "Aracını adresinden teslim al, gerisini bize bırak ve yola çık." },
];

const TESTIMONIALS = [
  { name: "Mert A.", role: "Kurumsal Müşteri", text: "İzmir'de düğün için kiraladığım araç tertemiz ve dakikti. Teslim süreci kusursuzdu." },
  { name: "Elif K.", role: "Bireysel Kiralama", text: "Motoru kapımıza getirdiler, fiyatlar şeffaftı. Premium hizmet tam anlamıyla buydu." },
  { name: "Caner D.", role: "Uzun Dönem Kiralama", text: "Aylık kiraladığım araçta yol yardım güvencesi içimi rahatlattı. Tavsiye ederim." },
];

export default function HomeContent({ availableVehicles }: { availableVehicles: any[] }) {
  return (
    <div className="flex flex-col">
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden grain-surface border-b border-border">
        <div className="absolute -top-32 -right-32 w-[34rem] h-[34rem] rounded-full bg-primary/10 blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 lg:pt-40 lg:pb-28">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left: editorial copy */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-6"
            >
              <span className="eyebrow mb-6">
                <span className="w-8 h-px bg-primary-hover" /> Ege'nin premium mobilite markası
              </span>
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.98] tracking-tight text-foreground">
                Yolculuğun
                <br />
                <span className="italic text-primary">lüks</span> hâli.
              </h1>
              <p className="mt-7 text-lg text-muted-foreground max-w-md leading-relaxed">
                Araç ve motosiklet kiralamadan yol yardıma, bakımdan hukuki desteğe —
                hayalinizdeki sürüşü <span className="text-foreground font-medium">360°</span> güvenceyle yaşayın.
              </p>

              <div className="mt-9 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/vehicles"
                  className="group inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-7 py-4 rounded-full font-semibold hover:bg-primary-hover transition-all shadow-lg shadow-primary/20"
                >
                  Filomuzu Keşfet
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/services/roadside-assistance"
                  className="inline-flex items-center justify-center gap-2 border border-border bg-card px-7 py-4 rounded-full font-semibold text-foreground hover:border-primary/50 transition-all"
                >
                  <Phone className="w-4 h-4 text-primary" /> 7/24 Yol Yardım
                </Link>
              </div>

              {/* inline trust stats */}
              <div className="mt-12 flex items-center gap-8">
                {STATS.slice(0, 3).map((s) => (
                  <div key={s.label}>
                    <div className="font-display text-3xl text-foreground">{s.value}</div>
                    <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: overlapping image + floating chip */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="lg:col-span-6 relative"
            >
              <div className="relative h-[360px] sm:h-[460px] rounded-[2rem] overflow-hidden border border-border shadow-2xl shadow-black/10 bg-card">
                <Image
                  src="/hero-art.svg"
                  alt="Ege Motors premium filo illüstrasyonu"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />
              </div>

              {/* floating rating chip */}
              <div className="absolute -bottom-6 -left-2 sm:left-6 bg-card/90 backdrop-blur-md border border-border rounded-2xl px-5 py-4 shadow-xl shadow-black/10 flex items-center gap-4">
                <div className="flex -space-x-1">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="w-9 h-9 rounded-full bg-primary/15 border border-card flex items-center justify-center">
                      <Star className="w-4 h-4 text-primary fill-primary" />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="font-display text-xl text-foreground leading-none">4.9 / 5.0</div>
                  <div className="text-xs text-muted-foreground mt-1">3.000+ değerlendirme</div>
                </div>
              </div>

              {/* floating availability chip */}
              <div className="absolute -top-4 right-4 bg-foreground text-background rounded-full px-4 py-2 text-sm font-medium flex items-center gap-2 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                {availableVehicles.length > 0 ? `${availableVehicles.length} araç müsait` : "Hemen rezervasyon"}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============ BRAND MARQUEE ============ */}
      <section className="bg-card border-b border-border py-7 overflow-hidden">
        <div className="flex items-center gap-16 w-max animate-marquee">
          {[...BRANDS, ...BRANDS].map((b, i) => (
            <span key={i} className="font-display text-2xl text-muted-foreground/50 whitespace-nowrap">
              {b}
            </span>
          ))}
        </div>
      </section>

      {/* ============ SERVICES BENTO ============ */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <span className="eyebrow mb-4 tracking-[0.25em] text-primary">NE SUNUYORUZ</span>
              <h2 className="font-display text-4xl sm:text-5xl text-foreground max-w-xl leading-tight">
                Tek çatı altında <span className="text-primary">360°</span><br />
                hizmet
              </h2>
            </div>
            <p className="text-muted-foreground max-w-sm text-[15px] leading-relaxed">
              Kiralamadan satışa, yol yardımdan hukuki desteğe ihtiyacınız olan her şey burada.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[220px]">
            {/* Featured large tile */}
            <Link href="/services/car-rental" className="md:col-span-2 md:row-span-2 group relative rounded-[2rem] overflow-hidden border border-border bg-card p-10 flex flex-col justify-between hover:border-primary/30 transition-all hover:shadow-xl hover:shadow-primary/5">
              <div className="absolute inset-0 z-0">
                <Image
                  src="/images/services/service_car_rental.png"
                  alt="Lüks Araç Kiralama"
                  fill
                  sizes="(max-width: 768px) 100vw, 66vw"
                  className="object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700 mix-blend-multiply"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent z-0 pointer-events-none" />
              <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-primary/10 blur-3xl z-0 pointer-events-none" />
              <div className="relative z-10 flex items-center justify-between">
                <div className="w-16 h-16 rounded-2xl bg-[#FDF9F1]/80 backdrop-blur-md text-primary flex items-center justify-center group-hover:scale-105 transition-transform duration-500 shadow-sm">
                  <Car strokeWidth={1.5} className="w-8 h-8" />
                </div>
                <div className="w-10 h-10 rounded-full bg-background/50 backdrop-blur-md flex items-center justify-center shadow-sm">
                  <ArrowUpRight strokeWidth={1.5} className="w-6 h-6 text-foreground/60 group-hover:text-primary group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </div>
              <div className="relative z-10 mt-8">
                <h3 className="font-display text-3xl text-foreground mb-3 drop-shadow-sm">Lüks Araç Kiralama</h3>
                <p className="text-muted-foreground font-medium max-w-md text-[15px] leading-relaxed drop-shadow-sm">
                  Günlük ve aylık kiralamada premium filo. Sıfır kilometre konfor, tam kasko güvence ve şeffaf fiyat.
                </p>
              </div>
            </Link>

            <BentoTile icon={<Star strokeWidth={1.5} className="w-6 h-6" />} title="Motor Kiralama" link="/services/motorcycle-rental" image="/images/services/service_motorcycle.png" />
            <BentoTile icon={<Truck strokeWidth={1.5} className="w-6 h-6" />} title="7/24 Çekici & Yol Yardım" link="/services/roadside-assistance" accent image="/images/services/service_tow_truck.png" />
            <BentoTile icon={<Scale strokeWidth={1.5} className="w-6 h-6" />} title="Avukat Hizmeti" link="/services/legal-support" image="/images/services/service_legal.png" />
            <BentoTile icon={<Wrench strokeWidth={1.5} className="w-6 h-6" />} title="Bakım & Tamir" link="/services/maintenance" image="/images/services/service_maintenance.png" />
            <BentoTile icon={<ShoppingBag strokeWidth={1.5} className="w-6 h-6" />} title="Mağaza & Yedek Parça" link="/store" image="/images/services/service_store.png" />
          </div>
        </div>
      </section>

      {/* ============ FEATURED FLEET ============ */}
      <section className="py-24 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-14">
            <div>
              <span className="eyebrow mb-4">Öne çıkanlar</span>
              <h2 className="font-display text-4xl sm:text-5xl text-foreground">Hemen Kirala</h2>
            </div>
            <Link href="/vehicles" className="hidden md:inline-flex items-center gap-2 text-foreground font-medium border-b border-primary pb-1 hover:gap-3 transition-all">
              Tüm Filo <ArrowRight className="w-4 h-4 text-primary" />
            </Link>
          </div>

          {availableVehicles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {availableVehicles.map((vehicle, idx) => (
                <motion.div
                  key={vehicle.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Link href={`/vehicles/${vehicle.id}`} className="group block rounded-3xl overflow-hidden bg-background border border-border hover:border-primary/40 transition-colors">
                    <div className="relative h-60 w-full bg-muted overflow-hidden">
                      <Image
                        src={getVehicleCoverImage(vehicle)}
                        alt={`${vehicle.brand} ${vehicle.model}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm text-xs font-semibold px-3 py-1.5 rounded-full border border-border flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Müsait
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-baseline justify-between mb-1">
                        <h3 className="font-display text-2xl text-foreground">{vehicle.brand}</h3>
                        <span className="text-sm text-muted-foreground">{vehicle.year}</span>
                      </div>
                      <p className="text-muted-foreground text-sm mb-5">{vehicle.model} • {vehicle.fuelType || "Belirtilmemiş"}</p>
                      <div className="flex items-center justify-between pt-5 border-t border-border">
                        <div>
                          {vehicle.dailyRate ? (
                            <>
                              <span className="font-display text-2xl text-foreground">₺{vehicle.dailyRate}</span>
                              <span className="text-muted-foreground text-sm"> / gün</span>
                            </>
                          ) : (
                            <span className="text-lg font-semibold text-foreground">Fiyat Alınız</span>
                          )}
                        </div>
                        <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                          İncele <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-muted-foreground border border-dashed border-border rounded-3xl">
              Şu anda müsait araç bulunmuyor. Yeni araçlar için bizi takipte kalın.
            </div>
          )}

          <div className="mt-10 text-center md:hidden">
            <Link href="/vehicles" className="inline-flex items-center gap-2 text-primary font-medium">
              Tüm Filo <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============ PROCESS ============ */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="eyebrow mb-4 justify-center">Nasıl çalışır</span>
            <h2 className="font-display text-4xl sm:text-5xl text-foreground">Üç adımda direksiyonda</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 relative">
            {PROCESS.map((p) => (
              <div key={p.step} className="relative">
                <div className="font-display text-6xl text-primary/20 mb-4">{p.step}</div>
                <h3 className="font-display text-2xl text-foreground mb-3">{p.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ STATS BAND (dark accent) ============ */}
      <section className="py-20 bg-foreground text-background relative overflow-hidden">
        <div className="absolute -top-24 left-1/4 w-96 h-96 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((s, i) => (
              <div key={s.label} className={`text-center ${i < STATS.length - 1 ? "md:border-r md:border-white/10" : ""}`}>
                <div className="font-display text-5xl text-primary mb-2">{s.value}</div>
                <div className="text-sm text-background/60 uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="mt-14 flex flex-wrap justify-center gap-x-10 gap-y-4 text-sm text-background/70">
            <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-primary" /> Tam Kasko Güvence</span>
            <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary" /> Dakik Teslim</span>
            <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> Adrese Teslim</span>
            <span className="flex items-center gap-2"><Phone className="w-4 h-4 text-primary" /> 7/24 Destek Hattı</span>
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="py-24 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="eyebrow mb-4 justify-center">Müşterilerimiz ne diyor</span>
            <h2 className="font-display text-4xl sm:text-5xl text-foreground">Güvenin adı Ege Motors</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="rounded-3xl border border-border bg-background p-8 flex flex-col">
                <Quote className="w-8 h-8 text-primary/30 mb-5" />
                <p className="text-foreground leading-relaxed flex-1">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-1 mt-6 mb-4">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="w-4 h-4 text-primary fill-primary" />
                  ))}
                </div>
                <div className="pt-4 border-t border-border">
                  <div className="font-medium text-foreground">{t.name}</div>
                  <div className="text-sm text-muted-foreground">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-[2.5rem] overflow-hidden bg-foreground text-background px-8 py-16 sm:px-16 sm:py-20 text-center">
            <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-primary/10 blur-3xl" />
            <div className="relative">
              <h2 className="font-display text-4xl sm:text-6xl mb-5 leading-tight">
                Hayalindeki aracı <span className="italic text-primary">bugün</span> kirala
              </h2>
              <p className="text-background/70 max-w-xl mx-auto mb-9 text-lg">
                Saniyeler içinde rezervasyon yap, aracını adresinden teslim al. Premium deneyim bir tık uzakta.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/vehicles" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold hover:bg-primary-hover transition-all">
                  Filoyu İncele <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="https://wa.me/905453370837"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-white/20 px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-all"
                >
                  <Phone className="w-4 h-4" /> WhatsApp'tan Yaz
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function BentoTile({ icon, title, link, accent, image }: { icon: React.ReactNode; title: string; link: string; accent?: boolean; image?: string }) {
  return (
    <Link
      href={link}
      className={`group relative rounded-[2rem] overflow-hidden border p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
        accent
          ? "bg-[#FBE9E9]/50 border-red-600/10 hover:border-red-600/20 shadow-red-600/5"
          : "bg-card border-border hover:border-primary/20 shadow-primary/5"
      }`}
    >
      {image && (
        <>
          <div className="absolute inset-0 z-0">
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500 mix-blend-multiply"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent z-0 pointer-events-none" />
        </>
      )}
      <div className="relative z-10 flex items-center justify-between">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-105 backdrop-blur-md shadow-sm ${
          accent ? "bg-red-600/10 text-red-600" : "bg-[#FDF9F1]/80 text-primary"
        }`}>
          {icon}
        </div>
        <div className="w-8 h-8 rounded-full bg-background/50 backdrop-blur-md flex items-center justify-center shadow-sm">
          <ArrowUpRight strokeWidth={1.5} className={`w-5 h-5 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 ${accent ? "text-red-600/80 group-hover:text-red-600" : "text-muted-foreground/80 group-hover:text-primary"}`} />
        </div>
      </div>
      <h3 className="relative z-10 font-display text-xl text-foreground mt-8 drop-shadow-sm">{title}</h3>
    </Link>
  );
}

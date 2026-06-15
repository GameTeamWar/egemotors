import JsonLd from "@/components/seo/JsonLd";
import Link from "next/link";
import { Car, CheckCircle, ArrowRight } from "lucide-react";
import Image from "next/image";

export const metadata = {
  title: "Lüks Araç Kiralama | Ege Motors",
  description: "İzmir'de lüks araç kiralama hizmeti. Günlük, haftalık veya aylık VIP araç kiralama seçenekleriyle konforu ve prestiji Ege Motors'ta yaşayın.",
  keywords: ["kiralıkaracım.com", "lüks araç kiralama", "izmir rent a car", "Ege Motors", "VIP araç kiralama", "spor araba kiralama"],
};

export default function CarRentalPage() {
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "AutoRental",
    "name": "Ege Motors Lüks Araç Kiralama",
    "description": "Geniş lüks araç filosu ile VIP araç kiralama hizmeti.",
    "url": "https://egemotors.net/services/car-rental",
    "telephone": "+90-545-337-0837"
  };

  return (
    <>
      <JsonLd data={jsonLdData} />
      
      <section className="bg-muted py-20 border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image src="/hero-bg-v2.png" alt="Lüks Araç" fill className="object-cover" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <Car className="w-16 h-16 text-primary mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Lüks <span className="text-gradient">Araç Kiralama</span></h1>
            <p className="text-xl text-muted-foreground">
              kiralıkaracım.com güvencesiyle en seçkin markaların en prestijli modelleri hizmetinizde.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-10">Neden Ege Motors'tan Araç Kiralamalısınız?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-card p-8 rounded-2xl border border-border">
              <CheckCircle className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Sıfır ve Yeni Araçlar</h3>
              <p className="text-muted-foreground">Tüm filomuz düzenli bakımlı ve en yeni modellerden oluşmaktadır.</p>
            </div>
            <div className="bg-card p-8 rounded-2xl border border-border">
              <CheckCircle className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Şoförlü Kiralama</h3>
              <p className="text-muted-foreground">VIP transfer ve özel günleriniz için profesyonel şoför desteği sunuyoruz.</p>
            </div>
            <div className="bg-card p-8 rounded-2xl border border-border">
              <CheckCircle className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Sınırsız Destek</h3>
              <p className="text-muted-foreground">Kiralama süresi boyunca 7/24 yol yardım ve özel asistanlık hizmeti.</p>
            </div>
          </div>

          <Link 
            href="/vehicles?type=Car" 
            className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-10 py-4 rounded-full font-bold text-lg hover:bg-primary-hover transition-all"
          >
            Tüm Araçları Gör <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>
    </>
  );
}

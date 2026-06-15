import JsonLd from "@/components/seo/JsonLd";
import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";
import Image from "next/image";

// Using Lucide react icon substitute or generic if Motorcycle is not available. Lucide v0.1.x has Bike.
import { Bike } from "lucide-react";

export const metadata = {
  title: "Premium Motosiklet Kiralama | Ege Motors",
  description: "İzmir'de kiralıkmotorsikletim güvencesiyle yüksek cc, spor ve touring motosiklet kiralama hizmeti. Rüzgarı Ege Motors kalitesiyle hissedin.",
  keywords: ["kiralıkmotorsikletim", "motor kiralama izmir", "motosiklet kiralama", "Ege Motors", "yüksek cc motor kiralama", "touring motor", "yamaha kiralama", "honda kiralama"],
};

export default function MotorcycleRentalPage() {
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "AutoRental",
    "name": "Ege Motors Motosiklet Kiralama",
    "description": "Premium ve yüksek CC motosiklet kiralama hizmeti.",
    "url": "https://egemotors.net/services/motorcycle-rental",
    "telephone": "+90-545-337-0837"
  };

  return (
    <>
      <JsonLd data={jsonLdData} />
      
      <section className="bg-muted py-20 border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image src="/hero-bg-v2.png" alt="Motosiklet" fill className="object-cover" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <Bike className="w-16 h-16 text-primary mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Premium <span className="text-gradient">Motor Kiralama</span></h1>
            <p className="text-xl text-muted-foreground">
              kiralıkmotorsikletim vizyonuyla adrenalin dolu anlar için en iyi motosikletler emrinizde.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-10">Ege Motors Ayrıcalığıyla Sürüş Keyfi</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-card p-8 rounded-2xl border border-border">
              <CheckCircle className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Tam Ekipman</h3>
              <p className="text-muted-foreground">Kask, mont ve dizlik gibi tüm güvenlik ekipmanları kiralama paketine dahildir.</p>
            </div>
            <div className="bg-card p-8 rounded-2xl border border-border">
              <CheckCircle className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Zengin Çeşitlilik</h3>
              <p className="text-muted-foreground">Şehir içi scooter'lardan, uzun yol enduro ve supersport motorlara kadar geniş yelpaze.</p>
            </div>
            <div className="bg-card p-8 rounded-2xl border border-border">
              <CheckCircle className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Kaskolu Sürüş</h3>
              <p className="text-muted-foreground">Tüm motosikletlerimiz full rent a car kaskolu olup, yolda başınız asla ağrımaz.</p>
            </div>
          </div>

          <Link 
            href="/vehicles?type=Motorcycle" 
            className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-10 py-4 rounded-full font-bold text-lg hover:bg-primary-hover transition-all"
          >
            Tüm Motorları Gör <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>
    </>
  );
}

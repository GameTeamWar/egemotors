import JsonLd from "@/components/seo/JsonLd";
import RoadsideForm from "@/components/forms/RoadsideForm";
import { Truck, MapPin, Clock, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "7/24 Çekici ve Yol Yardım Hizmeti | Ege Motors",
  description: "Yolda mı kaldınız? İzmir ve Ege bölgesinde 7 gün 24 saat kesintisiz oto çekici ve acil yol yardım hizmeti. Hızlı, güvenilir ve uygun fiyatlı.",
  keywords: ["oto çekici", "7/24 yol yardım", "izmir çekici", "acil çekici", "Ege Motors çekici", "kiralıkaracım.com", "kiralıkmotorsikletim"],
};

export default function RoadsideAssistancePage() {
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "name": "Ege Motors 7/24 Çekici ve Yol Yardım",
    "description": "7 gün 24 saat acil oto çekici ve yol yardım hizmeti.",
    "url": "https://egemotors.net/services/roadside-assistance",
    "telephone": "+90-545-337-0837",
    "priceRange": "$$"
  };

  return (
    <>
      <JsonLd data={jsonLdData} />
      
      <section className="bg-muted py-20 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <Truck className="w-16 h-16 text-primary mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">7/24 Çekici ve <span className="text-gradient">Yol Yardım</span></h1>
            <p className="text-xl text-muted-foreground">
              Yolda kaldığınızda paniğe kapılmayın. Geniş çekici ağımızla en kısa sürede yanınızdayız.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            <div className="space-y-12">
              <div>
                <h2 className="text-3xl font-bold mb-6">Size En Yakın Çekici</h2>
                <p className="text-muted-foreground text-lg mb-8">
                  Arıza, kaza veya yakıt bitmesi gibi acil durumlarda profesyonel ekibimizle aracınızı güvenle istediğiniz noktaya taşıyoruz. Lüks spor araçlardan ağır vasıtalara kadar her türlü araca uygun çekici filomuz bulunmaktadır.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-card p-6 rounded-xl border border-border">
                    <Clock className="w-8 h-8 text-primary mb-4" />
                    <h4 className="text-lg font-bold mb-2">Anında Müdahale</h4>
                    <p className="text-sm text-muted-foreground">İzmir ve çevresinde ortalama 30 dakika içinde bulunduğunuz konuma ulaşıyoruz.</p>
                  </div>
                  <div className="bg-card p-6 rounded-xl border border-border">
                    <MapPin className="w-8 h-8 text-primary mb-4" />
                    <h4 className="text-lg font-bold mb-2">Geniş Hizmet Ağı</h4>
                    <p className="text-sm text-muted-foreground">Sadece şehir içi değil, şehirler arası araç transfer ve çekici hizmetleri de sunuyoruz.</p>
                  </div>
                  <div className="bg-card p-6 rounded-xl border border-border sm:col-span-2">
                    <ShieldCheck className="w-8 h-8 text-primary mb-4" />
                    <h4 className="text-lg font-bold mb-2">Tam Sigortalı Taşıma</h4>
                    <p className="text-sm text-muted-foreground">Çekiciye yükleme ve taşıma esnasında aracınız %100 sigorta kapsamındadır. Lüks araçlarınız için özel taşıma sistemleri kullanıyoruz.</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <RoadsideForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

import JsonLd from "@/components/seo/JsonLd";
import LegalForm from "@/components/forms/LegalForm";
import { Scale, FileText, Users, Clock } from "lucide-react";

export const metadata = {
  title: "Trafik Kazası Avukat Hizmeti | Ege Motors",
  description: "İzmir ve Ege bölgesinde trafik kazaları, değer kaybı davaları ve hasar süreçleri için uzman avukat hizmeti. Ege Motors güvencesiyle haklarınızı koruyun.",
  keywords: ["trafik kazası avukatı", "araç değer kaybı davası", "hasar danışmanlık", "Ege Motors avukat", "izmir trafik avukatı", "kiralıkaracım.com", "kiralıkmotorsikletim"],
};

export default function LegalSupportPage() {
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "name": "Ege Motors Hukuk ve Danışmanlık",
    "description": "Trafik kazaları ve değer kaybı davaları için uzman hukuki destek.",
    "url": "https://egemotors.net/services/legal-support",
    "telephone": "+90-545-337-0837",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Premium Plaza, Lüks Cad. No:1",
      "addressLocality": "İzmir",
      "addressCountry": "TR"
    }
  };

  return (
    <>
      <JsonLd data={jsonLdData} />
      
      {/* Hero Section */}
      <section className="bg-muted py-20 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <Scale className="w-16 h-16 text-primary mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Trafik Kazası ve Değer Kaybı <span className="text-gradient">Avukat Hizmeti</span></h1>
            <p className="text-xl text-muted-foreground">
              Uzman hukuk kadromuzla trafik kazaları sonrası hak kaybı yaşamanızı önlüyor, değer kaybı ve hasar bedeli süreçlerinizi profesyonelce yönetiyoruz.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            <div className="space-y-12">
              <div>
                <h2 className="text-3xl font-bold mb-6">Neden Bizi Seçmelisiniz?</h2>
                <p className="text-muted-foreground text-lg mb-8">
                  Ege Motors olarak kiralama ve satış hizmetlerimizin yanı sıra, müşterilerimizin her türlü hukuki sürecinde yanındayız. Özellikle trafik kazalarından doğan maddi ve manevi mağduriyetleri en kısa sürede çözüme kavuşturuyoruz.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-card p-6 rounded-xl border border-border">
                    <FileText className="w-8 h-8 text-primary mb-4" />
                    <h4 className="text-lg font-bold mb-2">Değer Kaybı</h4>
                    <p className="text-sm text-muted-foreground">Kazaya karışan aracınızın piyasa değerindeki düşüşü sigorta şirketlerinden tahsil ediyoruz.</p>
                  </div>
                  <div className="bg-card p-6 rounded-xl border border-border">
                    <Users className="w-8 h-8 text-primary mb-4" />
                    <h4 className="text-lg font-bold mb-2">Uzman Kadro</h4>
                    <p className="text-sm text-muted-foreground">Sadece sigorta ve trafik hukukunda uzmanlaşmış deneyimli avukatlarla çalışıyoruz.</p>
                  </div>
                  <div className="bg-card p-6 rounded-xl border border-border sm:col-span-2">
                    <Clock className="w-8 h-8 text-primary mb-4" />
                    <h4 className="text-lg font-bold mb-2">Hızlı Süreç Yönetimi</h4>
                    <p className="text-sm text-muted-foreground">Bürokratik engellere takılmadan, arabuluculuk ve dava süreçlerinizi en hızlı şekilde sonuçlandırıyoruz.</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <LegalForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

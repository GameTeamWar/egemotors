import JsonLd from "@/components/seo/JsonLd";
import MaintenanceForm from "@/components/forms/MaintenanceForm";
import { Wrench, CheckCircle, PenTool, Settings } from "lucide-react";

export const metadata = {
  title: "Oto Bakım ve Tamir Servisi | Ege Motors",
  description: "Aracınızın periyodik bakımı, mekanik tamiri ve uzman ekspertiz hizmetleri Ege Motors ayrıcalığıyla. Güvenilir ve garantili oto servis.",
  keywords: ["oto tamir", "periyodik bakım", "izmir oto servis", "motor tamiri", "Ege Motors tamir", "kiralıkaracım.com", "kiralıkmotorsikletim"],
};

export default function MaintenancePage() {
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "name": "Ege Motors Oto Bakım ve Tamir",
    "description": "Profesyonel oto servis, periyodik bakım ve mekanik tamir hizmetleri.",
    "url": "https://egemotors.net/services/maintenance",
    "telephone": "+90-545-337-0837",
    "priceRange": "$$"
  };

  return (
    <>
      <JsonLd data={jsonLdData} />
      
      <section className="bg-muted py-20 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <Wrench className="w-16 h-16 text-primary mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Uzman Bakım ve <span className="text-gradient">Tamir Servisi</span></h1>
            <p className="text-xl text-muted-foreground">
              Aracınızın ömrünü uzatan profesyonel bakım ve tamir hizmetleri. Alanında uzman mekaniker kadromuzla yanınızdayız.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            <div className="space-y-12">
              <div>
                <h2 className="text-3xl font-bold mb-6">Kaliteli İşçilik, Garantili Hizmet</h2>
                <p className="text-muted-foreground text-lg mb-8">
                  Servisimizde tüm marka ve model araçların periyodik bakımları, mekanik tamirleri, kaporta ve boya işlemleri orijinal yedek parçalar kullanılarak garantili bir şekilde yapılmaktadır.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-card p-6 rounded-xl border border-border">
                    <Settings className="w-8 h-8 text-primary mb-4" />
                    <h4 className="text-lg font-bold mb-2">Periyodik Bakım</h4>
                    <p className="text-sm text-muted-foreground">Yağ değişimi, filtre kontrolü, fren balatası ve mevsimlik check-up işlemleri.</p>
                  </div>
                  <div className="bg-card p-6 rounded-xl border border-border">
                    <PenTool className="w-8 h-8 text-primary mb-4" />
                    <h4 className="text-lg font-bold mb-2">Mekanik ve Motor</h4>
                    <p className="text-sm text-muted-foreground">Ağır hasar onarımı, motor revizyonu, şanzıman tamiri ve diagnostik testler.</p>
                  </div>
                  <div className="bg-card p-6 rounded-xl border border-border sm:col-span-2">
                    <CheckCircle className="w-8 h-8 text-primary mb-4" />
                    <h4 className="text-lg font-bold mb-2">Ekspertiz ve Raporlama</h4>
                    <p className="text-sm text-muted-foreground">İkinci el araç alım satımlarında şeffaf, güvenilir ve garantili ekspertiz hizmeti sunuyoruz.</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <MaintenanceForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

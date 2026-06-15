import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export const PublicFooter = async () => {
  let settings = {
    phone: "+90 (555) 123 45 67",
    address: "Premium Plaza, Lüks Cad. No:1, İstanbul, Türkiye",
    instagram: "#",
    facebook: "#",
    twitter: "#",
    description: "Premium araç kiralama ve satış hizmetleriyle hayallerinizdeki sürüş deneyimini keşfedin. Kalite, güven ve lüks bir arada.",
    title: "Ege Motors",
    privacyPolicy: "/privacy",
    termsOfUse: "/terms"
  };

  try {
    const docRef = doc(db, "system_settings", "site_footer");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      if (data.phone) settings.phone = data.phone;
      if (data.address) settings.address = data.address;
      if (data.instagram) settings.instagram = data.instagram;
      if (data.facebook) settings.facebook = data.facebook;
      if (data.twitter) settings.twitter = data.twitter;
      if (data.description) settings.description = data.description;
      if (data.title) settings.title = data.title;
      if (data.privacyPolicy) settings.privacyPolicy = data.privacyPolicy;
      if (data.termsOfUse) settings.termsOfUse = data.termsOfUse;
    }
  } catch (error) {
    console.error("Footer ayarları çekilirken hata oluştu:", error);
  }

  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <span className="text-2xl font-bold text-gradient uppercase tracking-wider block">
              {settings.title}
            </span>
            <p className="text-sm text-muted-foreground">
              {settings.description}
            </p>
            <div className="flex space-x-4 pt-2">
              {settings.instagram && (
                <>
                  <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium">Instagram</a>
                  <span className="text-muted-foreground">&bull;</span>
                </>
              )}
              {settings.facebook && (
                <>
                  <a href={settings.facebook} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium">Facebook</a>
                  <span className="text-muted-foreground">&bull;</span>
                </>
              )}
              {settings.twitter && (
                <a href={settings.twitter} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium">Twitter</a>
              )}
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4 text-foreground">Hızlı Linkler</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">Ana Sayfa</Link>
              </li>
              <li>
                <Link href="/vehicles" className="text-sm text-muted-foreground hover:text-primary transition-colors">Araç Filomuz</Link>
              </li>
              <li>
                <Link href="/hakkimizda" className="text-sm text-muted-foreground hover:text-primary transition-colors">Hakkımızda</Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">İletişim</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4 text-foreground">Hizmetlerimiz</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services/car-rental" className="text-sm text-muted-foreground hover:text-primary transition-colors">Araç Kiralama</Link>
              </li>
              <li>
                <Link href="/services/motorcycle-rental" className="text-sm text-muted-foreground hover:text-primary transition-colors">Motor Kiralama</Link>
              </li>
              <li>
                <Link href="/services/legal-support" className="text-sm text-muted-foreground hover:text-primary transition-colors">Avukat Hizmeti</Link>
              </li>
              <li>
                <Link href="/services/roadside-assistance" className="text-sm text-muted-foreground hover:text-primary transition-colors">7/24 Çekici & Yol Yardım</Link>
              </li>
              <li>
                <Link href="/services/maintenance" className="text-sm text-muted-foreground hover:text-primary transition-colors">Bakım ve Tamir</Link>
              </li>
              <li>
                <Link href="/store" className="text-sm text-muted-foreground hover:text-primary transition-colors">Parça Satışı / Mağaza</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4 text-foreground">İletişim</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span className="text-sm text-muted-foreground">{settings.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span className="text-sm text-muted-foreground">{settings.phone}</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground flex flex-col sm:flex-row items-center gap-2">
            <span>&copy; {new Date().getFullYear()} {settings.title}. Tüm hakları saklıdır.</span>
            <span className="hidden sm:inline">&bull;</span>
            <a href="https://Yummine.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Powered by Yummine.com</a>
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Gizlilik Politikası</Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">Kullanım Şartları</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

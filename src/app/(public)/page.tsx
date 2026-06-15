import { collection, getDocs, query, where, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";
import HomeContent from "@/components/home/HomeContent";
import JsonLd from "@/components/seo/JsonLd";

// Sayfa yenilendiğinde güncel veriyi çekmesi için revalidate ayarı (ISR)
export const revalidate = 60; // Her 60 saniyede bir yenile

export const metadata = {
  title: "Ege Motors | Lüks Araç ve Motosiklet Kiralama, Yol Yardım",
  description: "kiralıkaracım.com ve kiralıkmotorsikletim güvencesiyle Ege Motors'ta lüks araç kiralama, 7/24 çekici yol yardım, tamir bakım ve avukat hizmetleri.",
  keywords: ["kiralıkaracım.com", "kiralıkmotorsikletim", "Ege Motors", "Lüks araç kiralama", "izmir motor kiralama", "yol yardım çekici", "trafik kazası avukat", "yedek parça mağaza"],
  openGraph: {
    title: "Ege Motors | Lüks Araç Kiralama ve Premium Hizmetler",
    description: "Hayalinizdeki aracı kiralayın. Kiralama, bakım, yol yardım ve avukat hizmetleri tek çatı altında.",
    url: "https://egemotors.net",
    siteName: "Ege Motors",
    locale: "tr_TR",
    type: "website",
  },
};

export default async function HomePage() {
  let availableVehicles: any[] = [];

  try {
    const vehiclesRef = collection(db, "vehicles");
    // Sadece "Müsait" olan araçları çek (Firebase'de Müsait yazıldığı varsayılmıştır)
    const q = query(vehiclesRef, where("status", "==", "Müsait"));
    const querySnapshot = await getDocs(q);
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.showOnWeb !== 0) {
        availableVehicles.push({ id: doc.id, ...data });
      }
    });
  } catch (error) {
    console.error("Araçlar çekilirken hata oluştu:", error);
  }

  const jsonLdData = [
    {
      "@context": "https://schema.org",
      "@type": "AutoRental",
      "name": "Ege Motors",
      "url": "https://egemotors.net",
      "logo": "https://egemotors.net/icon.png",
      "description": "Premium araç ve motosiklet kiralama, yol yardım, bakım ve hukuki destek hizmetleri.",
      "telephone": "+90-545-337-0837",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Premium Plaza, Lüks Cad. No:1",
        "addressLocality": "İzmir",
        "addressCountry": "TR"
      },
      "sameAs": [
        "https://kiralikaracim.com",
        "https://kiralikmotorsikletim.com"
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Ege Motors Hizmetleri",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Araç Kiralama",
          "url": "https://egemotors.net/services/car-rental"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Motor Kiralama",
          "url": "https://egemotors.net/services/motorcycle-rental"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Avukat Hizmeti",
          "url": "https://egemotors.net/services/legal-support"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "7/24 Çekici ve Yol Yardım",
          "url": "https://egemotors.net/services/roadside-assistance"
        },
        {
          "@type": "ListItem",
          "position": 5,
          "name": "Bakım ve Tamir",
          "url": "https://egemotors.net/services/maintenance"
        },
        {
          "@type": "ListItem",
          "position": 6,
          "name": "Parça Satışı / Mağaza",
          "url": "https://egemotors.net/store"
        }
      ]
    }
  ];

  return (
    <>
      <JsonLd data={jsonLdData} />
      <HomeContent availableVehicles={availableVehicles} />
    </>
  );
}

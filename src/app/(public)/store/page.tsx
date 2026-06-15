import JsonLd from "@/components/seo/JsonLd";
import { ShoppingBag } from "lucide-react";
import { collection, getDocs, query, where, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";
import StoreClient from "@/components/store/StoreClient";

export const revalidate = 60;

export const metadata = {
  title: "Yedek Parça ve Aksesuar Mağazası | Ege Motors",
  description: "Ege Motors güvencesiyle orijinal yedek parça, madeni yağlar ve araç/motor aksesuarları. Hızlı kargo ve güvenli alışveriş.",
  keywords: ["oto yedek parça", "motor aksesuar", "Ege Motors mağaza", "orijinal parça", "kiralıkaracım.com", "kiralıkmotorsikletim", "madeni yağ"],
};

export default async function StorePage() {
  let storeItems: any[] = [];
  let uniqueCategories: string[] = [];

  try {
    const inventoryRef = collection(db, "inventory");
    const q = query(inventoryRef, where("currentStock", ">", 0), limit(100)); // We can increase the limit or remove it for client side filtering
    const querySnapshot = await getDocs(q);
    
    const categorySet = new Set<string>();

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      storeItems.push({ id: doc.id, ...data });
      
      const cat = data.category || "Aksesuar";
      categorySet.add(cat);
    });

    uniqueCategories = Array.from(categorySet).sort();
  } catch (error) {
    console.error("Ürünler çekilirken hata:", error);
  }

  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "Store",
    "name": "Ege Motors Mağaza",
    "description": "Oto ve motor yedek parça, aksesuar mağazası.",
    "url": "https://egemotors.net/store",
    "telephone": "+90-545-337-0837"
  };

  return (
    <>
      <JsonLd data={jsonLdData} />
      
      {/* Premium Hero Section */}
      <section className="bg-muted py-24 border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/hero-bg-v2.png')] bg-cover bg-center opacity-10 blur-sm"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center p-4 rounded-full bg-primary/10 mb-6">
              <ShoppingBag className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Ege Motors <span className="text-gradient">Premium Mağaza</span></h1>
            <p className="text-xl text-muted-foreground font-light drop-shadow-sm">
              Orijinal yedek parçalar, premium aksesuarlar ve en kaliteli bakım ürünleri tek bir adreste. Profesyonel hizmet, güvenli alışveriş.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Store Client */}
      <section className="bg-background min-h-screen">
        <StoreClient initialItems={storeItems} categories={uniqueCategories} />
      </section>
    </>
  );
}

import JsonLd from "@/components/seo/JsonLd";
import VehicleListClient from "@/components/vehicles/VehicleListClient";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { getVehicleCoverImage } from "@/utils/vehicleImage";

export const revalidate = 60; // ISR cache

export const metadata = {
  title: "Araç ve Motor Filomuz | Ege Motors",
  description: "İzmir Ege Motors geniş lüks araç ve premium motosiklet filosu. Hemen inceleyin, online rezervasyon yapın. kiralıkaracım.com ve kiralıkmotorsikletim güvencesiyle.",
  keywords: ["kiralık araç", "kiralık motor", "izmir lüks araç kiralama", "Ege Motors filo", "kiralıkaracım.com", "kiralıkmotorsikletim"],
};

export default async function VehiclesPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  let initialVehicles: any[] = [];
  
  // Optionally filter by type if coming from service pages (?type=Car)
  const initialTypeFilter = typeof searchParams.type === 'string' ? searchParams.type : 'All';

  try {
    const vehiclesRef = collection(db, "vehicles");
    // Sadece "Müsait" araçlar gelsin.
    // Eger tumunu gormek isteniyorsa where kaldirilabilir, ama kiralama sitesinde genelde musait olanlar listelenir.
    const q = query(vehiclesRef, where("status", "==", "Müsait"));
    const querySnapshot = await getDocs(q);
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      // showOnWeb: 0 = hayır, 1 = evet (default evet if undefined)
      if (data.showOnWeb !== 0) {
        initialVehicles.push({ id: doc.id, ...data });
      }
    });
    
    // Sort by createdAt desc inside memory (or use orderBy in firestore if index exists)
    initialVehicles.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  } catch (error) {
    console.error("Araç filosu çekilirken hata:", error);
  }

  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": initialVehicles.map((v, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Car",
        "name": `${v.brand} ${v.model}`,
        "description": `${v.year} model ${v.fuelType} ${v.transmission}`,
        "image": getVehicleCoverImage(v),
        "url": `https://egemotors.net/vehicles/${v.id}`
      }
    }))
  };

  return (
    <>
      <JsonLd data={jsonLdData} />
      
      <section className="bg-muted py-16 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Filomuzu <span className="text-gradient">Keşfedin</span></h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            İhtiyacınıza ve tarzınıza en uygun premium aracı veya motosikleti seçin.
          </p>
        </div>
      </section>

      <VehicleListClient initialVehicles={initialVehicles} />
    </>
  );
}

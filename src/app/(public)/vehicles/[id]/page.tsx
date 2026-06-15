import JsonLd from "@/components/seo/JsonLd";
import VehicleDetailClient from "@/components/vehicles/VehicleDetailClient";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { notFound } from "next/navigation";
import { getVehicleCoverImage } from "@/utils/vehicleImage";

export const revalidate = 60; // ISR cache

// Dynamically generate metadata for each vehicle
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const docRef = doc(db, "vehicles", resolvedParams.id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      return { title: "Araç Bulunamadı | Ege Motors" };
    }
    const vehicle = docSnap.data();
    return {
      title: `${vehicle.brand} ${vehicle.model} Kiralama | Ege Motors`,
      description: `Ege Motors ayrıcalığıyla ${vehicle.year} model ${vehicle.brand} ${vehicle.model} kiralayın. Lüks araç ve motosiklet kiralama hizmeti.`,
      keywords: [vehicle.brand, vehicle.model, "araç kiralama", "lüks araç", "Ege Motors"],
      openGraph: {
        title: `${vehicle.brand} ${vehicle.model} - Ege Motors`,
        description: `Premium kiralama deneyimi için ${vehicle.brand} ${vehicle.model} hemen inceleyin.`,
        images: [getVehicleCoverImage(vehicle)],
      }
    };
  } catch {
    return { title: "Araç | Ege Motors" };
  }
}

export default async function VehicleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  let vehicle: any = null;
  const resolvedParams = await params;

  try {
    const docRef = doc(db, "vehicles", resolvedParams.id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      vehicle = { id: docSnap.id, ...docSnap.data() };
    }
  } catch (error) {
    console.error("Araç detayı çekilirken hata:", error);
  }

  if (!vehicle) {
    notFound();
  }

  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "Car",
    "name": `${vehicle.brand} ${vehicle.model}`,
    "brand": {
      "@type": "Brand",
      "name": vehicle.brand
    },
    "model": vehicle.model,
    "vehicleModelDate": vehicle.year,
    "fuelType": vehicle.fuelType,
    "vehicleTransmission": vehicle.transmission,
    "image": getVehicleCoverImage(vehicle),
    "offers": {
      "@type": "Offer",
      "priceCurrency": "TRY",
      "price": vehicle.dailyRate || "0",
      "availability": vehicle.status === "Müsait" ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "itemCondition": "https://schema.org/UsedCondition",
      "url": `https://egemotors.net/vehicles/${vehicle.id}`
    }
  };

  return (
    <>
      <JsonLd data={jsonLdData} />
      <VehicleDetailClient vehicle={vehicle} />
    </>
  );
}

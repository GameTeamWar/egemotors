import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import ReservationClient from "./ReservationClient";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Araç Rezervasyonu | Ege Motors",
  description: "Ege Motors ile hızlı ve güvenli araç rezervasyonu yapın.",
};

export default async function ReservationPage({ params }: { params: { id: string } }) {
  const { id } = params;

  let vehicleData: any = null;
  try {
    const docRef = doc(db, "vehicles", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      vehicleData = { id: docSnap.id, ...docSnap.data() };
    }
  } catch (error) {
    console.error("Araç bilgisi çekilirken hata oluştu:", error);
  }

  if (!vehicleData) {
    return notFound();
  }

  return (
    <>
      <section className="bg-muted py-12 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Rezervasyon Oluştur
          </h1>
          <p className="text-lg text-muted-foreground">
            {vehicleData.brand} {vehicleData.model} aracı için kiralama detaylarınızı giriniz.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ReservationClient vehicle={vehicleData} />
      </div>
    </>
  );
}

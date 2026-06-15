import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export const metadata = {
  title: "Gizlilik Politikası | Ege Motors",
  description: "Ege Motors Gizlilik Politikası",
};

export const revalidate = 60; // ISR cache for 60 seconds

export default async function PrivacyPage() {
  let content = "Gizlilik politikası içeriği henüz eklenmedi.";

  try {
    const docRef = doc(db, "system_settings", "site_footer");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      if (data.privacyPolicy) {
        content = data.privacyPolicy;
      }
    }
  } catch (error) {
    console.error("Gizlilik politikası çekilirken hata oluştu:", error);
  }

  return (
    <>
      <section className="bg-muted py-16 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">
            Gizlilik Politikası
          </h1>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg dark:prose-invert max-w-none whitespace-pre-wrap">
            {content}
          </div>
        </div>
      </section>
    </>
  );
}

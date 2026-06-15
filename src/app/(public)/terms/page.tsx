import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export const metadata = {
  title: "Kullanım Şartları | Ege Motors",
  description: "Ege Motors Kullanım Şartları",
};

export const revalidate = 60; // ISR cache for 60 seconds

export default async function TermsPage() {
  let content = "Kullanım şartları içeriği henüz eklenmedi.";

  try {
    const docRef = doc(db, "system_settings", "site_footer");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      if (data.termsOfUse) {
        content = data.termsOfUse;
      }
    }
  } catch (error) {
    console.error("Kullanım şartları çekilirken hata oluştu:", error);
  }

  return (
    <>
      <section className="bg-muted py-16 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">
            Kullanım Şartları
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

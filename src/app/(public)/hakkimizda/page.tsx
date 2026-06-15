"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Info, Building2, Users, Trophy } from "lucide-react";

export default function AboutUsPage() {
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const docRef = doc(db, "system_settings", "about_us_content");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setContent(docSnap.data().content || "");
        }
      } catch (error) {
        console.error("Hakkımızda içeriği alınamadı:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  return (
    <div className="min-h-screen pt-32 pb-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 -left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-wider mb-4 border border-primary/20">
            BİZ KİMİZ?
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6 tracking-tight">
            Hakkımızda
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ege Motors olarak sizlere en iyi hizmeti sunmak için sürekli gelişiyor ve yenileniyoruz.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass rounded-3xl p-8 md:p-12 shadow-2xl border border-border relative overflow-hidden"
        >
          {/* Decorative corner */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/20 to-transparent rounded-bl-full pointer-events-none" />

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
              <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
              <p className="text-muted-foreground animate-pulse">İçerik yükleniyor...</p>
            </div>
          ) : content ? (
            <div className="prose prose-invert prose-lg max-w-none">
              {content.split("\n").map((paragraph, index) => (
                <p key={index} className="mb-4 text-foreground/80 leading-relaxed font-light">
                  {paragraph}
                </p>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Info className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">
                Henüz bir içerik eklenmemiş. Lütfen daha sonra tekrar ziyaret edin.
              </p>
            </div>
          )}
        </motion.div>

        {/* Feature Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
        >
          {[
            { icon: Building2, title: "Güvenilir Hizmet", desc: "Yılların tecrübesiyle sektörde öncü." },
            { icon: Users, title: "Uzman Ekip", desc: "Alanında profesyonel kadro." },
            { icon: Trophy, title: "Müşteri Memnuniyeti", desc: "Önceliğimiz her zaman sizsiniz." }
          ].map((feature, i) => (
            <div key={i} className="glass p-6 rounded-2xl border border-border flex flex-col items-center text-center hover:bg-black/5 transition-colors">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

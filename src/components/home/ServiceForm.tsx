"use client";

import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Phone, MessageCircle, Send, Loader2, CheckCircle2 } from "lucide-react";

interface ServiceFormProps {
  serviceType: string;
  title: string;
  whatsappMessage: string;
}

export default function ServiceForm({ serviceType, title, whatsappMessage }: ServiceFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await addDoc(collection(db, "requests"), {
        type: serviceType,
        name,
        phone,
        message,
        status: "pending",
        createdAt: new Date().toISOString(),
      });
      setIsSuccess(true);
      setName("");
      setPhone("");
      setMessage("");
    } catch (error) {
      console.error("Talep gönderilirken hata:", error);
      alert("Bir hata oluştu. Lütfen WhatsApp veya telefon üzerinden iletişime geçin.");
    } finally {
      setIsLoading(false);
    }
  };

  const WHATSAPP_NUMBER = "905453370837"; // Ege Motors WhatsApp numarası
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="glass p-8 rounded-2xl border border-border">
      <h3 className="text-2xl font-bold mb-6">{title}</h3>
      
      {isSuccess ? (
        <div className="bg-green-500/10 border border-green-500/30 p-6 rounded-xl text-center mb-8">
          <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-3" />
          <p className="text-green-500 font-medium text-lg">Talebiniz Alındı!</p>
          <p className="text-muted-foreground mt-2">Müşteri temsilcimiz en kısa sürede size ulaşacaktır.</p>
          <button 
            onClick={() => setIsSuccess(false)}
            className="mt-4 text-primary hover:underline text-sm"
          >
            Yeni bir talep gönder
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">Ad Soyad</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              placeholder="Adınız Soyadınız"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">Telefon Numarası</label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              placeholder="0 (5XX) XXX XX XX"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">Detaylı Bilgi</label>
            <textarea
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
              placeholder="Durumunuzu kısaca açıklayın..."
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-bold hover:bg-primary-hover transition-colors flex justify-center items-center gap-2"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
              <>
                Talebi Gönder <Send className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      )}

      <div className="relative flex items-center py-5">
        <div className="flex-grow border-t border-border"></div>
        <span className="flex-shrink-0 mx-4 text-muted-foreground text-sm">veya daha hızlı iletişim için</span>
        <div className="flex-grow border-t border-border"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <a 
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/30 py-3 rounded-lg hover:bg-[#25D366]/20 transition-all font-medium"
        >
          <MessageCircle className="w-5 h-5" />
          WhatsApp'tan Yaz
        </a>
        <a 
          href="tel:+905453370837"
          className="flex items-center justify-center gap-2 bg-card text-foreground border border-border py-4 rounded-xl font-bold text-lg hover:border-primary hover:text-primary transition-colors"
        >
          <Phone className="w-5 h-5" />
          Hemen Ara
        </a>
      </div>
    </div>
  );
}

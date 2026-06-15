"use client";

import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Loader2, Scale, MessageCircle, Send, CheckCircle, Calendar } from "lucide-react";

export default function LegalForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    caseType: "Değer Kaybı",
    incidentDate: "",
    message: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const WHATSAPP_NUMBER = "905453370837";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFirebaseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await addDoc(collection(db, "requests"), {
        type: "legal",
        status: "pending",
        createdAt: serverTimestamp(),
        ...formData
      });
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 5000);
      setFormData({ name: "", phone: "", email: "", caseType: "Değer Kaybı", incidentDate: "", message: "" });
    } catch (error) {
      console.error("Talep gönderilemedi:", error);
      alert("Bir hata oluştu, lütfen WhatsApp üzerinden iletişime geçin.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleWhatsAppSend = () => {
    const text = `*⚖️ Hukuki Destek / Danışmanlık Talebi*\n\n` +
      `*Müşteri:* ${formData.name}\n` +
      `*Telefon:* ${formData.phone}\n` +
      `*Dava/Talep Türü:* ${formData.caseType}\n` +
      `*Olay Tarihi:* ${formData.incidentDate}\n\n` +
      `*Açıklama:* ${formData.message}`;
    
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="glass p-8 rounded-2xl border border-primary/30 shadow-[0_0_40px_-15px_rgba(212,175,55,0.2)] relative overflow-hidden">
      <div className="absolute top-0 left-0 p-32 bg-primary/5 rounded-full blur-3xl -z-10" />
      
      <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 border-b border-border pb-4">
        <Scale className="text-primary w-8 h-8" />
        Hukuki Danışmanlık Başvurusu
      </h3>

      {isSuccess ? (
        <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in zoom-in">
          <CheckCircle className="w-20 h-20 text-green-500 mb-4" />
          <h4 className="text-2xl font-bold mb-2">Başvurunuz Alındı</h4>
          <p className="text-muted-foreground">Avukatlarımız dosyanızı inceledikten sonra belirttiğiniz numara üzerinden size dönüş yapacaktır.</p>
          <button onClick={() => setIsSuccess(false)} className="mt-6 text-primary hover:underline">Yeni Talep Oluştur</button>
        </div>
      ) : (
        <form onSubmit={handleFirebaseSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="Ad Soyad" className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all" />
              <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} placeholder="Telefon Numarası" className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all" />
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="E-posta Adresi (İsteğe bağlı)" className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all" />
            </div>

            <div className="space-y-4">
              <select name="caseType" value={formData.caseType} onChange={handleChange} className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all text-foreground">
                <option value="Değer Kaybı">Hasar Değer Kaybı Talebi</option>
                <option value="Kaza Tespit İtirazı">Kaza Tespit Tutanağı İtirazı</option>
                <option value="Sigorta Şirketi Uyuşmazlığı">Sigorta Şirketi Uyuşmazlığı</option>
                <option value="Diğer">Diğer Hukuki Danışmanlık</option>
              </select>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                </div>
                <input type="date" name="incidentDate" value={formData.incidentDate} onChange={handleChange} title="Olay/Kaza Tarihi (Varsa)" className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all text-muted-foreground" />
              </div>
            </div>
          </div>
          
          <textarea name="message" required value={formData.message} onChange={handleChange} placeholder="Olayı veya talebinizi kısaca özetleyin..." rows={4} className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all resize-none"></textarea>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button type="submit" disabled={isLoading} className="flex-1 bg-primary text-primary-foreground py-4 rounded-xl font-bold hover:bg-primary-hover transition-colors flex justify-center items-center gap-2 shadow-lg hover:shadow-primary/20">
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Send className="w-5 h-5" /> Dosyayı İlet</>}
            </button>
            <button type="button" onClick={handleWhatsAppSend} className="flex-1 bg-[#25D366] text-white py-4 rounded-xl font-bold hover:bg-[#128C7E] transition-colors flex justify-center items-center gap-2 shadow-lg hover:shadow-[#25D366]/30">
              <MessageCircle className="w-5 h-5" /> WhatsApp'tan Danış
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

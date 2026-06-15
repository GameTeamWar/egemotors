"use client";

import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Loader2, Calendar, CarFront, MessageCircle, Send, CheckCircle } from "lucide-react";

export default function MaintenanceForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    vehicleBrand: "",
    vehicleModel: "",
    vehicleYear: "",
    vehicleType: "Motor",
    appointmentDate: "",
    appointmentTime: "",
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
        type: "maintenance",
        status: "pending",
        createdAt: serverTimestamp(),
        ...formData
      });
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 5000);
      setFormData({
        name: "", phone: "", email: "", vehicleBrand: "", vehicleModel: "", vehicleYear: "",
        vehicleType: "Motor", appointmentDate: "", appointmentTime: "", message: ""
      });
    } catch (error) {
      console.error("Talep gönderilemedi:", error);
      alert("Bir hata oluştu, lütfen WhatsApp üzerinden iletişime geçin.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleWhatsAppSend = () => {
    const text = `*Yeni Bakım Servisi Talebi*\n\n` +
      `*Müşteri:* ${formData.name}\n` +
      `*Telefon:* ${formData.phone}\n` +
      `*Araç Tipi:* ${formData.vehicleType}\n` +
      `*Araç:* ${formData.vehicleBrand} ${formData.vehicleModel} (${formData.vehicleYear})\n` +
      `*Randevu:* ${formData.appointmentDate} Saat: ${formData.appointmentTime}\n\n` +
      `*Detaylar:* ${formData.message}`;
    
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="glass p-8 rounded-2xl border border-border shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 p-32 bg-primary/5 rounded-full blur-3xl -z-10" />
      
      <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 border-b border-border pb-4">
        <CarFront className="text-primary w-8 h-8" />
        Profesyonel Bakım Randevusu
      </h3>

      {isSuccess ? (
        <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in zoom-in">
          <CheckCircle className="w-20 h-20 text-green-500 mb-4" />
          <h4 className="text-2xl font-bold mb-2">Talebiniz Alındı!</h4>
          <p className="text-muted-foreground">Müşteri temsilcimiz en kısa sürede sizinle iletişime geçerek randevunuzu onaylayacaktır.</p>
          <button onClick={() => setIsSuccess(false)} className="mt-6 text-primary hover:underline">Yeni Talep Oluştur</button>
        </div>
      ) : (
        <form onSubmit={handleFirebaseSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Kişisel Bilgiler */}
            <div className="space-y-4">
              <h4 className="font-semibold text-primary flex items-center gap-2 mb-2"><div className="w-2 h-2 rounded-full bg-primary" /> İletişim Bilgileri</h4>
              <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="Ad Soyad" className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all" />
              <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} placeholder="Telefon Numarası" className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all" />
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="E-posta Adresi (İsteğe bağlı)" className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all" />
            </div>

            {/* Araç Bilgileri */}
            <div className="space-y-4">
              <h4 className="font-semibold text-primary flex items-center gap-2 mb-2"><div className="w-2 h-2 rounded-full bg-primary" /> Araç Bilgileri</h4>
              <div className="flex gap-4">
                <select name="vehicleType" value={formData.vehicleType} onChange={handleChange} className="w-1/3 px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all">
                  <option value="Motor">Motor</option>
                  <option value="Araç">Araç</option>
                </select>
                <input type="text" name="vehicleBrand" required value={formData.vehicleBrand} onChange={handleChange} placeholder="Marka (Örn: Honda)" className="w-2/3 px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all" />
              </div>
              <div className="flex gap-4">
                <input type="text" name="vehicleModel" required value={formData.vehicleModel} onChange={handleChange} placeholder="Model (Örn: Dio)" className="w-2/3 px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all" />
                <input type="text" name="vehicleYear" required value={formData.vehicleYear} onChange={handleChange} placeholder="Yıl" className="w-1/3 px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all" />
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-6">
            <h4 className="font-semibold text-primary flex items-center gap-2 mb-4"><div className="w-2 h-2 rounded-full bg-primary" /> Randevu & Detaylar</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input type="date" name="appointmentDate" required value={formData.appointmentDate} onChange={handleChange} className="w-full pl-12 pr-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all text-foreground" />
              </div>
              <input type="time" name="appointmentTime" required value={formData.appointmentTime} onChange={handleChange} className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all text-foreground" />
            </div>
            
            <textarea name="message" required value={formData.message} onChange={handleChange} placeholder="Lütfen yaptırmak istediğiniz bakım veya tamir detaylarını açıklayın..." rows={4} className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all resize-none"></textarea>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button type="submit" disabled={isLoading} className="flex-1 bg-primary text-primary-foreground py-4 rounded-xl font-bold hover:bg-primary-hover transition-colors flex justify-center items-center gap-2 shadow-lg hover:shadow-primary/20">
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Send className="w-5 h-5" /> Randevu Talebi Oluştur</>}
            </button>
            <button type="button" onClick={handleWhatsAppSend} className="flex-1 bg-[#25D366] text-white py-4 rounded-xl font-bold hover:bg-[#128C7E] transition-colors flex justify-center items-center gap-2 shadow-lg hover:shadow-[#25D366]/30">
              <MessageCircle className="w-5 h-5" /> WhatsApp İle Gönder
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

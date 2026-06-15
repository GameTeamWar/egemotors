"use client";

import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Loader2, MapPin, MessageCircle, AlertTriangle, Send, CheckCircle } from "lucide-react";

export default function RoadsideForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: ""
  });
  const [location, setLocation] = useState<{ lat: number, lng: number } | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const WHATSAPP_NUMBER = "905453370837";

  const isFormValid = formData.name.trim() !== "" && formData.phone.trim() !== "" && formData.message.trim() !== "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getLocation = () => {
    setIsLocating(true);
    setLocationError("");
    
    if (!navigator.geolocation) {
      setLocationError("Tarayıcınız konum özelliğini desteklemiyor.");
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setIsLocating(false);
      },
      (error) => {
        setIsLocating(false);
        setLocationError("Konum alınamadı. Lütfen tarayıcı izinlerinizi kontrol edin.");
        console.error(error);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const handleFirebaseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) {
      alert("Lütfen tüm alanları doldurun.");
      return;
    }
    if (!location) {
      const confirmNoLocation = window.confirm("Konum bilginiz alınmadı. Yine de göndermek istiyor musunuz? Çekicinin sizi bulabilmesi için konum önemlidir.");
      if (!confirmNoLocation) return;
    }

    setIsLoading(true);
    try {
      await addDoc(collection(db, "requests"), {
        type: "roadside",
        status: "pending",
        createdAt: serverTimestamp(),
        ...formData,
        locationLat: location?.lat || null,
        locationLng: location?.lng || null
      });
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 5000);
      setFormData({ name: "", phone: "", message: "" });
      setLocation(null);
    } catch (error) {
      console.error("Talep gönderilemedi:", error);
      alert("Bir hata oluştu, lütfen WhatsApp üzerinden veya arayarak iletişime geçin.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleWhatsAppSend = () => {
    if (!isFormValid) {
      alert("Lütfen tüm alanları doldurun.");
      return;
    }
    let text = `*🚨 ACİL YOL YARDIM TALEBİ 🚨*\n\n` +
      `*Müşteri:* ${formData.name}\n` +
      `*Telefon:* ${formData.phone}\n\n` +
      `*Durum:* ${formData.message}\n\n`;

    if (location) {
      text += `*Konum:* https://maps.google.com/?q=${location.lat},${location.lng}`;
    } else {
      text += `*Konum:* Alınamadı veya Eklenmedi.`;
    }
    
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="glass p-8 rounded-2xl border border-red-500/30 shadow-[0_0_40px_-15px_rgba(239,68,68,0.3)] relative overflow-hidden">
      <div className="absolute top-0 right-0 p-32 bg-red-500/5 rounded-full blur-3xl -z-10" />
      
      <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 border-b border-border pb-4 text-red-500">
        <AlertTriangle className="w-8 h-8 animate-pulse" />
        Acil Çekici & Yol Yardım
      </h3>

      {isSuccess ? (
        <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in zoom-in">
          <CheckCircle className="w-20 h-20 text-green-500 mb-4" />
          <h4 className="text-2xl font-bold mb-2">Talebiniz Alındı!</h4>
          <p className="text-muted-foreground">Ekiplerimiz bulunduğunuz konuma veya belirttiğiniz adrese en kısa sürede yönlendirilecektir. Acil durumlar için bizi doğrudan arayabilirsiniz.</p>
          <a href="tel:+905453370837" className="mt-6 font-bold text-red-500 hover:underline">Hemen Ara: 0545 337 08 37</a>
        </div>
      ) : (
        <form onSubmit={handleFirebaseSubmit} className="space-y-6">
          <div className="space-y-4">
            <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="Ad Soyad" className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition-all" />
            <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} placeholder="Telefon Numarası" className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition-all" />
          </div>

          <div className="bg-red-500/5 border border-red-500/20 p-4 rounded-xl">
            <h4 className="font-semibold text-red-500 flex items-center gap-2 mb-3">
              <MapPin className="w-5 h-5" /> GPS Konumunuz
            </h4>
            
            {location ? (
              <div className="bg-green-500/10 text-green-500 p-3 rounded-lg flex items-center gap-2 border border-green-500/20">
                <CheckCircle className="w-5 h-5" /> Konum başarıyla alındı. Çekici bu konuma yönlendirilecek.
              </div>
            ) : (
              <div>
                <p className="text-sm text-muted-foreground mb-3">Size daha hızlı ulaşabilmemiz için bulunduğunuz konumu paylaşın.</p>
                <button 
                  type="button" 
                  onClick={getLocation} 
                  disabled={isLocating}
                  className="w-full py-3 bg-background border border-red-500/50 text-red-500 rounded-xl font-medium hover:bg-red-500/10 transition-colors flex justify-center items-center gap-2"
                >
                  {isLocating ? <Loader2 className="w-5 h-5 animate-spin" /> : "Mevcut Konumumu Bul"}
                </button>
                {locationError && <p className="text-xs text-red-500 mt-2">{locationError}</p>}
              </div>
            )}
          </div>
          
          <textarea name="message" required value={formData.message} onChange={handleChange} placeholder="Aracın durumu nedir? (Örn: Lastik patladı, akü bitti, kaza yaptım...)" rows={3} className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition-all resize-none"></textarea>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button type="submit" disabled={isLoading} className="flex-1 bg-red-600 text-white py-4 rounded-xl font-bold hover:bg-red-700 transition-colors flex justify-center items-center gap-2 shadow-lg hover:shadow-red-600/30">
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Send className="w-5 h-5" /> Acil Yardım İste</>}
            </button>
            <button type="button" onClick={handleWhatsAppSend} className="flex-1 bg-[#25D366] text-white py-4 rounded-xl font-bold hover:bg-[#128C7E] transition-colors flex justify-center items-center gap-2 shadow-lg hover:shadow-[#25D366]/30">
              <MessageCircle className="w-5 h-5" /> Konumu WhatsApp'a At
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

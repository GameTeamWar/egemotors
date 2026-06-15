"use client";

import { useState } from "react";
import { getVehicleCoverImage } from "@/utils/vehicleImage";
import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

export default function ReservationForm({ vehicle }: { vehicle: any }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  // Dates & Times
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("10:00");
  const [rentalType, setRentalType] = useState<'daily'|'monthly'>('daily');
  const [rentalDuration, setRentalDuration] = useState(1);
  const [endTime, setEndTime] = useState("10:00");
  
  // Form
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    identityNumber: "", // TC veya Pasaport
    birthDate: "",
    licenseClass: "",
    licenseExpiry: "",
    licenseCity: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Fiyat Hesaplama
  let totalDays = 0;
  let totalPrice = 0;
  let endDate = "";
  
  if (startDate) {
    const sDate = new Date(`${startDate}T${startTime}`);
    const eDate = new Date(sDate);
    
    if (rentalType === 'monthly') {
      eDate.setMonth(eDate.getMonth() + Number(rentalDuration));
    } else {
      eDate.setDate(eDate.getDate() + Number(rentalDuration));
    }
    endDate = eDate.toISOString().split('T')[0];
    
    const diffTime = Math.max(0, eDate.getTime() - sDate.getTime());
    totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (totalDays === 0) totalDays = 1;
    
    if (rentalType === 'monthly' && vehicle.monthlyPrice) {
      totalPrice = Number(rentalDuration) * Number(vehicle.monthlyPrice);
    } else if (vehicle.dailyPrice) {
      totalPrice = totalDays * Number(vehicle.dailyPrice);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!startDate || !rentalDuration) {
      alert("Lütfen başlangıç ve bitiş tarihlerini seçiniz.");
      return;
    }

    setLoading(true);
    try {
      const requestData = {
        vehicleId: vehicle.id,
        vehicleBrand: vehicle.brand,
        vehicleModel: vehicle.model,
        vehiclePlate: vehicle.plate,
        vehicleYear: vehicle.year,
        vehicleImage: getVehicleCoverImage(vehicle),
        ...formData,
        startDate,
        startTime,
        rentalType,
        rentalDuration,
        endDate,
        endTime,
        totalDays,
        dailyPrice: vehicle.dailyPrice || 0,
        monthlyPrice: vehicle.monthlyPrice || 0,
        totalPrice,
        status: "pending", // pending, approved, rejected
        createdAt: new Date().toISOString(),
      };

      await addDoc(collection(db, "rentalRequests"), requestData);
      
      try {
        // Save to 'notifications' collection
        await addDoc(collection(db, "notifications"), {
          type: "request",
          title: "Yeni Rezervasyon Talebi",
          message: `${formData.firstName} ${formData.lastName} adlı kullanıcı ${vehicle.plate} aracı için rezervasyon talebi gönderdi.`,
          vehiclePlate: vehicle.plate,
          sendDate: new Date().toISOString(),
          isRead: false
        });

        // Fetch all Expo push tokens from 'users' collection
        const usersSnap = await getDocs(collection(db, "users"));
        const pushTokens: string[] = [];
        usersSnap.forEach(doc => {
          const data = doc.data();
          if (data.pushToken) pushTokens.push(data.pushToken);
        });

        // Send Expo Push Notification
        if (pushTokens.length > 0) {
          await fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Accept-encoding': 'gzip, deflate',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(pushTokens.map(token => ({
              to: token,
              sound: 'default',
              title: '🚗 Yeni Rezervasyon Talebi',
              body: `${formData.firstName} ${formData.lastName} adlı kullanıcı ${vehicle.plate} aracı için rezervasyon talebi gönderdi.`,
              data: { type: 'request', vehiclePlate: vehicle.plate }
            })))
          });
        }
      } catch (e) {
        console.error("Bildirim gönderilirken hata:", e);
      }

      setSuccess(true);
      
    } catch (error) {
      console.error("Kayıt hatası:", error);
      alert("İşlem sırasında bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="glass-premium border border-[#D4AF37]/30 p-10 rounded-3xl text-center max-w-2xl mx-auto shadow-2xl shadow-[#D4AF37]/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/10 to-transparent pointer-events-none" />
        <div className="w-24 h-24 bg-gradient-to-br from-[#D4AF37]/20 to-[#AA7C11]/20 border border-[#D4AF37]/40 text-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-8 relative z-10 shadow-[0_0_30px_rgba(212,175,55,0.2)]">
          <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-4xl font-black mb-4 text-foreground relative z-10">Talebiniz Alındı!</h2>
        <p className="text-muted-foreground text-lg mb-8 relative z-10 leading-relaxed">
          Rezervasyon talebiniz başarıyla sistemimize iletildi. Müşteri temsilcilerimiz en kısa sürede sizinle iletişime geçecektir.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full relative z-10">
      <form onSubmit={handleSubmit} className="glass-premium p-8 md:p-10 rounded-3xl shadow-2xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 pb-6 border-b border-border">
          <h2 className="text-3xl font-black text-foreground tracking-wide mb-4 md:mb-0">Hızlı Rezervasyon</h2>
          {totalPrice > 0 ? (
            <div className="md:text-right bg-muted px-6 py-3 rounded-2xl border border-border">
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Toplam Tutar ({totalDays} Gün)</p>
              <p className="text-3xl font-bold text-[#D4AF37] drop-shadow-sm">₺{totalPrice.toLocaleString('tr-TR')}</p>
            </div>
          ) : vehicle.dailyPrice ? (
             <div className="md:text-right bg-muted px-6 py-3 rounded-2xl border border-border">
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Günlük Bedel</p>
              <p className="text-3xl font-bold text-[#D4AF37] drop-shadow-sm">₺{vehicle.dailyPrice}</p>
            </div>
          ) : (
            <div className="md:text-right bg-muted px-6 py-3 rounded-2xl border border-border">
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Toplam Tutar</p>
              <p className="text-xl font-bold text-foreground">Fiyat Alınız</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Sol Kolon: Tarihler */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-[#D4AF37] uppercase tracking-wider flex items-center gap-2">
              <span className="w-6 h-px bg-[#D4AF37]/50"></span> Tarih Seçimi
            </h3>
            <div className="space-y-6 mb-8">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 ml-1">Alış Tarihi ve Saati *</label>
                <div className="flex gap-2">
                  <input 
                    required
                    type="date" 
                    value={startDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setStartDate(e.target.value)}
                    onClick={(e) => { try { e.currentTarget.showPicker(); } catch(err) {} }}
                    className="w-2/3 bg-muted border border-border rounded-2xl px-5 py-4 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/50 transition-all text-foreground placeholder-muted-foreground/50 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                  />
                  <input 
                    required
                    type="time" 
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-1/3 bg-muted border border-border rounded-2xl px-5 py-4 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/50 transition-all text-foreground placeholder-muted-foreground/50"
                  />
                </div>
              </div>
              <div className="flex bg-muted border border-border rounded-2xl p-1 mb-6">
                <button
                  type="button"
                  onClick={() => setRentalType('daily')}
                  className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all ${rentalType === 'daily' ? 'bg-[#D4AF37] text-black shadow-lg' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  Günlük Kiralama
                </button>
                <button
                  type="button"
                  onClick={() => setRentalType('monthly')}
                  className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all ${rentalType === 'monthly' ? 'bg-[#D4AF37] text-black shadow-lg' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  Aylık Kiralama
                </button>
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 ml-1">Kiralama Süresi ({rentalType === 'daily' ? 'Gün' : 'Ay'}) *</label>
                <div className="flex gap-2">
                  <input 
                    required
                    type="number" 
                    min="1"
                    value={rentalDuration}
                    onChange={(e) => setRentalDuration(Number(e.target.value))}
                    className="w-2/3 bg-muted border border-border rounded-2xl px-5 py-4 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/50 transition-all text-foreground placeholder-muted-foreground/50"
                  />
                  <input 
                    required
                    type="time" 
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-1/3 bg-muted border border-border rounded-2xl px-5 py-4 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/50 transition-all text-foreground placeholder-muted-foreground/50"
                  />
                </div>
              </div>
              
              {endDate && (
                <div>
                  <label className="block text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-2 ml-1">İade Tarihi (Otomatik)</label>
                  <input 
                    readOnly
                    type="date" 
                    value={endDate}
                    className="w-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-2xl px-5 py-4 text-[#D4AF37] font-semibold opacity-80 cursor-not-allowed"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Sağ Kolon: Müşteri Bilgileri */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-[#D4AF37] uppercase tracking-wider flex items-center gap-2">
              <span className="w-6 h-px bg-[#D4AF37]/50"></span> Kişisel Bilgiler
            </h3>
            <div className="space-y-6 mb-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 ml-1">Adınız *</label>
                  <input 
                    required
                    type="text" 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full bg-muted border border-border rounded-2xl px-5 py-4 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/50 transition-all text-foreground placeholder-muted-foreground/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 ml-1">Soyadınız *</label>
                  <input 
                    required
                    type="text" 
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full bg-muted border border-border rounded-2xl px-5 py-4 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/50 transition-all text-foreground placeholder-muted-foreground/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 ml-1">Telefon *</label>
                  <input 
                    required
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    minLength={11}
                    maxLength={11}
                    placeholder="Örn: 05321234567"
                    className="w-full bg-muted border border-border rounded-2xl px-5 py-4 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/50 transition-all text-foreground placeholder-muted-foreground/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 ml-1">TC / Pasaport No *</label>
                  <input 
                    required
                    type="text" 
                    name="identityNumber"
                    value={formData.identityNumber}
                    onChange={handleInputChange}
                    className="w-full bg-muted border border-border rounded-2xl px-5 py-4 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/50 transition-all text-foreground placeholder-muted-foreground/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 ml-1">E-Posta Adresi *</label>
                  <input 
                    required
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-muted border border-border rounded-2xl px-5 py-4 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/50 transition-all text-foreground placeholder-muted-foreground/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 ml-1">Doğum Tarihi *</label>
                  <input 
                    required
                    type="date" 
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleInputChange}
                    className="w-full bg-muted border border-border rounded-2xl px-5 py-4 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/50 transition-all text-foreground placeholder-muted-foreground/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 ml-1">Ehliyet Sınıfı *</label>
                  <input 
                    required
                    type="text" 
                    name="licenseClass"
                    value={formData.licenseClass}
                    onChange={handleInputChange}
                    placeholder="Örn: B"
                    className="w-full bg-muted border border-border rounded-2xl px-5 py-4 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/50 transition-all text-foreground placeholder-muted-foreground/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 ml-1">Geçerlilik Tarihi *</label>
                  <input 
                    required
                    type="date" 
                    name="licenseExpiry"
                    value={formData.licenseExpiry}
                    onChange={handleInputChange}
                    className="w-full bg-muted border border-border rounded-2xl px-5 py-4 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/50 transition-all text-foreground placeholder-muted-foreground/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 ml-1">Ehliyet Verildiği İl/İlçe *</label>
                <input 
                  required
                  type="text" 
                  name="licenseCity"
                  value={formData.licenseCity}
                  onChange={handleInputChange}
                  placeholder="Örn: İzmir/Karşıyaka"
                  className="w-full bg-muted border border-border rounded-2xl px-5 py-4 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/50 transition-all text-foreground placeholder-muted-foreground/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 ml-1">Adres (Opsiyonel)</label>
                <textarea 
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full bg-muted border border-border rounded-2xl px-5 py-4 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/50 transition-all text-foreground placeholder-muted-foreground/50 resize-none"
                />
              </div>
            </div>
          </div>
        </div>

        <button 
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-black py-5 rounded-2xl font-black text-xl hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all disabled:opacity-50 disabled:hover:shadow-none hover:-translate-y-1 mt-4 tracking-wide uppercase"
        >
          {loading ? "İşleniyor..." : "Rezervasyon Talebini Gönder"}
        </button>
      </form>
    </div>
  );
}

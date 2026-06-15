"use client";

import { useState } from "react";
import { getVehicleCoverImage } from "@/utils/vehicleImage";
import Image from "next/image";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";

export default function ReservationClient({ vehicle }: { vehicle: any }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  // Dates
  const [startDate, setStartDate] = useState("");
  const [rentalType, setRentalType] = useState<'daily'|'monthly'>('daily');
  const [rentalDuration, setRentalDuration] = useState(1);
  
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
    const sDate = new Date(startDate);
    const eDate = new Date(sDate);
    
    if (rentalType === 'monthly') {
      eDate.setMonth(eDate.getMonth() + Number(rentalDuration));
    } else {
      eDate.setDate(eDate.getDate() + Number(rentalDuration));
    }
    endDate = eDate.toISOString().split('T')[0];
    
    const diffTime = Math.max(0, eDate.getTime() - sDate.getTime());
    totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // Eğer aynı gün seçilmişse en az 1 gün say
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
      alert("Lütfen başlangıç tarihini ve kiralama süresini seçiniz.");
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
        rentalType,
        rentalDuration,
        endDate,
        totalDays,
        dailyPrice: vehicle.dailyPrice || 0,
        monthlyPrice: vehicle.monthlyPrice || 0,
        totalPrice,
        status: "pending", // pending, approved, rejected
        createdAt: new Date().toISOString(),
      };

      await addDoc(collection(db, "rentalRequests"), requestData);
      
      setSuccess(true);
      alert("Rezervasyon talebiniz başarıyla alınmıştır!");
      
    } catch (error) {
      console.error("Kayıt hatası:", error);
      alert("İşlem sırasında bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-card border border-border p-8 rounded-2xl text-center max-w-2xl mx-auto">
        <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold mb-4">Talebiniz Alındı!</h2>
        <p className="text-muted-foreground mb-8">
          Rezervasyon talebiniz başarıyla sistemimize iletildi. Müşteri temsilcilerimiz en kısa sürede sizinle iletişime geçecektir.
        </p>
        <a href="/vehicles" className="bg-primary text-primary-foreground px-8 py-3 rounded-xl font-bold hover:bg-primary-hover transition-colors">
          Filoya Dön
        </a>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Sol Form */}
      <div className="lg:col-span-2">
        <form onSubmit={handleSubmit} className="bg-card border border-border p-6 md:p-8 rounded-2xl shadow-sm">
          <h2 className="text-2xl font-bold mb-6 border-b border-border pb-4">Kişisel Bilgileriniz</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">Adınız *</label>
              <input 
                required
                type="text" 
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-foreground"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">Soyadınız *</label>
              <input 
                required
                type="text" 
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-foreground"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">Telefon *</label>
              <input 
                required
                type="tel" 
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                minLength={11}
                maxLength={11}
                placeholder="Örn: 05321234567"
                className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-foreground"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">E-posta *</label>
              <input 
                required
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-foreground"
              />
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-muted-foreground mb-2">Doğum Tarihi *</label>
            <input 
              required
              type="date" 
              name="birthDate"
              value={formData.birthDate}
              onChange={handleInputChange}
              onClick={(e) => { try { e.currentTarget.showPicker(); } catch(err) {} }}
              className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-foreground [&::-webkit-calendar-picker-indicator]:cursor-pointer"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-muted-foreground mb-2">TC Kimlik / Pasaport No *</label>
            <input 
              required
              type="text" 
              name="identityNumber"
              value={formData.identityNumber}
              onChange={handleInputChange}
              className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-foreground"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">Ehliyet Sınıfı *</label>
              <input 
                required
                type="text" 
                name="licenseClass"
                value={formData.licenseClass}
                onChange={handleInputChange}
                placeholder="Örn: B"
                className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-foreground"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">Ehliyet Geçerlilik Tarihi *</label>
              <input 
                required
                type="date" 
                name="licenseExpiry"
                value={formData.licenseExpiry}
                onChange={handleInputChange}
                onClick={(e) => { try { e.currentTarget.showPicker(); } catch(err) {} }}
                className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-foreground [&::-webkit-calendar-picker-indicator]:cursor-pointer"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-muted-foreground mb-2">Ehliyet Verildiği İl/İlçe *</label>
            <input 
              required
              type="text" 
              name="licenseCity"
              value={formData.licenseCity}
              onChange={handleInputChange}
              placeholder="Örn: İzmir/Karşıyaka"
              className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-foreground"
            />
          </div>

          <div className="mb-8">
            <label className="block text-sm font-medium text-muted-foreground mb-2">Adres (Opsiyonel)</label>
            <textarea 
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              rows={3}
              className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-foreground resize-none"
            />
          </div>

          <h2 className="text-2xl font-bold mb-6 border-b border-border pb-4">Kiralama Tarihleri</h2>

          <div className="flex bg-muted/50 border border-border rounded-xl p-1 mb-6">
            <button
              type="button"
              onClick={() => setRentalType('daily')}
              className={`flex-1 py-3 px-4 rounded-lg text-sm font-bold transition-all ${rentalType === 'daily' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Günlük Kiralama
            </button>
            <button
              type="button"
              onClick={() => setRentalType('monthly')}
              className={`flex-1 py-3 px-4 rounded-lg text-sm font-bold transition-all ${rentalType === 'monthly' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Aylık Kiralama
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">Alış Tarihi *</label>
              <input 
                required
                type="date" 
                value={startDate}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setStartDate(e.target.value)}
                onClick={(e) => { try { e.currentTarget.showPicker(); } catch(err) {} }}
                className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-foreground [&::-webkit-calendar-picker-indicator]:cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">Kiralama Süresi ({rentalType === 'daily' ? 'Gün' : 'Ay'}) *</label>
              <input 
                required
                type="number" 
                min="1"
                value={rentalDuration}
                onChange={(e) => setRentalDuration(Number(e.target.value))}
                className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-foreground"
              />
            </div>
          </div>
          
          {endDate && (
            <div className="mb-8 p-4 bg-muted/50 rounded-xl border border-border">
              <label className="block text-sm font-medium text-muted-foreground mb-2">İade Tarihi (Otomatik)</label>
              <input 
                readOnly
                type="date" 
                value={endDate}
                className="w-full bg-transparent border-none px-0 py-1 font-bold text-lg text-primary focus:outline-none cursor-not-allowed"
              />
            </div>
          )}

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold text-lg hover:bg-primary-hover transition-colors shadow-lg disabled:opacity-70"
          >
            {loading ? "İşleniyor..." : "Rezervasyon Talebini Gönder"}
          </button>
        </form>
      </div>

      {/* Sağ Özet */}
      <div className="lg:col-span-1">
        <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden sticky top-24">
          <div className="relative h-48 w-full bg-muted">
            <Image 
              src={getVehicleCoverImage(vehicle)} 
              alt={vehicle.brand} 
              fill 
              className="object-cover"
            />
          </div>
          <div className="p-6">
            <h3 className="text-2xl font-bold mb-1">{vehicle.brand} {vehicle.model}</h3>
            <p className="text-muted-foreground mb-4">{vehicle.year} • {vehicle.fuelType} • {vehicle.transmission}</p>
            
            <div className="border-t border-border pt-4 mt-4">
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">Günlük Ücret</span>
                <span className="font-semibold">{vehicle.dailyPrice ? `₺${vehicle.dailyPrice}` : "Bilinmiyor"}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-muted-foreground">Kiralama Süresi</span>
                <span className="font-semibold">{totalDays} Gün</span>
              </div>
              
              <div className="border-t border-border pt-4 mt-2 flex justify-between items-center">
                <span className="font-bold text-lg">Toplam Tutar</span>
                <span className="font-bold text-2xl text-primary">
                  {totalPrice > 0 ? `₺${totalPrice.toLocaleString('tr-TR')}` : (vehicle.dailyPrice ? "₺0" : "Fiyat Alınız")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

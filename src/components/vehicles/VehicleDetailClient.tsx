"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Check, Calendar, Settings, Fuel, MessageCircle } from "lucide-react";
import { getVisibleVehicleImages, getVehicleCoverImage } from "@/utils/vehicleImage";
import ReservationForm from "./ReservationForm";

export default function VehicleDetailClient({ vehicle }: { vehicle: any }) {
  const [activeImage, setActiveImage] = useState(getVehicleCoverImage(vehicle));
  const images = getVisibleVehicleImages(vehicle);

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      
      {/* Back Button */}
      <div className="mb-8">
        <a href="/vehicles" className="text-white/60 hover:text-[#D4AF37] transition-colors flex items-center gap-2 w-fit group">
          <span className="transform group-hover:-translate-x-1 transition-transform">&larr;</span> Filoya Dön
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        
        {/* Left: Gallery */}
        <div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl overflow-hidden h-80 sm:h-[400px] md:h-[500px] relative mb-6 shadow-2xl shadow-black/50 border border-white/10"
          >
            <Image 
              src={activeImage} 
              alt={`${vehicle.brand} ${vehicle.model}`} 
              fill 
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
          </motion.div>
          
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {images.map((img: string, idx: number) => (
              <button 
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`relative w-28 h-28 rounded-xl overflow-hidden flex-shrink-0 transition-all duration-300 ${activeImage === img ? 'border-2 border-[#D4AF37] scale-105 shadow-lg shadow-[#D4AF37]/20' : 'border-2 border-transparent opacity-60 hover:opacity-100 hover:scale-105'}`}
              >
                <Image src={img} alt={`Thumbnail ${idx+1}`} fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Details & Action */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col justify-center"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-black px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase">
              {vehicle.status}
            </span>
            <span className="bg-white/5 border border-white/10 text-white/80 px-4 py-1.5 rounded-full text-sm font-medium tracking-wider">
              {vehicle.year}
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/60 drop-shadow-sm">{vehicle.brand}</h1>
          <h2 className="text-3xl font-light text-[#D4AF37] mb-10 tracking-wide">{vehicle.model}</h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-12 pb-12 border-b border-white/10">
            <div className="flex flex-col p-4 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-sm">
              <span className="flex items-center gap-2 text-white/50 text-xs tracking-wider uppercase mb-2"><Fuel className="w-4 h-4 text-[#D4AF37]" /> Yakıt Tipi</span>
              <span className="font-bold text-lg text-white">{vehicle.fuelType || "Belirtilmemiş"}</span>
            </div>
            <div className="flex flex-col p-4 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-sm">
              <span className="flex items-center gap-2 text-white/50 text-xs tracking-wider uppercase mb-2"><Settings className="w-4 h-4 text-[#D4AF37]" /> Vites</span>
              <span className="font-bold text-lg text-white">{vehicle.transmission || "Belirtilmemiş"}</span>
            </div>
            <div className="flex flex-col p-4 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-sm">
              <span className="flex items-center gap-2 text-white/50 text-xs tracking-wider uppercase mb-2"><Calendar className="w-4 h-4 text-[#D4AF37]" /> Üretim Yılı</span>
              <span className="font-bold text-lg text-white">{vehicle.year}</span>
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-xl font-bold mb-6 tracking-wide text-white">Araç Donanımı ve Özellikleri</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {vehicle.features && vehicle.features.length > 0 ? (
                vehicle.features.map((f: any, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-white/80">
                    <span className="bg-[#D4AF37]/20 p-1 rounded-full mt-0.5">
                      <Check className="w-3 h-3 text-[#D4AF37]" /> 
                    </span>
                    <span className="font-medium">{f.categoryName}: <span className="font-light text-white/60">{f.optionName}</span></span>
                  </li>
                ))
              ) : (
                <li className="text-white/40 italic">Özel donanım bilgisi girilmemiş.</li>
              )}
            </ul>
          </div>

          <div className="glass-premium border border-white/10 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#D4AF37] blur-[100px] opacity-20 rounded-full" />
            
            <div className="mb-8 relative z-10 flex flex-col gap-4">
              <div>
                <p className="text-sm text-white/50 tracking-widest uppercase mb-2">Günlük Kiralama Bedeli</p>
                {vehicle.dailyPrice ? (
                  <div className="flex items-end gap-2">
                    <span className="text-5xl font-black text-white drop-shadow-md">₺{vehicle.dailyPrice}</span>
                    <span className="text-white/50 pb-2 font-medium">/ gün</span>
                  </div>
                ) : (
                  <span className="text-3xl font-bold text-white/90">Fiyat Alınız</span>
                )}
              </div>
              
              {vehicle.monthlyPrice && (
                <div className="pt-4 border-t border-white/10">
                  <p className="text-sm text-white/50 tracking-widest uppercase mb-2">Aylık Kiralama Bedeli</p>
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-bold text-[#D4AF37] drop-shadow-md">₺{vehicle.monthlyPrice}</span>
                    <span className="text-white/50 pb-1 font-medium">/ ay</span>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex flex-col gap-4 relative z-10">
              <a 
                href={`https://wa.me/905453370837?text=${encodeURIComponent(`Merhaba Ege Motors, ${vehicle.brand} ${vehicle.model} (${vehicle.year}) aracını kiralamak için bilgi almak istiyorum. Görsel: ${activeImage}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-3 bg-[#25D366] text-white py-4 px-6 rounded-2xl font-bold text-lg hover:bg-[#20bd5a] transition-all shadow-lg shadow-[#25D366]/20 hover:shadow-[#25D366]/40 hover:-translate-y-1"
              >
                <MessageCircle className="w-6 h-6" /> WhatsApp ile Hızlı İletişim
              </a>

              <a 
                href="#reservation-form"
                className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-black py-4 px-6 rounded-2xl font-bold text-lg transition-all shadow-lg shadow-[#D4AF37]/20 hover:shadow-[#D4AF37]/40 hover:-translate-y-1"
              >
                <Calendar className="w-6 h-6" /> Şimdi Rezervasyon Yap
              </a>
            </div>
          </div>

        </motion.div>

      </div>

      <div className="mt-20 max-w-5xl mx-auto pt-16 relative" id="reservation-form">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-black mb-4 text-white">Rezervasyon Oluştur</h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">Sadece birkaç adımda hayalinizdeki aracı kiralayın. Premium hizmet ayrıcalığını yaşayın.</p>
        </div>
        <ReservationForm vehicle={vehicle} />
      </div>

    </div>
  );
}

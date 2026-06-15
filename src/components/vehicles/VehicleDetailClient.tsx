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
        <a href="/vehicles" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 w-fit group">
          <span className="transform group-hover:-translate-x-1 transition-transform">&larr;</span> Filoya Dön
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        
        {/* Left: Gallery */}
        <div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl overflow-hidden h-80 sm:h-[400px] md:h-[500px] relative mb-6 shadow-2xl shadow-black/10 border border-border"
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
                className={`relative w-28 h-28 rounded-2xl overflow-hidden flex-shrink-0 transition-all duration-300 ${activeImage === img ? 'border-2 border-primary scale-105 shadow-lg shadow-primary/20' : 'border-2 border-transparent opacity-60 hover:opacity-100 hover:scale-105'}`}
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
            <span className="bg-primary/10 text-primary border border-primary/20 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase">
              {vehicle.status}
            </span>
            <span className="bg-card border border-border text-muted-foreground px-4 py-1.5 rounded-full text-sm font-medium tracking-wider">
              {vehicle.year}
            </span>
          </div>

          <h1 className="font-display text-5xl sm:text-6xl mb-2 text-foreground">{vehicle.brand}</h1>
          <h2 className="font-display text-3xl font-light text-primary mb-10 tracking-wide">{vehicle.model}</h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-12 pb-12 border-b border-border">
            <div className="flex flex-col p-5 bg-card rounded-[1.5rem] border border-border hover:border-primary/30 transition-colors shadow-sm">
              <span className="flex items-center gap-2 text-muted-foreground text-xs tracking-wider uppercase mb-2"><Fuel className="w-4 h-4 text-primary" /> Yakıt Tipi</span>
              <span className="font-display text-xl text-foreground">{vehicle.fuelType || "Belirtilmemiş"}</span>
            </div>
            <div className="flex flex-col p-5 bg-card rounded-[1.5rem] border border-border hover:border-primary/30 transition-colors shadow-sm">
              <span className="flex items-center gap-2 text-muted-foreground text-xs tracking-wider uppercase mb-2"><Settings className="w-4 h-4 text-primary" /> Vites</span>
              <span className="font-display text-xl text-foreground">{vehicle.transmission || "Belirtilmemiş"}</span>
            </div>
            <div className="flex flex-col p-5 bg-card rounded-[1.5rem] border border-border hover:border-primary/30 transition-colors shadow-sm">
              <span className="flex items-center gap-2 text-muted-foreground text-xs tracking-wider uppercase mb-2"><Calendar className="w-4 h-4 text-primary" /> Üretim Yılı</span>
              <span className="font-display text-xl text-foreground">{vehicle.year}</span>
            </div>
          </div>

          <div className="mb-12">
            <h3 className="font-display text-2xl mb-6 text-foreground">Araç Donanımı ve Özellikleri</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {vehicle.features && vehicle.features.length > 0 ? (
                vehicle.features.map((f: any, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-foreground bg-card p-3 rounded-2xl border border-border shadow-sm">
                    <span className="bg-[#FDF9F1] p-1.5 rounded-xl text-primary shrink-0">
                      <Check className="w-4 h-4" /> 
                    </span>
                    <span className="font-medium flex-1 pt-1">{f.categoryName}: <span className="text-muted-foreground">{f.optionName}</span></span>
                  </li>
                ))
              ) : (
                <li className="text-muted-foreground italic bg-card p-4 rounded-2xl border border-border">Özel donanım bilgisi girilmemiş.</li>
              )}
            </ul>
          </div>

          <div className="bg-card p-8 rounded-[2rem] border border-border shadow-2xl shadow-primary/5 relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary/10 blur-3xl rounded-full pointer-events-none" />
            
            <div className="mb-8 relative z-10 flex flex-col gap-4">
              <div>
                <p className="eyebrow mb-2">Günlük Kiralama Bedeli</p>
                {vehicle.dailyPrice ? (
                  <div className="flex items-end gap-2">
                    <span className="font-display text-5xl text-foreground">₺{vehicle.dailyPrice}</span>
                    <span className="text-muted-foreground pb-2 font-medium">/ gün</span>
                  </div>
                ) : (
                  <span className="font-display text-3xl text-foreground">Fiyat Alınız</span>
                )}
              </div>
              
              {vehicle.monthlyPrice && (
                <div className="pt-4 border-t border-border">
                  <p className="eyebrow mb-2">Aylık Kiralama Bedeli</p>
                  <div className="flex items-end gap-2">
                    <span className="font-display text-4xl text-primary">₺{vehicle.monthlyPrice}</span>
                    <span className="text-muted-foreground pb-1 font-medium">/ ay</span>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex flex-col gap-4 relative z-10">
              <a 
                href={`https://wa.me/905453370837?text=${encodeURIComponent(`Merhaba Ege Motors, ${vehicle.brand} ${vehicle.model} (${vehicle.year}) aracını kiralamak için bilgi almak istiyorum. Görsel: ${activeImage}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-3 bg-card border border-[#25D366]/30 text-[#25D366] py-4 px-6 rounded-full font-semibold text-lg hover:bg-[#25D366]/10 transition-all shadow-sm"
              >
                <MessageCircle className="w-5 h-5" /> WhatsApp ile İletişim
              </a>

              <a 
                href="#reservation-form"
                className="w-full flex items-center justify-center gap-3 bg-primary text-primary-foreground py-4 px-6 rounded-full font-semibold text-lg hover:bg-primary-hover transition-all shadow-lg shadow-primary/20"
              >
                <Calendar className="w-5 h-5" /> Şimdi Rezervasyon Yap
              </a>
            </div>
          </div>

        </motion.div>

      </div>

      <div className="mt-20 max-w-5xl mx-auto pt-16 relative" id="reservation-form">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <div className="text-center mb-12">
          <span className="eyebrow mb-4 justify-center">Hızlı İşlem</span>
          <h2 className="font-display text-4xl sm:text-5xl text-foreground mb-4">Rezervasyon Oluştur</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Sadece birkaç adımda hayalinizdeki aracı kiralayın. Premium hizmet ayrıcalığını yaşayın.</p>
        </div>
        <ReservationForm vehicle={vehicle} />
      </div>

    </div>
  );
}

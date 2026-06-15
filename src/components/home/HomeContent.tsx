"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star, Shield, Car, CheckCircle, Phone, MapPin, Wrench, Scale, Truck, ShoppingBag } from "lucide-react";
import { getVehicleCoverImage } from "@/utils/vehicleImage";

export default function HomeContent({ availableVehicles }: { availableVehicles: any[] }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/hero-bg-v2.png" 
            alt="Ege Motors Premium Filo" 
            fill 
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/10" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* The actual Ege Motors text as an H1 for SEO, visually hidden or integrated nicely if the image has text. 
                Wait, the image HAS text now ("Ege Motors"), so we can keep H1 visually hidden for screen readers/SEO, 
                or just style it subtly. */}
            <h1 className="sr-only">
              Ege Motors - Lüks Araç ve Motosiklet Kiralama
            </h1>
            
            <div className="mt-[20vh]">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight drop-shadow-2xl text-white">
                Sınırları Aşan <span className="text-gradient">Lüks Deneyim</span>
              </h2>
              <p className="text-lg md:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto font-light drop-shadow-lg">
                kiralıkaracım.com ve kiralıkmotorsikletim güvencesiyle hayalinizdeki premium araca ulaşmak artık çok kolay.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/vehicles" 
                  className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary-hover transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
                >
                  Filomuzu Keşfet <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid Section (Mammotors Style) */}
      <section className="py-24 bg-background relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold mb-4"
            >
              Kapsamlı <span className="text-gradient">Hizmetlerimiz</span>
            </motion.h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Araç kiralamadan yedek parçaya, hukuki destekten yol yardıma kadar 360 derece hizmet sunuyoruz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ServiceCard 
              icon={<Car className="w-8 h-8" />} 
              title="Araç Kiralama" 
              desc="Lüks ve konforlu araç filomuzla hizmetinizdeyiz." 
              link="/services/car-rental"
            />
            <ServiceCard 
              icon={<Star className="w-8 h-8" />} 
              title="Motor Kiralama" 
              desc="Premium motosikletlerimizle rüzgarı hissedin." 
              link="/services/motorcycle-rental"
            />
            <ServiceCard 
              icon={<Scale className="w-8 h-8" />} 
              title="Avukat Hizmeti" 
              desc="Trafik kazaları ve hukuki süreçlerde uzman destek." 
              link="/services/legal-support"
            />
            <ServiceCard 
              icon={<Truck className="w-8 h-8" />} 
              title="7/24 Çekici & Yol Yardım" 
              desc="Nerede olursanız olun bir telefon kadar yakınız." 
              link="/services/roadside-assistance"
            />
            <ServiceCard 
              icon={<Wrench className="w-8 h-8" />} 
              title="Bakım ve Tamir" 
              desc="Uzman kadromuzla aracınız emin ellerde." 
              link="/services/maintenance"
            />
            <ServiceCard 
              icon={<ShoppingBag className="w-8 h-8" />} 
              title="Parça Satışı / Mağaza" 
              desc="Orijinal yedek parça ve aksesuarlar." 
              link="/store"
            />
          </div>
        </div>
      </section>

      {/* Available Vehicles Section */}
      <section className="py-24 relative overflow-hidden bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Hemen <span className="text-gradient">Kirala</span></h2>
              <p className="text-muted-foreground text-lg">Şu anda müsait olan popüler araçlarımız.</p>
            </div>
            <Link href="/vehicles" className="hidden md:flex items-center gap-2 text-primary hover:text-primary-hover font-medium">
              Tümünü Gör <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {availableVehicles.length > 0 ? (
              availableVehicles.slice(0, 3).map((vehicle) => (
                <motion.div 
                  key={vehicle.id}
                  whileHover={{ y: -10 }}
                  className="bg-background rounded-2xl overflow-hidden border border-border group"
                >
                  <div className="relative h-60 w-full bg-muted">
                    <Image 
                      src={getVehicleCoverImage(vehicle)} 
                      alt={`${vehicle.brand} ${vehicle.model}`} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      Müsait
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-1">{vehicle.brand} {vehicle.model}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{vehicle.year} • {vehicle.fuelType || "Belirtilmemiş"}</p>
                    <div className="flex justify-between items-center mt-6 pt-6 border-t border-border">
                      <div>
                        {vehicle.dailyRate ? (
                          <>
                            <span className="text-2xl font-bold text-foreground">₺{vehicle.dailyRate}</span>
                            <span className="text-muted-foreground text-sm"> / gün</span>
                          </>
                        ) : (
                          <span className="text-lg font-bold text-foreground">Fiyat Alınız</span>
                        )}
                      </div>
                      <Link 
                        href={`/vehicles/${vehicle.id}`}
                        className="bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground px-4 py-2 rounded-lg font-medium transition-colors"
                      >
                        İncele
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-3 text-center py-12 text-muted-foreground">
                Şu anda müsait araç bulunmuyor.
              </div>
            )}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Link href="/vehicles" className="inline-flex items-center gap-2 text-primary font-medium">
              Tümünü Gör <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>


    </div>
  );
}

function ServiceCard({ icon, title, desc, link }: { icon: React.ReactNode, title: string, desc: string, link: string }) {
  return (
    <Link href={link}>
      <motion.div 
        whileHover={{ y: -5 }}
        className="p-8 rounded-2xl bg-card border border-border flex flex-col items-center text-center group h-full transition-colors hover:border-primary/50"
      >
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground text-primary transition-colors">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-muted-foreground">{desc}</p>
      </motion.div>
    </Link>
  );
}

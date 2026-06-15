"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Car, Search, Filter } from "lucide-react";
// Using Bike instead of Motorcycle as it's available in all lucide-react versions
import { Bike } from "lucide-react";
import { getVehicleCoverImage } from "@/utils/vehicleImage";

export default function VehicleListClient({ initialVehicles }: { initialVehicles: any[] }) {
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [filterType, setFilterType] = useState<string>("All"); // All, Car, Motorcycle
  const [searchQuery, setSearchQuery] = useState("");

  const filteredVehicles = vehicles.filter((v) => {
    const matchesSearch = 
      v.brand?.toLowerCase().includes(searchQuery.toLowerCase()) || 
      v.model?.toLowerCase().includes(searchQuery.toLowerCase());
    
    // vehicleType: 0 = Motor, 1 = Araç
    // "şuanda hepsini motor olarak işaretleyeceksin" -> If undefined, treat as 0 (Motor)
    const vType = v.vehicleType === 1 ? "Car" : "Motorcycle"; 
    
    const matchesType = filterType === "All" ? true : vType === filterType;

    return matchesSearch && matchesType;
  });

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Marka veya model ara..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-card border border-border rounded-full py-3 pl-12 pr-4 focus:outline-none focus:border-primary transition-colors text-foreground"
          />
        </div>

        <div className="flex bg-card border border-border rounded-full p-1 w-full md:w-auto">
          <button 
            onClick={() => setFilterType("All")}
            className={`flex-1 md:flex-none px-6 py-2 rounded-full text-sm font-medium transition-colors ${filterType === "All" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            Tümü
          </button>
          <button 
            onClick={() => setFilterType("Car")}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2 rounded-full text-sm font-medium transition-colors ${filterType === "Car" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            <Car className="w-4 h-4" /> Araç
          </button>
          <button 
            onClick={() => setFilterType("Motorcycle")}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2 rounded-full text-sm font-medium transition-colors ${filterType === "Motorcycle" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            <Bike className="w-4 h-4" /> Motor
          </button>
        </div>
      </div>

      {/* Vehicle Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredVehicles.length > 0 ? (
          filteredVehicles.map((vehicle, index) => (
            <motion.div 
              key={vehicle.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-card rounded-2xl overflow-hidden border border-border group hover:border-primary/50 transition-colors"
            >
              <div className="relative h-64 w-full bg-muted">
                <Image 
                  src={getVehicleCoverImage(vehicle)} 
                  alt={`${vehicle.brand} ${vehicle.model}`} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                  {vehicle.status}
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-bold">{vehicle.brand} {vehicle.model}</h3>
                  <span className="text-sm font-medium bg-muted px-2 py-1 rounded text-muted-foreground">{vehicle.year}</span>
                </div>
                
                <div className="flex gap-4 mb-6 mt-4">
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">Yakıt</span>
                    <span className="text-sm font-medium">{vehicle.fuelType || "-"}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">Vites</span>
                    <span className="text-sm font-medium">{vehicle.transmission || "-"}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-6 pt-6 border-t border-border">
                  <div>
                    {vehicle.dailyPrice ? (
                      <>
                        <span className="text-2xl font-bold text-foreground">₺{vehicle.dailyPrice}</span>
                        <span className="text-muted-foreground text-sm"> / gün</span>
                      </>
                    ) : (
                      <span className="text-lg font-bold text-foreground">Fiyat Alınız</span>
                    )}
                  </div>
                  <Link 
                    href={`/vehicles/${vehicle.id}`}
                    className="bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground px-6 py-2 rounded-lg font-bold transition-colors"
                  >
                    İncele
                  </Link>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center py-24">
            <Filter className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-20" />
            <h3 className="text-xl font-bold mb-2">Araç Bulunamadı</h3>
            <p className="text-muted-foreground">Arama kriterlerinize uygun müsait araç bulunamadı.</p>
          </div>
        )}
      </div>
    </div>
  );
}

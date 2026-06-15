"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingBag, Filter, ChevronDown, MessageCircle, AlertCircle } from "lucide-react";

export default function StoreClient({ 
  initialItems, 
  categories 
}: { 
  initialItems: any[], 
  categories: string[] 
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Tümü");
  const [sortOption, setSortOption] = useState<string>("default");

  const filteredItems = useMemo(() => {
    let result = [...initialItems];

    // Filter by Category
    if (selectedCategory !== "Tümü") {
      result = result.filter(item => (item.category || "Aksesuar") === selectedCategory);
    }

    // Filter by Search Query
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      result = result.filter(item => 
        item.name?.toLowerCase().includes(q) || 
        item.description?.toLowerCase().includes(q)
      );
    }

    // Sort
    if (sortOption === "price-asc") {
      result.sort((a, b) => (a.salePrice || 0) - (b.salePrice || 0));
    } else if (sortOption === "price-desc") {
      result.sort((a, b) => (b.salePrice || 0) - (a.salePrice || 0));
    }

    return result;
  }, [initialItems, searchQuery, selectedCategory, sortOption]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar / Categories */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <div className="bg-card border border-border rounded-2xl p-6 sticky top-28">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Filter className="w-5 h-5 text-primary" />
              Kategoriler
            </h3>
            
            <div className="space-y-2">
              <button
                onClick={() => setSelectedCategory("Tümü")}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all font-medium ${
                  selectedCategory === "Tümü" 
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                  : "hover:bg-black/5 text-muted-foreground hover:text-foreground"
                }`}
              >
                Tüm Ürünler
                {selectedCategory === "Tümü" && <span className="float-right bg-white/20 px-2 py-0.5 rounded-full text-xs">{initialItems.length}</span>}
              </button>
              
              {categories.map((cat) => {
                const count = initialItems.filter(i => (i.category || "Aksesuar") === cat).length;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all font-medium flex justify-between items-center ${
                      selectedCategory === cat 
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                      : "hover:bg-black/5 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span>{cat}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${selectedCategory === cat ? "bg-white/20" : "bg-muted"}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          
          {/* Toolbar */}
          <div className="bg-card border border-border rounded-2xl p-4 mb-8 flex flex-col sm:flex-row gap-4 justify-between items-center">
            
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Ürün, parça veya aksesuar ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              />
            </div>

            <div className="relative w-full sm:w-auto min-w-[200px]">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="w-full appearance-none pl-4 pr-10 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all cursor-pointer font-medium"
              >
                <option value="default">Varsayılan Sıralama</option>
                <option value="price-asc">Fiyat: Düşükten Yükseğe</option>
                <option value="price-desc">Fiyat: Yüksekten Düşüğe</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
            </div>
            
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    key={item.id} 
                    className="bg-card rounded-2xl overflow-hidden border border-border group hover:border-primary/50 transition-colors flex flex-col h-full"
                  >
                    <div className="relative h-56 w-full bg-muted flex items-center justify-center p-6 overflow-hidden">
                      {item.imageUrl ? (
                        <Image 
                          src={item.imageUrl} 
                          alt={item.name} 
                          fill 
                          className="object-contain p-6 group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <ShoppingBag className="w-16 h-16 text-muted-foreground opacity-50" />
                      )}
                      
                      {/* Stock Badge Overlay */}
                      {(item.currentStock || 0) < 5 && (item.currentStock || 0) > 0 && (
                        <div className="absolute top-4 right-4 bg-orange-500/90 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> Son {item.currentStock} Ürün
                        </div>
                      )}
                    </div>
                    
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-1 rounded-md">
                          {item.category || "Aksesuar"}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-md font-medium ${
                          (item.currentStock || 0) > 0 ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                        }`}>
                          {(item.currentStock || 0) > 0 ? "Stokta Var" : "Tükendi"}
                        </span>
                      </div>
                      
                      <h3 className="text-lg font-bold mb-2 line-clamp-2 leading-tight" title={item.name}>{item.name}</h3>
                      
                      <div className="mt-auto pt-6">
                        <div className="flex justify-between items-end mb-4">
                          <div>
                            <span className="text-2xl font-bold text-foreground">₺{item.salePrice?.toLocaleString('tr-TR') || "---"}</span>
                            {/* İleride eski fiyat özelliği eklenebilir */}
                          </div>
                        </div>
                        
                        <a 
                          href={`https://wa.me/905453370837?text=${encodeURIComponent(`Merhaba, mağazanızdaki "${item.name}" adlı ürünü satın almak istiyorum.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full flex justify-center items-center gap-2 bg-[#25D366]/10 text-[#25D366] py-3 rounded-xl font-bold hover:bg-[#25D366] hover:text-white transition-all shadow-lg hover:shadow-[#25D366]/30"
                        >
                          <MessageCircle className="w-5 h-5" />
                          Satın Al
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full flex flex-col items-center justify-center text-center py-32 glass rounded-3xl border border-border"
                >
                  <ShoppingBag className="w-20 h-20 text-muted-foreground mb-6 opacity-30" />
                  <h3 className="text-2xl font-bold mb-2">Ürün Bulunamadı</h3>
                  <p className="text-lg text-muted-foreground max-w-md">
                    Seçtiğiniz kriterlere uygun ürün bulamadık. Farklı bir arama yapmayı veya kategoriyi değiştirmeyi deneyin.
                  </p>
                  <button 
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("Tümü");
                    }}
                    className="mt-8 text-primary font-medium hover:underline"
                  >
                    Filtreleri Temizle
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

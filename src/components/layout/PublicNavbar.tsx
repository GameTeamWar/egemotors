"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { LogIn, User, LogOut, Menu, Phone } from "lucide-react";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const PublicNavbar = () => {
  const { user, isLoading } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <nav className="fixed w-full z-50 glass top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-2xl font-bold text-gradient uppercase tracking-wider group-hover:scale-105 transition-transform">
                Ege Motors
              </span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/vehicles" className="text-sm font-medium hover:text-primary transition-colors">
              Araç ve Motor Kiralama
            </Link>
            <Link href="/store" className="text-sm font-medium hover:text-primary transition-colors">
              Mağaza
            </Link>
            <Link href="/hakkimizda" className="text-sm font-medium hover:text-primary transition-colors">
              Hakkımızda
            </Link>
            <Link href="/services/maintenance" className="text-sm font-medium hover:text-primary transition-colors">
              Bakım Servisi
            </Link>
            <Link 
              href="/services/roadside-assistance" 
              className="flex items-center gap-2 bg-red-600/10 text-red-500 hover:bg-red-600 hover:text-white px-4 py-2 rounded-full text-sm font-bold transition-all shadow-lg shadow-red-600/10 hover:shadow-red-600/20"
            >
              <Phone className="w-4 h-4 animate-pulse" />
              7/24 Yol Yardım
            </Link>
            
            <div className="flex items-center space-x-4 border-l border-border pl-8">
              {!isLoading && user && (
                <div className="flex items-center gap-4">
                  <Link href="/admin" className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
                    <User className="w-4 h-4" />
                    <span>Panel</span>
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-sm font-medium text-red-500 hover:text-red-400 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Çıkış</span>
                  </button>
                </div>
              )}
            </div>
          </div>
          
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-foreground hover:text-primary p-2"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden glass border-t border-white/10"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              <Link href="/vehicles" className="block px-3 py-3 rounded-md text-base font-medium hover:bg-white/5">
                Araç ve Motor Kiralama
              </Link>
              <Link href="/store" className="block px-3 py-3 rounded-md text-base font-medium hover:bg-white/5">
                Mağaza
              </Link>
              <Link href="/hakkimizda" className="block px-3 py-3 rounded-md text-base font-medium hover:bg-white/5">
                Hakkımızda
              </Link>
              <Link href="/services/maintenance" className="block px-3 py-3 rounded-md text-base font-medium hover:bg-white/5">
                Bakım Servisi
              </Link>
              <Link 
                href="/services/roadside-assistance" 
                className="flex items-center justify-center gap-2 bg-red-600/10 text-red-500 hover:bg-red-600 hover:text-white px-3 py-3 rounded-md text-base font-bold transition-all mt-2"
              >
                <Phone className="w-5 h-5 animate-pulse" />
                7/24 Yol Yardım
              </Link>
              
              <div className="mt-4 pt-4 border-t border-border">
                {!isLoading && user && (
                  <div className="space-y-1">
                    <Link href="/admin" className="block px-3 py-3 rounded-md text-base font-medium text-primary hover:bg-white/5">
                      Yönetim Paneli
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-3 rounded-md text-base font-medium text-red-500 hover:bg-white/5"
                    >
                      Çıkış Yap
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

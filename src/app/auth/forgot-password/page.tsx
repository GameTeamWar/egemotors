"use client";

import { useState } from "react";
import Link from "next/link";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Mail, Loader2, CheckCircle2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSuccess(false);
    setIsLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setIsSuccess(true);
    } catch (err: any) {
      setError("Bağlantı gönderilemedi. Lütfen e-posta adresinizi kontrol edin.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2 text-center text-foreground">Şifremi Unuttum</h2>
      <p className="text-muted-foreground text-center text-sm mb-6">
        E-posta adresinizi girin, size şifre sıfırlama bağlantısı gönderelim.
      </p>
      
      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-md mb-6 text-sm text-center">
          {error}
        </div>
      )}

      {isSuccess ? (
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <p className="text-green-500 font-medium">Bağlantı Gönderildi!</p>
          <p className="text-sm text-muted-foreground">
            {email} adresine şifre sıfırlama talimatlarını içeren bir e-posta gönderdik. Lütfen gelen kutunuzu kontrol edin.
          </p>
          <Link 
            href="/auth/login" 
            className="block w-full bg-primary text-primary-foreground py-2.5 rounded-lg font-semibold hover:bg-primary-hover transition-colors mt-6"
          >
            Giriş Sayfasına Dön
          </Link>
        </div>
      ) : (
        <form onSubmit={handleReset} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">E-posta Adresi</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-muted-foreground" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-foreground"
                placeholder="ornek@email.com"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-primary-foreground py-2.5 rounded-lg font-semibold hover:bg-primary-hover transition-colors flex justify-center items-center mt-2"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Bağlantı Gönder"}
          </button>
        </form>
      )}

      {!isSuccess && (
        <div className="mt-6 text-center text-sm text-muted-foreground">
          Şifrenizi hatırladınız mı?{" "}
          <Link href="/auth/login" className="text-primary hover:underline font-medium">
            Giriş Yapın
          </Link>
        </div>
      )}
    </div>
  );
}

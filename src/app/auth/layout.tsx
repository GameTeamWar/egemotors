import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px]" />
      
      <div className="absolute top-8 left-8 z-20">
        <Link href="/" className="flex items-center text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="w-5 h-5 mr-2" />
          <span>Ana Sayfaya Dön</span>
        </Link>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <Link href="/">
            <span className="text-3xl font-bold text-gradient uppercase tracking-wider block">
              Egemotor360
            </span>
          </Link>
        </div>
        
        <div className="glass p-8 rounded-2xl border border-border shadow-2xl">
          {children}
        </div>
      </div>
    </div>
  );
}

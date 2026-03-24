import { Navbar } from "@/components/Navbar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-[#ededff] text-foreground font-sans">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      
      {/* Optional Footer */}
      <footer className="mt-auto border-t py-8 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} FPL AI. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

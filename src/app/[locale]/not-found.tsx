import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, SearchX } from "lucide-react";
import { getLocale } from "next-intl/server";

export default async function NotFound() {
  const locale = await getLocale();
  const isEn = locale === "en";

  return (
    <main className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <section className="flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-lg">
          <div className="w-24 h-24 bg-orange-50 rounded-3xl flex items-center justify-center mx-auto mb-8">
            <SearchX className="w-12 h-12 text-[#ff6600]" />
          </div>
          <h1 className="text-6xl font-outfit font-black text-[#141534] mb-4">404</h1>
          <p className="text-slate-500 font-medium text-lg mb-10">
            {isEn
              ? "Page not found. The page you are looking for does not exist or has been moved."
              : "Página no encontrada. La página que buscas no existe o ha sido movida."}
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#141534] hover:bg-[#1c1d4a] text-white rounded-xl font-black uppercase text-xs tracking-widest transition-all shadow-lg"
          >
            <ArrowLeft className="w-4 h-4" />
            {isEn ? "Back to Home" : "Volver al Inicio"}
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}

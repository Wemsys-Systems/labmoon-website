import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Services from "@/components/Services";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { setRequestLocale, getTranslations } from 'next-intl/server';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ServiciosPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('ServiciosPage');

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <section className="pt-40 pb-10 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/5 blur-3xl rounded-full" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-outfit font-bold mb-6 text-[#141534]">
            {t('page_title')} <span className="text-[#ff6600]">{t('page_title_highlight')}</span>
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto font-medium text-lg mb-10">
            {t('page_subtitle')}
          </p>
        </div>
      </section>

      <div className="-mt-16">
        <Services />
      </div>

      <section className="py-20 bg-[#141534] text-center px-6">
        <h2 className="text-3xl font-bold text-white mb-6">{t('cta_heading')}</h2>
        <p className="text-slate-400 mb-10 max-w-lg mx-auto">
          {t('cta_description')}
        </p>
        <Link 
          href="/contacto" 
          className="inline-flex px-10 py-4 bg-[#ff6600] hover:bg-[#e65c00] text-white rounded-xl font-black uppercase text-xs tracking-widest transition-all items-center gap-3 shadow-lg shadow-orange-500/10 group"
        >
          {t('cta_button')} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </section>

      <Footer />
    </main>
  );
}

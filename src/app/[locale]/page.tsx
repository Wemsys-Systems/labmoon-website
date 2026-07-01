import { setRequestLocale, getTranslations } from 'next-intl/server';
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Footer from "@/components/Footer";
import { ShieldCheck, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('HomePage');

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <Hero />
      
      <Services />

      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="bg-[#141534] p-16 rounded-[3rem] shadow-2xl shadow-blue-900/20 relative overflow-hidden group">
             <div className="absolute -top-20 -right-20 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                <ShieldCheck className="w-96 h-96 text-[#ff6600]" />
             </div>
             
             <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                <div>
                   <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-[#ff6600] text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                     {t('trust_badge')}
                   </div>
                   <h2 className="text-4xl md:text-5xl font-outfit font-bold mb-8 text-white leading-tight">
                     {t('trust_heading')} <br /><span className="text-[#ff6600]">{t('trust_heading_highlight')}</span>
                   </h2>
                   <div className="space-y-6 text-slate-400 leading-relaxed font-medium">
                      <p>{t('trust_p1')}</p>
                      <p>{t('trust_p2')}</p>
                   </div>
                   
                   <Link href="/contacto" className="mt-12 px-10 py-4 bg-[#ff6600] hover:bg-[#e65c00] text-white rounded-xl font-black uppercase text-xs tracking-widest transition-all inline-flex items-center gap-3 shadow-lg shadow-orange-500/10 group/btn">
                     {t('trust_cta')} <ArrowRight className="w-5 h-5 text-white group-hover/btn:translate-x-1 transition-transform" />
                   </Link>
                </div>
                
             </div>
          </div>
        </div>
      </section>

      <section className="py-32 relative overflow-hidden bg-white">
        <div className="container mx-auto px-6 text-center">
           <h2 className="text-5xl md:text-7xl font-outfit font-bold mb-10 text-[#141534] leading-tight">
             {t('cta_heading')} <br /> {t('cta_heading_break')} <span className="text-[#ff6600]">{t('cta_heading_highlight')}</span>
           </h2>
           <p className="text-slate-500 mb-14 max-w-xl mx-auto font-medium text-lg">
             {t('cta_description')}
           </p>
           <button className="px-16 py-6 bg-[#141534] hover:bg-[#1c1d4a] text-white rounded-2xl font-black text-sm transition-all uppercase tracking-[0.3em] shadow-2xl shadow-blue-900/30 hover:scale-105 active:scale-95 group">
             {t('cta_button_start')} <span className="text-[#ff6600] group-hover:text-orange-400 transition-colors">{t('cta_button_highlight')}</span>
           </button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Cpu, Lock, Terminal, ShieldAlert } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { setRequestLocale, getTranslations } from 'next-intl/server';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const isEn = locale === 'en';
  return {
    title: isEn ? 'Forensic Analysis' : 'Análisis Forense',
    description: isEn ? 'Deep blockchain forensic analysis. Investigate suspicious transactions, smart contracts and wallet activity.' : 'Análisis forense blockchain en profundidad. Investigación de transacciones sospechosas, smart contracts y actividad de wallets.',
    alternates: {
      canonical: 'https://labmoon.eu/' + locale + '/servicios/analisis-forense',
      languages: {
        es: 'https://labmoon.eu/es/servicios/analisis-forense',
        en: 'https://labmoon.eu/en/servicios/analisis-forense',
      },
    },
  };
}

export default async function AnalisisForensePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('AnalisisForensePage');

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <section className="pt-40 pb-20 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-20 right-10 w-64 h-64 bg-orange-500/5 blur-[80px] rounded-full" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#141534]/5 border border-[#141534]/10 text-[#141534] text-xs font-black uppercase tracking-widest mb-6">
            <Cpu className="w-4 h-4" /> {t('badge')}
          </div>
          <h1 className="text-5xl md:text-7xl font-outfit font-bold mb-6 text-[#141534] leading-tight">
            {t('page_title')} <br /><span className="text-[#ff6600]">{t('page_title_break')}</span>
          </h1>
          <p className="text-slate-500 text-lg mb-10 leading-relaxed font-medium max-w-2xl mx-auto">
            {t('page_subtitle')}
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-[2rem] border border-slate-100 bg-white shadow-xl shadow-slate-200/50 hover:border-orange-200 transition-colors group">
              <div className="w-14 h-14 bg-[#141534] rounded-2xl flex items-center justify-center mb-6">
                <Terminal className="w-6 h-6 text-[#ff6600]" />
              </div>
              <h2 className="text-xl font-bold text-[#141534] mb-4">{t('feature_auditoria_title')}</h2>
               <p className="text-slate-500 font-medium leading-relaxed">
                 {t('feature_auditoria_desc')}
               </p>
             </div>

             <div className="p-8 rounded-[2rem] border border-slate-100 bg-white shadow-xl shadow-slate-200/50 hover:border-orange-200 transition-colors group">
               <div className="w-14 h-14 bg-[#141534] rounded-2xl flex items-center justify-center mb-6">
                 <Lock className="w-6 h-6 text-[#ff6600]" />
               </div>
               <h2 className="text-xl font-bold text-[#141534] mb-4">{t('feature_wallets_title')}</h2>
               <p className="text-slate-500 font-medium leading-relaxed">
                 {t('feature_wallets_desc')}
               </p>
             </div>

             <div className="p-8 rounded-[2rem] border border-slate-100 bg-white shadow-xl shadow-slate-200/50 hover:border-orange-200 transition-colors group">
               <div className="w-14 h-14 bg-[#141534] rounded-2xl flex items-center justify-center mb-6">
                 <ShieldAlert className="w-6 h-6 text-[#ff6600]" />
               </div>
               <h2 className="text-xl font-bold text-[#141534] mb-4">{t('feature_incidentes_title')}</h2>
              <p className="text-slate-500 font-medium leading-relaxed">
                {t('feature_incidentes_desc')}
              </p>
            </div>
          </div>

          <div className="mt-20 text-center">
             <Link href="/contacto" className="inline-flex px-12 py-5 bg-[#141534] hover:bg-[#1c1d4a] text-white rounded-2xl font-black uppercase text-sm tracking-widest transition-all shadow-xl shadow-blue-900/20">
               {t('cta_button')}
             </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

import { setRequestLocale, getTranslations } from 'next-intl/server';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Shield, Target, Users } from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const isEn = locale === 'en';
  return {
    title: isEn ? 'About Us' : 'Sobre Nosotros',
    description: isEn ? 'Meet Labmoon. European blockchain forensic experts dedicated to tracing digital assets and fighting crypto fraud.' : 'Conoce Labmoon. Expertos europeos en forensia blockchain dedicados al rastreo de activos digitales y la lucha contra el fraude crypto.',
    alternates: {
      canonical: 'https://labmoon.eu/' + locale + '/sobre-nosotros',
      languages: {
        es: 'https://labmoon.eu/es/sobre-nosotros',
        en: 'https://labmoon.eu/en/sobre-nosotros',
      },
    },
  };
}

export default async function SobreNosotrosPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('SobreNosotrosPage');

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 bg-[#141534] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#141534] via-transparent to-transparent"></div>
        
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 font-bold text-xs uppercase tracking-widest mb-6">
            {t('hero_badge')}
          </div>
          <h1 className="text-4xl md:text-6xl font-outfit font-black mb-6">
            {t('hero_title')} <span className="text-[#ff6600]">{t('hero_title_highlight')}</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 font-medium max-w-3xl mx-auto leading-relaxed">
            {t('hero_subtitle')}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
            <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 transition-transform hover:-translate-y-2">
              <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-[#ff6600]" />
              </div>
              <h2 className="text-2xl font-outfit font-bold text-[#141534] mb-4">{t('mision_title')}</h2>
               <p className="text-slate-500 font-medium leading-relaxed">
                 {t('mision_desc')}
               </p>
             </div>

             <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 transition-transform hover:-translate-y-2">
               <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                 <Shield className="w-7 h-7 text-blue-600" />
               </div>
               <h2 className="text-2xl font-outfit font-bold text-[#141534] mb-4">{t('vision_title')}</h2>
               <p className="text-slate-500 font-medium leading-relaxed">
                 {t('vision_desc')}
               </p>
             </div>

             <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 transition-transform hover:-translate-y-2">
               <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6">
                 <Users className="w-7 h-7 text-emerald-600" />
               </div>
               <h2 className="text-2xl font-outfit font-bold text-[#141534] mb-4">{t('equipo_title')}</h2>
              <p className="text-slate-500 font-medium leading-relaxed">
                {t('equipo_desc')}
              </p>
            </div>
          </div>

          <div className="bg-white p-10 md:p-16 rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-slate-100 text-center">
            <h2 className="text-3xl font-outfit font-bold text-[#141534] mb-6">{t('cta_title')}</h2>
            <p className="text-slate-500 font-medium mb-10 max-w-2xl mx-auto">
              {t('cta_desc')}
            </p>
            <a href="/contacto" className="inline-block px-8 py-4 bg-[#ff6600] hover:bg-[#e65c00] text-white font-black uppercase text-sm tracking-widest rounded-xl transition-all shadow-lg shadow-orange-500/20">
              {t('cta_button')}
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

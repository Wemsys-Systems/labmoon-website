import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Scale, Users, FileBarChart, Briefcase } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { setRequestLocale, getTranslations } from 'next-intl/server';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const isEn = locale === 'en';
  return {
    title: isEn ? 'Legal Advice' : 'Asesoría Legal',
    description: isEn ? 'Specialized legal advice on crypto assets, blockchain regulation and digital evidence for legal proceedings.' : 'Asesoría legal especializada en activos crypto, regulación blockchain y evidencia digital para procedimientos judiciales.',
    alternates: {
      canonical: 'https://labmoon.eu/' + locale + '/servicios/asesoria-legal',
      languages: {
        es: 'https://labmoon.eu/es/servicios/asesoria-legal',
        en: 'https://labmoon.eu/en/servicios/asesoria-legal',
      },
    },
  };
}

export default async function AsesoriaLegalPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('AsesoriaLegalPage');

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <section className="pt-40 pb-20 bg-[#141534] relative overflow-hidden text-white">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/10 blur-[100px] rounded-full" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#ff6600] text-xs font-black uppercase tracking-widest mb-6">
              <Scale className="w-4 h-4" /> {t('badge')}
            </div>
            <h1 className="text-5xl md:text-7xl font-outfit font-bold mb-6 leading-tight">
              {t('page_title')} <span className="text-[#ff6600]">{t('page_title_highlight')}</span>
            </h1>
            <p className="text-slate-400 text-lg mb-10 leading-relaxed font-medium">
              {t('page_subtitle')}
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16">
            <div className="space-y-12">
              <div className="flex gap-6">
                <div className="w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center shrink-0">
                  <Briefcase className="w-8 h-8 text-[#ff6600]" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#141534] mb-3">{t('feature_soporte_title')}</h2>
                   <p className="text-slate-500 font-medium leading-relaxed">{t('feature_soporte_desc')}</p>
                 </div>
               </div>
               
               <div className="flex gap-6">
                 <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0">
                   <Users className="w-8 h-8 text-[#141534]" />
                 </div>
                 <div>
                   <h2 className="text-2xl font-bold text-[#141534] mb-3">{t('feature_herencias_title')}</h2>
                   <p className="text-slate-500 font-medium leading-relaxed">{t('feature_herencias_desc')}</p>
                 </div>
               </div>

               <div className="flex gap-6">
                 <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center shrink-0">
                   <FileBarChart className="w-8 h-8 text-[#ff6600]" />
                 </div>
                 <div>
                   <h2 className="text-2xl font-bold text-[#141534] mb-3">{t('feature_valoracion_title')}</h2>
                  <p className="text-slate-500 font-medium leading-relaxed">{t('feature_valoracion_desc')}</p>
                </div>
              </div>
            </div>

            <div className="bg-[#141534] p-12 rounded-[3rem] text-center text-white flex flex-col justify-center relative overflow-hidden">
               <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_0%,rgba(255,102,0,0.1)_0%,transparent_50%)]" />
               <h2 className="text-3xl font-bold mb-6">{t('cta_box_title')}</h2>
               <p className="text-slate-400 mb-10 leading-relaxed font-medium">
                 {t('cta_box_desc')}
               </p>
               <Link href="/contacto" className="mx-auto inline-flex px-10 py-4 bg-[#ff6600] hover:bg-[#e65c00] text-white rounded-xl font-black uppercase text-xs tracking-widest transition-all shadow-lg shadow-orange-500/20">
                 {t('cta_box_button')}
               </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

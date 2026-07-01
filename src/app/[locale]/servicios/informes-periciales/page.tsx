import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FileCheck, Gavel, FileSignature, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { setRequestLocale, getTranslations } from 'next-intl/server';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function InformesPericialesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('InformesPericialesPage');

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <section className="pt-40 pb-20 bg-[#141534] relative overflow-hidden text-white">
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/10 blur-[120px] rounded-full" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#ff6600] text-xs font-black uppercase tracking-widest mb-6">
              <Gavel className="w-4 h-4" /> {t('badge')}
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
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="bg-[#141534] p-10 rounded-[3rem] shadow-2xl relative overflow-hidden text-white">
             <div className="absolute top-0 right-0 w-40 h-40 bg-[#ff6600]/20 blur-3xl" />
             <h3 className="text-3xl font-bold mb-8 relative z-10">{t('que_incluye_title')}</h3>
             <ul className="space-y-6 relative z-10">
                <li className="flex gap-4 items-start">
                   <FileCheck className="w-6 h-6 text-[#ff6600] shrink-0" />
                   <div>
                     <h5 className="font-bold mb-1">{t('incluye_descripcion_tecnica_title')}</h5>
                     <p className="text-slate-400 text-sm">{t('incluye_descripcion_tecnica_desc')}</p>
                   </div>
                </li>
                <li className="flex gap-4 items-start">
                   <FileSignature className="w-6 h-6 text-[#ff6600] shrink-0" />
                   <div>
                     <h5 className="font-bold mb-1">{t('incluye_evidencias_title')}</h5>
                     <p className="text-slate-400 text-sm">{t('incluye_evidencias_desc')}</p>
                   </div>
                </li>
                <li className="flex gap-4 items-start">
                   <Gavel className="w-6 h-6 text-[#ff6600] shrink-0" />
                   <div>
                     <h5 className="font-bold mb-1">{t('incluye_ratificacion_title')}</h5>
                     <p className="text-slate-400 text-sm">{t('incluye_ratificacion_desc')}</p>
                   </div>
                </li>
             </ul>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-[#141534] mb-8">{t('right_title')}</h2>
            <p className="text-slate-500 mb-6 font-medium leading-relaxed">
              {t('right_p1')}
            </p>
            <p className="text-slate-500 mb-8 font-medium leading-relaxed">
              {t('right_p2')}
            </p>
            
            <div className="flex flex-col gap-4">
              <Link href="/contacto" className="inline-flex px-8 py-4 bg-[#ff6600] hover:bg-[#e65c00] text-white rounded-xl font-bold uppercase text-xs tracking-widest transition-all items-center justify-center gap-3">
                {t('cta_button')} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

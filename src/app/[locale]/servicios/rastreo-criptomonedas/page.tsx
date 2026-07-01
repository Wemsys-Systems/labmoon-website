import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, Map, ShieldCheck, Eye } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { setRequestLocale, getTranslations } from 'next-intl/server';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function RastreoCriptoPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('RastreoCriptoPage');

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <section className="pt-40 pb-20 bg-[#141534] relative overflow-hidden text-white">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/10 blur-[100px] rounded-full" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#ff6600] text-xs font-black uppercase tracking-widest mb-6">
              <Search className="w-4 h-4" /> {t('badge')}
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
          <div>
            <h2 className="text-3xl font-bold text-[#141534] mb-8">{t('metodologia_title')}</h2>
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                  <Map className="w-6 h-6 text-[#ff6600]" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-[#141534] mb-2">{t('feature_trazabilidad_title')}</h4>
                  <p className="text-slate-500">{t('feature_trazabilidad_desc')}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                  <Eye className="w-6 h-6 text-[#141534]" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-[#141534] mb-2">{t('feature_clustering_title')}</h4>
                  <p className="text-slate-500">{t('feature_clustering_desc')}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-[#141534] mb-2">{t('feature_identificacion_title')}</h4>
                  <p className="text-slate-500">{t('feature_identificacion_desc')}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100 shadow-xl relative">
            <h3 className="text-2xl font-bold text-[#141534] mb-6">{t('sidebar_title')}</h3>
            <ul className="space-y-4 font-medium text-slate-600">
              <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-[#ff6600]" /> {t('sidebar_item1')}</li>
              <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-[#ff6600]" /> {t('sidebar_item2')}</li>
              <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-[#ff6600]" /> {t('sidebar_item3')}</li>
              <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-[#ff6600]" /> {t('sidebar_item4')}</li>
            </ul>
            <Link href="/contacto" className="mt-10 block w-full py-4 text-center bg-[#141534] hover:bg-[#ff6600] text-white rounded-xl font-bold transition-all shadow-lg">
              {t('sidebar_cta')}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

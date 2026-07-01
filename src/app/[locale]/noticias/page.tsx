import { setRequestLocale, getTranslations } from 'next-intl/server';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Newspaper, ExternalLink } from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function NoticiasPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('NoticiasPage');

  const noticias = [
    {
      source: t('noticia1_source'),
      title: t('noticia1_title'),
      date: t('noticia1_date'),
      excerpt: t('noticia1_excerpt'),
    },
    {
      source: t('noticia2_source'),
      title: t('noticia2_title'),
      date: t('noticia2_date'),
      excerpt: t('noticia2_excerpt'),
    }
  ];

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 font-bold text-xs uppercase tracking-widest mb-6">
            {t('hero_badge')}
          </div>
          <h1 className="text-4xl md:text-6xl font-outfit font-black text-[#141534] mb-6">
            {t('hero_title')}
          </h1>
          <p className="text-lg md:text-xl text-slate-500 font-medium max-w-2xl mx-auto">
            {t('hero_subtitle')}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 px-6 flex-grow">
        <div className="max-w-4xl mx-auto space-y-6">
          {noticias.map((noticia, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl shadow-lg shadow-slate-200/40 border border-slate-100 group transition-all hover:border-[#ff6600]/30">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-2 text-sm font-bold text-[#141534] uppercase tracking-widest">
                  <Newspaper className="w-4 h-4 text-[#ff6600]" />
                  {noticia.source}
                </div>
                <div className="text-xs text-slate-400 font-medium">
                  {noticia.date}
                </div>
              </div>
              
              <h2 className="text-xl md:text-2xl font-outfit font-bold text-[#141534] mb-3 group-hover:text-[#ff6600] transition-colors">
                {noticia.title}
              </h2>
              <p className="text-slate-500 font-medium leading-relaxed mb-6">
                {noticia.excerpt}
              </p>
              
              <a href="#" className="inline-flex items-center gap-2 text-sm font-bold text-[#ff6600] hover:text-[#e65c00] transition-colors">
                {t('leer_noticia')} <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}

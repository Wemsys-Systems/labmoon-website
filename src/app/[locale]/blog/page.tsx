import { setRequestLocale, getTranslations } from 'next-intl/server';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, ArrowRight } from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const isEn = locale === 'en';
  return {
    title: isEn ? 'Blog' : 'Blog',
    description: isEn ? 'Blockchain forensics blog. News, analysis and articles about cryptocurrency tracing, blockchain technology and crypto crime.' : 'Blog de forensia blockchain. Noticias, análisis y artículos sobre rastreo de criptomonedas, tecnología blockchain y crypto crimen.',
    alternates: {
      canonical: 'https://labmoon.eu/' + locale + '/blog',
      languages: {
        es: 'https://labmoon.eu/es/blog',
        en: 'https://labmoon.eu/en/blog',
      },
    },
  };
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('BlogPage');

  const posts = [
    {
      title: t('post1_title'),
      excerpt: t('post1_excerpt'),
      date: t('post1_date'),
      category: t('post1_category'),
      readTime: t('post1_read_time'),
    },
    {
      title: t('post2_title'),
      excerpt: t('post2_excerpt'),
      date: t('post2_date'),
      category: t('post2_category'),
      readTime: t('post2_read_time'),
    },
    {
      title: t('post3_title'),
      excerpt: t('post3_excerpt'),
      date: t('post3_date'),
      category: t('post3_category'),
      readTime: t('post3_read_time'),
    }
  ];

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-block px-4 py-1.5 rounded-full bg-orange-50 text-[#ff6600] font-bold text-xs uppercase tracking-widest mb-6">
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
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map((post, i) => (
              <article key={i} className="bg-white p-8 rounded-3xl shadow-lg shadow-slate-200/40 border border-slate-100 flex flex-col h-full group hover:-translate-y-1 transition-all">
                <div className="flex items-center justify-between mb-6">
                  <span className="px-3 py-1 bg-slate-50 text-slate-600 rounded-full text-xs font-bold uppercase tracking-wider">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                    <Calendar className="w-3.5 h-3.5" />
                    {post.date}
                  </div>
                </div>
                
                <h2 className="text-xl font-outfit font-bold text-[#141534] mb-4 group-hover:text-[#ff6600] transition-colors">
                  {post.title}
                </h2>
                <p className="text-slate-500 font-medium text-sm leading-relaxed mb-8 flex-grow">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between pt-6 border-t border-slate-50 mt-auto">
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">
                    {post.readTime} {t('read_time_suffix')}
                  </span>
                  <button className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-[#141534] group-hover:bg-[#ff6600] group-hover:text-white transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

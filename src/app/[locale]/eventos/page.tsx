import { setRequestLocale, getTranslations } from 'next-intl/server';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, Clock } from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function EventosPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('EventosPage');

  const eventos = [
    {
      title: t('evento1_title'),
      dateBox: { day: t('evento1_day'), month: t('evento1_month'), year: t('evento1_year') },
      time: t('evento1_time'),
      location: t('evento1_location'),
      type: t('evento1_type'),
      url: "https://inmocrypto.es/congreso/",
      description: t('evento1_description')
    },
    {
      title: t('evento2_title'),
      dateBox: { day: t('evento2_day'), month: t('evento2_month'), year: t('evento2_year') },
      time: t('evento2_time'),
      location: t('evento2_location'),
      type: t('evento2_type'),
      description: t('evento2_description')
    },
    {
      title: t('evento3_title'),
      dateBox: { day: t('evento3_day'), month: t('evento3_month'), year: t('evento3_year') },
      time: t('evento3_time'),
      location: t('evento3_location'),
      type: t('evento3_type'),
      description: t('evento3_description')
    }
  ];

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-block px-4 py-1.5 rounded-full bg-purple-50 text-purple-600 font-bold text-xs uppercase tracking-widest mb-6">
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
        <div className="max-w-4xl mx-auto space-y-8">
          {eventos.map((evento, i) => (
            <div key={i} className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/40 border border-slate-100 flex flex-col md:flex-row gap-8 items-start">
              <div className="w-full md:w-48 flex-shrink-0 bg-slate-50 rounded-3xl p-6 text-center">
                <div className="text-3xl font-black text-[#ff6600] mb-2">
                  {evento.dateBox.day}
                </div>
                <div className="text-sm font-bold text-[#141534] uppercase tracking-widest">
                  {evento.dateBox.month}
                </div>
                <div className="text-xs text-slate-400 mt-1 font-medium">
                  {evento.dateBox.year}
                </div>
              </div>

              <div className="flex-grow">
                <div className="flex items-center gap-3 mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${evento.type === 'Presencial' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'
                    }`}>
                    {evento.type}
                  </span>
                </div>
                <h2 className="text-2xl font-outfit font-bold text-[#141534] mb-4">
                  {evento.title}
                </h2>
                <p className="text-slate-500 font-medium leading-relaxed mb-6">
                  {evento.description}
                </p>

                <div className="flex flex-wrap gap-6 text-sm text-slate-600 font-medium">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#ff6600]" />
                    {evento.time}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#ff6600]" />
                    {evento.location}
                  </div>
                </div>

                {evento.url && (
                  <div className="mt-8">
                    <a 
                      href={evento.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-block px-6 py-3 bg-[#141534] hover:bg-[#ff6600] text-white text-sm uppercase tracking-widest font-bold rounded-xl transition-all shadow-lg shadow-orange-900/10"
                    >
                      {t('mas_informacion')}
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}

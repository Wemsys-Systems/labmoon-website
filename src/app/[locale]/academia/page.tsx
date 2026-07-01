import { setRequestLocale, getTranslations } from 'next-intl/server';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, Clock, Award, Lock } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Link } from "@/i18n/navigation";

export const revalidate = 60;

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Academia({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('AcademiaPage');

  const { data: courses } = await supabase
    .from("courses")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <section className="pt-40 pb-28">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <h1 className="text-5xl md:text-7xl font-outfit font-bold mb-6 text-[#141534]">
              {t('page_title')} <span className="text-[#ff6600]">{t('page_title_highlight')}</span>
            </h1>
            <p className="text-slate-500 max-w-2xl mx-auto font-medium text-lg">
              {t('page_subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {courses?.map((course) => (
              <div key={course.id} className="bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50 overflow-hidden flex flex-col group hover:border-orange-200 transition-all">
                <div className="h-56 bg-slate-50 flex items-center justify-center relative">
                  <div className="absolute top-6 right-6 bg-white shadow-lg px-4 py-1.5 rounded-full border border-slate-50 text-[10px] font-black uppercase tracking-widest text-[#141534]">
                    {course.category}
                  </div>
                  <BookOpen className="w-20 h-20 text-[#141534]/10 group-hover:scale-110 transition-transform group-hover:text-[#ff6600]/20" />
                </div>
                
                <div className="p-10 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-2xl font-bold leading-tight text-[#141534] group-hover:text-[#ff6600] transition-colors">
                      {course.title}
                    </h3>
                  </div>
                  <p className="text-slate-500 mb-8 flex-1 font-medium leading-relaxed">
                    {course.description}
                  </p>
                  
                  <div className="flex items-center gap-8 mb-10 text-[10px] text-slate-400 font-black uppercase tracking-widest">
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#ff6600]" /> {course.duration || t('course_duration_label')}
                    </span>
                    <span className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-[#ff6600]" /> {course.level}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-8 border-t border-slate-50">
                    <span className="text-3xl font-black text-[#141534]">{course.price}€</span>
                    <Link href={`/academia/${course.id}`} className="flex items-center gap-2 px-8 py-4 bg-[#141534] hover:bg-[#ff6600] text-white rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all shadow-lg shadow-blue-900/10 active:scale-95">
                      <Lock className="w-4 h-4" /> {t('course_acceder')}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Registration Prompt */}
          <div className="mt-28 bg-[#141534] p-16 rounded-[3rem] shadow-2xl shadow-blue-900/20 text-center relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full bg-orange-500/5 -z-10" />
             <h2 className="text-3xl font-bold mb-6 text-white">{t('cta_title')}</h2>
             <p className="text-slate-400 mb-10 font-medium text-lg">{t('cta_desc')}</p>
             <button className="px-10 py-4 bg-white hover:bg-slate-50 text-[#141534] rounded-xl font-black uppercase text-xs tracking-widest transition-all shadow-xl">
                {t('cta_button')}
             </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

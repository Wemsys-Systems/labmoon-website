import { setRequestLocale, getTranslations } from 'next-intl/server';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin, Send } from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Contacto({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('ContactoPage');

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <section className="pt-40 pb-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50 -z-10 rounded-l-[5rem]" />
        
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center md:text-left mb-20">
              <h1 className="text-5xl md:text-7xl font-outfit font-bold mb-6 text-[#141534]">
                {t('page_title')} <br /><span className="text-[#ff6600]">{t('page_title_highlight')}</span>
              </h1>
              <p className="text-slate-500 font-medium text-lg max-w-xl">
                {t('page_subtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-16 items-start">
              <div className="space-y-10">
                <div className="flex gap-6 items-start group">
                  <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center shrink-0 group-hover:bg-orange-100 transition-colors">
                    <Mail className="text-[#ff6600] w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-black text-xs uppercase tracking-widest text-slate-400 mb-2">{t('contact_email_label')}</h4>
                    <p className="text-lg font-bold text-[#141534]">{t('contact_email_value')}</p>
                  </div>
                </div>

                <div className="flex gap-6 items-start group">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors">
                    <Phone className="text-[#141534] w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-black text-xs uppercase tracking-widest text-slate-400 mb-2">{t('contact_telefono_label')}</h4>
                    <p className="text-lg font-bold text-[#141534]">{t('contact_telefono_value')}</p>
                  </div>
                </div>

                <div className="flex gap-6 items-start group">
                  <div className="w-14 h-14 rounded-2xl bg-rose-50 flex items-center justify-center shrink-0 group-hover:bg-rose-100 transition-colors">
                    <MapPin className="text-rose-500 w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-black text-xs uppercase tracking-widest text-slate-400 mb-2">{t('contact_ubicacion_label')}</h4>
                    <p className="text-lg font-bold text-[#141534]">{t('contact_ubicacion_value')}</p>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2 bg-white p-12 rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/50">
                <form className="space-y-8" action="/api/contact" method="POST">
                  <div className="grid sm:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">{t('form_label_nombre')}</label>
                      <input 
                        type="text" 
                        name="nombre"
                        placeholder={t('form_placeholder_nombre')}
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-[#ff6600] transition-colors text-[#141534] font-medium"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">{t('form_label_email')}</label>
                      <input 
                        type="email" 
                        name="email"
                        placeholder={t('form_placeholder_email')}
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-[#ff6600] transition-colors text-[#141534] font-medium"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">{t('form_label_tipo_incidencia')}</label>
                    <select name="tipo" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-[#ff6600] transition-colors text-slate-500 font-medium appearance-none">
                      <option value="">{t('form_select_default')}</option>
                      <option value="hackeo">{t('form_option_hackeo')}</option>
                      <option value="estafa">{t('form_option_estafa')}</option>
                      <option value="peritaje">{t('form_option_peritaje')}</option>
                      <option value="consultoria">{t('form_option_consultoria')}</option>
                    </select>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">{t('form_label_descripcion')}</label>
                    <textarea 
                      name="descripcion"
                      placeholder={t('form_placeholder_descripcion')}
                      rows={5}
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-[#ff6600] transition-colors text-[#141534] font-medium"
                    ></textarea>
                  </div>

                  <button type="submit" className="w-full py-5 bg-[#141534] hover:bg-[#1c1d4a] text-white rounded-2xl font-black uppercase text-xs tracking-[0.3em] transition-all flex items-center justify-center gap-4 shadow-xl shadow-blue-900/10 group">
                    {t('form_submit')} <Send className="w-5 h-5 text-[#ff6600] group-hover:translate-x-1 transition-transform" />
                  </button>

                  <p className="text-[10px] text-slate-400 text-center font-bold uppercase tracking-widest">
                    {t('form_confidencialidad')}
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

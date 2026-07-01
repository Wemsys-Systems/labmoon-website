"use client";

import { motion } from "framer-motion";
import { Search, ShieldAlert, Fingerprint, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

const Hero = () => {
  const t = useTranslations('Hero');

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-orange-500/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#141534]/5 blur-[120px] rounded-full" />

      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-[#ff6600] text-[10px] font-black uppercase tracking-widest mb-6">
            <ShieldAlert className="w-4 h-4" /> {t('badge')}
          </div>
          <h1 className="text-5xl md:text-7xl font-outfit font-bold leading-tight mb-6 text-[#141534]">
            {t('title_line1')} <br />
            <span className="text-[#ff6600]">{t('title_line2')}</span>
          </h1>
          <p className="text-lg text-slate-500 mb-8 max-w-lg leading-relaxed font-medium">
            {t('description')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-4 bg-[#ff6600] hover:bg-[#e65c00] text-white rounded-xl font-black uppercase text-sm tracking-widest transition-all flex items-center justify-center gap-3 shadow-lg shadow-orange-500/20 group">
              {t('cta_primary')}
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 bg-white hover:bg-slate-50 border border-slate-200 text-[#141534] rounded-xl font-bold transition-all shadow-sm">
              {t('cta_secondary')}
            </button>
          </div>

          <div className="mt-12 flex items-center gap-8 opacity-60">
             <div className="font-bold text-slate-400 text-[10px] tracking-widest uppercase">{t('investigate_label')}</div>
             <div className="flex gap-4 font-black text-xs text-[#141534]">BTC • ETH • SOL • BSC</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative hidden md:block"
        >
          <div className="relative z-10 glass rounded-3xl p-10 border-white glow-navy">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl" />
            
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm transition-transform hover:translate-x-2">
                <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center">
                  <Search className="text-[#ff6600]" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-black tracking-widest">{t('card_1_label')}</div>
                  <div className="text-sm font-bold text-[#141534]">{t('card_1_text')}</div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-5 rounded-2xl bg-[#141534] border border-white/5 shadow-xl translate-x-6">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                  <Fingerprint className="text-[#ff6600]" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-black tracking-widest">{t('card_2_label')}</div>
                  <div className="text-sm font-bold text-white">{t('card_2_text')}</div>
                </div>
              </div>

              <div className="h-32 w-full rounded-2xl bg-slate-50 border border-slate-100 flex items-end p-5">
                <div className="w-full space-y-3">
                   <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "85%" }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="h-full bg-[#ff6600]" 
                      />
                   </div>
                   <div className="flex justify-between text-[10px] text-slate-400 font-black uppercase tracking-widest">
                      <span>{t('analyzing_label')}</span>
                      <span className="text-[#ff6600]">{t('analyzing_percent')}</span>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

"use client";

import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { Mail } from "lucide-react";
import { useTranslations } from "next-intl";

const Footer = () => {
  const t = useTranslations('Footer');

  return (
    <footer className="bg-[#141534] pt-24 pb-12 text-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="space-y-8">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-white rounded-xl p-3 shadow-lg shadow-black/20 transition-transform group-hover:scale-105">
                <Image
                  src="/logo.png"
                  alt="Labmoon Logo"
                  width={160}
                  height={40}
                  className="h-10 w-auto object-contain"
                />
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed font-medium">
              {t('description')}
            </p>
            <div className="flex gap-4">
              <a href="https://x.com/InfoLabmoon" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#ff6600] hover:text-white transition-all border border-white/10 group" aria-label="X (Twitter)">
                <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              </a>
              <a href="https://www.instagram.com/labmoonblockchain/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#ff6600] hover:text-white transition-all border border-white/10 group" aria-label="Instagram">
                <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.805.249 2.227.412.56.216.96.474 1.38.894.42.42.678.82.894 1.38.163.422.358 1.057.412 2.227.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.249 1.805-.412 2.227-.216.56-.474.96-.894 1.38-.42.42-.82.678-1.38.894-.422.163-1.057.358-2.227.412-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.805-.249-2.227-.412-.56-.216-.96-.474-1.38-.894-.42-.42-.678-.82-.894-1.38-.163-.422-.358-1.057-.412-2.227-.058-1.266-.07-1.646-.07 4.85s.012-3.584.07-4.85c.054-1.17.249-1.805.412-2.227.216-.56.474-.96.894-1.38.42-.42.82-.678 1.38-.894.422-.163 1.057-.358 2.227-.412 1.266-.058 1.646-.07 4.85-.07m0-2.163c-3.259 0-3.667.014-4.947.072-1.277.057-2.149.259-2.912.556-.788.306-1.457.715-2.122 1.38-.665.665-1.074 1.334-1.38 2.122-.297.763-.499 1.635-.556 2.912-.058 1.28-.072 1.688-.072 4.947s.014 3.667.072 4.947c.057 1.277.259 2.148.556 2.912.306.788.715 1.457 1.38 2.122.665.665 1.334 1.074 2.122 1.38.763.297 1.635.499 2.912.556 1.28.058 1.688.072 4.947.072s3.667-.014 4.947-.072c1.277-.057 2.148-.259 2.912-.556.788-.306 1.457-.715 2.122-1.38.665-.665 1.074-1.334 1.38-2.122.297-.763.499-1.635.556-2.912.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.057-1.277-.259-2.149-.556-2.912-.306-.788-.715-1.457-1.38-2.122-.665-.665-1.334-1.074-2.122-1.38-.763-.297-1.635-.499-2.912-.556-1.28-.058-1.688-.072-4.947-.072z" /><path d="M12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162m0 10.162c-2.209 0-4-1.791-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4m6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
              </a>
              <a href="https://www.linkedin.com/company/moon-gf/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#ff6600] hover:text-white transition-all border border-white/10 group" aria-label="LinkedIn">
                <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-black mb-8 uppercase text-[10px] tracking-[0.2em] text-[#ff6600]">{t('services_title')}</h4>
            <ul className="space-y-5 text-sm text-slate-400 font-medium">
              <li><Link href="/servicios/asesoria-legal" className="hover:text-white transition-colors">{t('service_1')}</Link></li>
              <li><Link href="/servicios/rastreo-criptomonedas" className="hover:text-white transition-colors">{t('service_2')}</Link></li>
              <li><Link href="/servicios/analisis-forense" className="hover:text-white transition-colors">{t('service_3')}</Link></li>
              <li><Link href="/academia" className="hover:text-white transition-colors">{t('service_4')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black mb-8 uppercase text-[10px] tracking-[0.2em] text-[#ff6600]">{t('company_title')}</h4>
            <ul className="space-y-5 text-sm text-slate-400 font-medium">
              <li><Link href="/sobre-nosotros" className="hover:text-white transition-colors">{t('company_1')}</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">{t('company_2')}</Link></li>
              <li><Link href="/eventos" className="hover:text-white transition-colors">{t('company_3')}</Link></li>
              <li><Link href="/noticias" className="hover:text-white transition-colors">{t('company_4')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black mb-8 uppercase text-[10px] tracking-[0.2em] text-[#ff6600]">{t('contact_title')}</h4>
            <ul className="space-y-5 text-sm text-slate-400 font-medium">
              <li className="flex items-center gap-3 group cursor-pointer">
                <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                  <Mail className="w-4 h-4 text-[#ff6600]" />
                </div>
                info@labmoon.eu
              </li>
              <li className="mt-8">
                <Link href="/contacto" className="inline-block w-full text-center py-4 bg-[#ff6600] hover:bg-[#e65c00] rounded-xl transition-all font-black uppercase text-xs tracking-widest shadow-lg shadow-orange-500/10">
                  {t('contact_cta')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
            {t('copyright', { year: new Date().getFullYear() })}
          </div>
          <div className="flex flex-col md:items-end gap-4">
            <div className="flex flex-wrap gap-4 md:gap-8 text-[10px] text-slate-500 uppercase tracking-widest font-black">
              <Link href="/politicas-de-privacidad" className="hover:text-[#ff6600] transition-colors">{t('legal_1')}</Link>
              <Link href="/politicas-de-cookies" className="hover:text-[#ff6600] transition-colors">{t('legal_2')}</Link>
              <Link href="/condiciones-generales-de-uso" className="hover:text-[#ff6600] transition-colors">{t('legal_3')}</Link>
              <Link href="/politica-de-ejercicio-de-derechos" className="hover:text-[#ff6600] transition-colors">{t('legal_4')}</Link>
            </div>
            <div className="flex items-center gap-3 text-[10px] text-slate-400 uppercase tracking-widest font-bold">
              <span>{t('made_in')}</span>
              <div className="w-5 h-5 rounded-full overflow-hidden relative border border-white/10 bg-[#AA151B]">
                <div className="w-full h-1/3 absolute top-1/3 bg-[#F1BF00]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

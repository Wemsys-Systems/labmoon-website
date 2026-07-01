"use client";

import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { 
  Search, 
  FileCheck, 
  Cpu, 
  Scale, 
  ArrowRight,
  ShieldAlert,
  Map,
  Gavel,
  Briefcase
} from "lucide-react";
import { useTranslations } from "next-intl";

const Services = () => {
  const t = useTranslations('Services');

  const services = [
    {
      title: t('s1_title'),
      desc: t('s1_desc'),
      icon: <Search className="w-6 h-6 text-[#ff6600]" />,
      link: "/servicios/rastreo-criptomonedas"
    },
    {
      title: t('s2_title'),
      desc: t('s2_desc'),
      icon: <Gavel className="w-6 h-6 text-[#141534]" />,
      link: "/servicios/informes-periciales"
    },
    {
      title: t('s3_title'),
      desc: t('s3_desc'),
      icon: <Cpu className="w-6 h-6 text-[#ff6600]" />,
      link: "/servicios/analisis-forense"
    },
    {
      title: t('s4_title'),
      desc: t('s4_desc'),
      icon: <Scale className="w-6 h-6 text-[#141534]" />,
      link: "/servicios/asesoria-legal"
    },
    {
      title: t('s5_title'),
      desc: t('s5_desc'),
      icon: <ShieldAlert className="w-6 h-6 text-[#ff6600]" />,
      link: "/servicios/analisis-forense"
    },
    {
      title: t('s6_title'),
      desc: t('s6_desc'),
      icon: <Map className="w-6 h-6 text-[#141534]" />,
      link: "/servicios/rastreo-criptomonedas"
    },
    {
      title: t('s7_title'),
      desc: t('s7_desc'),
      icon: <FileCheck className="w-6 h-6 text-[#ff6600]" />,
      link: "/servicios/informes-periciales"
    },
    {
      title: t('s8_title'),
      desc: t('s8_desc'),
      icon: <Briefcase className="w-6 h-6 text-[#141534]" />,
      link: "/servicios/asesoria-legal",
    },
    {
      title: t('s9_title'),
      desc: t('s9_desc'),
      icon: <ShieldAlert className="w-6 h-6 text-[#ff6600]" />,
      link: "/servicios/compliance"
    }
  ];

  return (
    <section className="py-28 bg-white relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-outfit font-bold mb-6 text-[#141534]"
          >
            {t('heading')}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 max-w-2xl mx-auto font-medium"
          >
            {t('subheading')}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Link href={service.link} key={index} className="group h-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-10 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-orange-500/10 hover:border-orange-200 transition-all h-full flex flex-col"
              >
                <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center mb-8 group-hover:bg-orange-50 transition-colors shrink-0">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-[#141534] group-hover:text-[#ff6600] transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed font-medium mb-6 flex-1">
                  {service.desc}
                </p>
                
                <div className="flex items-center gap-2 text-[#ff6600] text-xs font-bold uppercase tracking-widest mt-auto opacity-0 group-hover:opacity-100 transition-opacity">
                  {t('view_more')} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

"use client";

import { useState, useEffect } from "react";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { Menu, X, ChevronRight } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslations } from "next-intl";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = useTranslations('Navbar');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t('servicios'), href: "/servicios" },
    { name: t('academia'), href: "/academia" },
    { name: t('saber_mas'), href: "/saber-mas" },
    { name: t('blog'), href: "/blog" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "py-3 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm" : "py-5 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-32 h-12 transition-transform group-hover:scale-105">
            <Image 
              src="/logo.png" 
              alt="Labmoon Logo" 
              fill
              className="object-contain object-left"
              priority
              unoptimized
            />
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <LanguageSwitcher />
          <div className="w-px h-5 bg-slate-200" />
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-slate-600 hover:text-[#ff6600] font-bold transition-colors text-xs uppercase tracking-widest"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/contacto"
            className="bg-[#ff6600] hover:bg-[#e65c00] text-white px-7 py-3 rounded-full font-black uppercase text-xs tracking-widest transition-all flex items-center gap-2 group shadow-lg shadow-orange-500/20"
          >
            {t('contacto')}
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <button
          className="md:hidden text-[#141534]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 bg-white border-b border-slate-100 p-8 md:hidden shadow-2xl"
        >
          <div className="flex flex-col gap-5">
            <div className="mb-2">
              <LanguageSwitcher />
            </div>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-slate-600 py-2 border-b border-slate-50 font-bold uppercase text-xs tracking-widest"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/contacto"
              className="bg-[#ff6600] text-white text-center py-4 rounded-xl font-black uppercase text-xs tracking-widest mt-4"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('contacto')}
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;

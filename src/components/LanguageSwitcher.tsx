"use client";

import { usePathname, useRouter } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import { useTransition } from 'react';
import { routing } from '@/i18n/routing';

const flags: Record<string, string> = {
  es: '🇪🇸',
  en: '🇬🇧',
};

const labels: Record<string, string> = {
  es: 'ES',
  en: 'EN',
};

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function switchLocale(nextLocale: string) {
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  }

  return (
    <div className="flex items-center gap-1">
      {routing.locales.map((loc) => {
        const isActive = loc === locale;
        return (
          <button
            key={loc}
            onClick={() => switchLocale(loc)}
            disabled={isActive || isPending}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${
              isActive
                ? 'bg-orange-100 text-[#ff6600] cursor-default'
                : 'text-slate-500 hover:text-[#ff6600] hover:bg-slate-100'
            }`}
            aria-label={loc === 'es' ? 'Español' : 'English'}
          >
            <span className="text-base leading-none">{flags[loc]}</span>
            <span>{labels[loc]}</span>
          </button>
        );
      })}
    </div>
  );
}

import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import CookieBanner from '../components/CookieBanner';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const defaultTitle = locale === 'en'
    ? 'Labmoon | Blockchain Forensics & Crypto Investigation'
    : 'Labmoon | Peritaje Blockchain y Análisis Forense Cripto';
  const defaultDescription = locale === 'en'
    ? 'Specialized firm in fraud investigation, cryptocurrency tracing, blockchain forensics and digital asset legal consulting in Spain and Europe.'
    : 'Firma especializada en investigación de fraudes, rastreo de criptomonedas, peritaje informático blockchain y consultoría legal para activos digitales en España y Europa.';
  const ogTitle = locale === 'en'
    ? 'Labmoon | Blockchain Forensics & Crypto Investigation'
    : 'Labmoon | Análisis Forense y Peritaje Blockchain';
  const ogDescription = locale === 'en'
    ? 'Discovering the truth in every block. European experts in digital asset tracing and forensic expert reports.'
    : 'Descubriendo la verdad en cada bloque. Expertos europeos en rastreo de activos digitales e informes periciales.';

  return {
    title: {
      template: '%s | Labmoon',
      default: defaultTitle,
    },
    description: defaultDescription,
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      locale: locale === 'en' ? 'en_EN' : 'es_ES',
      alternateLocale: locale === 'en' ? 'es_ES' : 'en_EN',
    },
    twitter: {
      title: ogTitle,
      description: ogDescription,
    },
    alternates: {
      canonical: `https://labmoon.eu/${locale}`,
      languages: {
        es: 'https://labmoon.eu/es',
        en: 'https://labmoon.eu/en',
      },
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,102,0,0.03)_0%,rgba(255,255,255,1)_100%)] -z-10" />
      {children}
      <CookieBanner />
    </NextIntlClientProvider>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

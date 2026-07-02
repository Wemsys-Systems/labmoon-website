import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import { setRequestLocale, getTranslations } from 'next-intl/server'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const isEn = locale === 'en';
  return {
    title: isEn ? 'Cookie Policy' : 'Política de Cookies',
    description: isEn ? 'Labmoon cookie policy. Information about the cookies we use and how to manage your preferences.' : 'Política de cookies de Labmoon. Información sobre las cookies que utilizamos y cómo gestionar tus preferencias.',
    alternates: {
      canonical: 'https://labmoon.eu/' + locale + '/politicas-de-cookies',
      languages: {
        es: 'https://labmoon.eu/es/politicas-de-cookies',
        en: 'https://labmoon.eu/en/politicas-de-cookies',
      },
    },
  };
}

export default async function PoliticasCookiesPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('PoliticaCookiesPage')

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white">
      <Navbar />

      <main className="flex-grow pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto bg-white p-10 md:p-16 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100">
          <h1 className="text-4xl md:text-5xl font-outfit font-bold text-[#141534] mb-10 pb-6 border-b border-slate-100">
            {t('page_title')}
          </h1>

          <div className="prose max-w-none text-slate-500 font-medium leading-relaxed space-y-6">

            <h2 className="text-2xl font-bold font-outfit text-[#141534] mt-12 mb-6">{t('section_objeto_title')}</h2>
            <p>{t('section_objeto_text')}</p>

            <h2 className="text-2xl font-bold font-outfit text-[#141534] mt-12 mb-6">{t('section_que_son_title')}</h2>
            <p>{t('section_que_son_p1')}</p>
            <p>{t('section_que_son_p2')}</p>
            <p>{t('section_que_son_p3')}</p>

            <h2 className="text-2xl font-bold font-outfit text-[#141534] mt-12 mb-6">{t('section_quien_usa_title')}</h2>
            <p>{t('section_quien_usa_p1')}</p>
            <p>{t('section_quien_usa_p2')}</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>{t('section_quien_usa_tercero1')}</li>
              <li>{t('section_quien_usa_tercero2')}</li>
            </ul>

            <h2 className="text-2xl font-bold font-outfit text-[#141534] mt-12 mb-6">{t('section_autorizacion_title')}</h2>
            <p>{t('section_autorizacion_p1')}</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>{t('section_autorizacion_item1')}</li>
              <li>{t('section_autorizacion_item2')}</li>
              <li>{t('section_autorizacion_item3')}</li>
            </ul>
            <p>{t('section_autorizacion_conclusion')}</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

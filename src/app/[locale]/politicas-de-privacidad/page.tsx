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
    title: isEn ? 'Privacy Policy' : 'Política de Privacidad',
    description: isEn ? 'Labmoon privacy policy. Information about how we collect, use and protect your personal data.' : 'Política de privacidad de Labmoon. Información sobre cómo recogemos, usamos y protegemos tus datos personales.',
    alternates: {
      canonical: 'https://labmoon.eu/' + locale + '/politicas-de-privacidad',
      languages: {
        es: 'https://labmoon.eu/es/politicas-de-privacidad',
        en: 'https://labmoon.eu/en/politicas-de-privacidad',
      },
    },
  };
}

export default async function PoliticaPrivacidadPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('PoliticaPrivacidadPage')

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white">
      <Navbar />

      <main className="flex-grow pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto bg-white p-10 md:p-16 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100">
          <h1 className="text-4xl md:text-5xl font-outfit font-bold text-[#141534] mb-10 pb-6 border-b border-slate-100">
            {t('page_title')}
          </h1>

          <div className="prose max-w-none text-slate-500 font-medium leading-relaxed space-y-6">

            <h2 className="text-2xl font-bold font-outfit text-[#141534] mt-12 mb-6">{t('section1_title')}</h2>
            <p>{t('section1_intro')}</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>{t('section1_item1')}</li>
              <li>{t('section1_item2')}</li>
              <li>{t('section1_item3')}</li>
            </ul>

            <h2 className="text-2xl font-bold font-outfit text-[#141534] mt-12 mb-6">{t('section2_title')}</h2>
            <p>{t('section2_text')}</p>

            <h2 className="text-2xl font-bold font-outfit text-[#141534] mt-12 mb-6">{t('section3_title')}</h2>
            <p>{t('section3_datos')}</p>
            <p>{t('section3_responsable')}</p>
            <p>{t('section3_encargado')}</p>
            <p>{t('section3_interesado')}</p>
            <p>{t('section3_divulgacion')}</p>
            <p>{t('section3_datos_confidenciales')}</p>
            <p>{t('section3_info_personal')}</p>
            <p>{t('section3_tratamiento')}</p>

            <h2 className="text-2xl font-bold font-outfit text-[#141534] mt-12 mb-6">{t('section4_title')}</h2>
            <p>{t('section4_intro')}</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>{t('section4_item1')}</li>
              <li>{t('section4_item2')}</li>
              <li>{t('section4_item3')}</li>
              <li>{t('section4_item4')}</li>
              <li>{t('section4_item5')}</li>
              <li>{t('section4_item6')}</li>
              <li>{t('section4_item7')}</li>
            </ul>

            <h2 className="text-2xl font-bold font-outfit text-[#141534] mt-12 mb-6">{t('section5_title')}</h2>
            <p>{t('section5_text')}</p>

            <h2 className="text-2xl font-bold font-outfit text-[#141534] mt-12 mb-6">{t('section6_title')}</h2>
            <p>{t('section6_text')}</p>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

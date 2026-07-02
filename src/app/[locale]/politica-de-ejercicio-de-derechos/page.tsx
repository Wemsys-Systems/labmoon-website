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
    title: isEn ? 'Rights Exercise Policy' : 'Política de Ejercicio de Derechos',
    description: isEn ? 'Exercise your data protection rights. Information on how to access, rectify or delete your personal data.' : 'Ejerce tus derechos de protección de datos. Información sobre cómo acceder, rectificar o eliminar tus datos personales.',
    alternates: {
      canonical: 'https://labmoon.eu/' + locale + '/politica-de-ejercicio-de-derechos',
      languages: {
        es: 'https://labmoon.eu/es/politica-de-ejercicio-de-derechos',
        en: 'https://labmoon.eu/en/politica-de-ejercicio-de-derechos',
      },
    },
  };
}

export default async function PoliticaDerechosPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('PoliticaDerechosPage')

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white">
      <Navbar />

      <main className="flex-grow pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto bg-white p-10 md:p-16 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100">
          <h1 className="text-4xl md:text-5xl font-outfit font-bold text-[#141534] mb-10 pb-6 border-b border-slate-100">
            {t('page_title')}
          </h1>

          <div className="prose max-w-none text-slate-500 font-medium leading-relaxed space-y-6">

            <p>{t('intro_parrafo')}</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>{t('derecho_acceso')}</li>
              <li>{t('derecho_supresion')}</li>
              <li>{t('derecho_rectificacion')}</li>
              <li>{t('derecho_limitacion')}</li>
              <li>{t('derecho_portabilidad')}</li>
              <li>{t('derecho_oposicion')}</li>
              <li>{t('derecho_no_automatizadas')}</li>
            </ul>

            <p>{t('intro_responsabilidad')}</p>

            <h2 className="text-2xl font-bold font-outfit text-[#141534] mt-12 mb-6">{t('section_solicitantes_title')}</h2>
            <p>{t('section_solicitantes_text')}</p>

            <h2 className="text-2xl font-bold font-outfit text-[#141534] mt-12 mb-6">{t('section_procedimiento_title')}</h2>
            <p>{t('section_procedimiento_p1')}</p>

            <p>{t('section_procedimiento_intro')}</p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>{t('procedimiento_paso1')}</li>
              <li>{t('procedimiento_paso2')}</li>
              <li>{t('procedimiento_paso3')}</li>
            </ol>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

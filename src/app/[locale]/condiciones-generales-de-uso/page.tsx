import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import { setRequestLocale, getTranslations } from 'next-intl/server'

type Props = {
  params: Promise<{ locale: string }>
}

export default async function CondicionesDeUsoPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('CondicionesUsoPage')

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
            <p>{t('section1_p1')}</p>
            <p>{t('section1_p2')}</p>
            <p>{t('section1_p3')}</p>
            <p>{t('section1_p4')}</p>
            <p>{t('section1_p5')}</p>
            <p>{t('section1_p6')}</p>

            <h2 className="text-2xl font-bold font-outfit text-[#141534] mt-12 mb-6">{t('section2_title')}</h2>
            <p>{t('section2_p1')}</p>
            <p>{t('section2_p2')}</p>

            <h2 className="text-2xl font-bold font-outfit text-[#141534] mt-12 mb-6">{t('section3_title')}</h2>
            <p>{t('section3_p1')}</p>
            <p>{t('section3_p2')}</p>

            <h2 className="text-2xl font-bold font-outfit text-[#141534] mt-12 mb-6">{t('section4_title')}</h2>
            <p>{t('section4_text')}</p>

            <h2 className="text-2xl font-bold font-outfit text-[#141534] mt-12 mb-6">{t('section5_title')}</h2>
            <p>{t('section5_text')}</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

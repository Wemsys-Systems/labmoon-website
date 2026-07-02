import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, BookOpen, Clock, Lock } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 60;

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const isEn = locale === 'en';
  return {
    title: isEn ? 'Course' : 'Curso',
    description: isEn ? 'Blockchain and cryptocurrency course. Expert training in blockchain forensics and crypto analysis.' : 'Curso de blockchain y criptomonedas. Formación experta en forensia blockchain y análisis crypto.',
    alternates: {
      canonical: 'https://labmoon.eu/' + locale + '/academia',
      languages: {
        es: 'https://labmoon.eu/es/academia',
        en: 'https://labmoon.eu/en/academia',
      },
    },
  };
}

export default async function CourseViewer({ params, searchParams }: { params: Promise<{ id: string }>, searchParams: Promise<{ [key: string]: string | undefined }> }) {
  const { id } = await params;
  const { modulo } = await searchParams;

  const { data: course, error } = await supabase
    .from("courses")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-800 p-8 text-center flex-col gap-4">
        <h1 className="text-2xl font-bold text-rose-500">Error al cargar el curso</h1>
        <p>ID Buscado: {id}</p>
        <p className="font-mono text-sm bg-rose-50 p-4 rounded-lg border border-rose-200">
          {error?.message || "El curso no existe en la base de datos o RLS está bloqueando la lectura."}
        </p>
      </div>
    );
  }

  const moduleIndex = parseInt(modulo || "0", 10);
  const modules = course.modules || [];
  const hasModules = modules.length > 0;
  
  const currentModule = hasModules ? modules[moduleIndex] : null;
  const currentPath = currentModule ? currentModule.path : course.content_path;
  const currentTitle = currentModule ? currentModule.title : course.title;

  // Descargar el contenido directamente para evitar problemas de Content-Type y renderizarlo seguro
  let htmlContent = "";
  if (currentPath) {
    const { data: fileBlob } = await supabase.storage
      .from("courses-content")
      .download(currentPath);
      
    if (fileBlob) {
      htmlContent = await fileBlob.text();
    }
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      
      <div className="pt-32 pb-12 bg-white border-b border-slate-100">
        <div className="container mx-auto px-6 max-w-6xl">
          <Link href="/academia" className="inline-flex items-center gap-2 text-slate-500 hover:text-[#ff6600] font-bold text-sm mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Volver a la Academia
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-block px-4 py-1.5 bg-orange-50 border border-orange-100 rounded-full text-[10px] font-black uppercase tracking-widest text-[#ff6600] mb-4">
                {course.category}
              </div>
              <h1 className="text-3xl md:text-5xl font-outfit font-bold text-[#141534] mb-4">
                {course.title}
              </h1>
              <div className="flex items-center gap-6 text-sm text-slate-500 font-medium">
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#ff6600]" /> {course.duration || 'N/A'}
                </span>
                <span className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#ff6600]" /> Nivel {course.level}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-7xl py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Barra lateral de módulos (solo si hay módulos) */}
          {hasModules && (
            <div className="w-full lg:w-1/4">
              <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 p-6 sticky top-8">
                <h3 className="font-bold text-lg text-[#141534] mb-4">Contenido del Curso</h3>
                <div className="space-y-2">
                  {modules.map((mod: any, index: number) => (
                    <Link 
                      key={index} 
                      href={`/academia/${course.id}?modulo=${index}`}
                      className={`block p-4 rounded-xl border transition-all ${
                        index === moduleIndex 
                          ? 'bg-orange-50 border-orange-200 text-[#ff6600]' 
                          : 'bg-slate-50 border-transparent text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <div className="text-xs font-bold uppercase tracking-wider mb-1 opacity-70">
                        Módulo {index + 1}
                      </div>
                      <div className="font-medium text-sm">
                        {mod.title}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Visor principal */}
          <div className={`w-full ${hasModules ? 'lg:w-3/4' : ''}`}>
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden relative min-h-[600px] flex flex-col">
              {/* Mockup viewer header */}
              <div className="bg-slate-100 border-b border-slate-200 p-4 flex items-center justify-between">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-400"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                </div>
                <div className="text-sm font-bold text-[#141534] truncate px-4">
                  {currentTitle}
                </div>
                <div className="text-xs font-bold text-slate-400 flex items-center gap-2">
                  <Lock className="w-3 h-3" /> PROTEGIDO
                </div>
              </div>
              
              {/* Iframe content */}
              <div className="w-full flex-1 min-h-[800px] bg-slate-50 relative">
                {htmlContent ? (
                  <iframe 
                    srcDoc={htmlContent} 
                    className="w-full h-full border-none bg-white absolute inset-0"
                    sandbox="allow-scripts allow-same-origin"
                    title={`Módulo: ${currentTitle}`}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center flex-col gap-4 text-slate-400">
                    <Lock className="w-12 h-12 text-slate-300" />
                    <p className="font-medium">No se pudo cargar el contenido del módulo.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
        </div>
      </div>

      <Footer />
    </main>
  );
}

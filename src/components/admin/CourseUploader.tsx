"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Upload, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

interface Module {
  id: number;
  title: string;
  file: File | null;
  existingPath?: string;
}

interface Course {
  id?: number;
  title: string;
  description: string;
  duration: string;
  price: number;
  level: string;
  category: string;
  content_path: string;
  modules: { title: string; path: string }[];
  is_published: boolean;
}

const CourseUploader = ({ courseToEdit, onSuccess }: { courseToEdit?: Course | null, onSuccess?: () => void }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [modules, setModules] = useState<Module[]>(() => {
    if (courseToEdit?.modules && courseToEdit.modules.length > 0) {
      return courseToEdit.modules.map((m: { title: string; path: string }, i: number) => ({ id: i + 1, title: m.title, file: null, existingPath: m.path }));
    } else if (courseToEdit?.content_path) {
      return [{ id: 1, title: "Módulo 1", file: null, existingPath: courseToEdit.content_path }];
    }
    return [{ id: 1, title: "Módulo 1", file: null }];
  });
  
  const [formData, setFormData] = useState({
    title: courseToEdit?.title || "",
    description: courseToEdit?.description || "",
    duration: courseToEdit?.duration || "20h",
    price: courseToEdit?.price?.toString() || "",
    level: courseToEdit?.level || "Básico",
    category: courseToEdit?.category || "Legal"
  });

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    const invalidModules = modules.some(m => (!m.file && !m.existingPath) || !m.title.trim());
    if (invalidModules) {
      setError("Todos los módulos deben tener un título y un archivo asignado (o mantener el existente).");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Subir archivos nuevos y conservar los existentes
      const uploadedModules = await Promise.all(
        modules.map(async (mod) => {
          if (mod.file) {
            const fileExt = mod.file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `raw/${fileName}`;

            const { error: uploadError } = await supabase.storage
              .from('courses-content')
              .upload(filePath, mod.file, {
                contentType: 'text/html',
                cacheControl: '3600',
                upsert: false
              });

            if (uploadError) throw uploadError;
            return { title: mod.title, path: filePath };
          } else if (mod.existingPath) {
            return { title: mod.title, path: mod.existingPath };
          }
          throw new Error("Archivo faltante en el módulo");
        })
      );

      const courseData = {
        title: formData.title,
        description: formData.description,
        duration: formData.duration,
        price: parseFloat(formData.price),
        level: formData.level,
        category: formData.category,
        content_path: uploadedModules[0]?.path || '', 
        modules: uploadedModules, 
        is_published: courseToEdit ? courseToEdit.is_published : true
      };

      if (courseToEdit) {
        const { error: dbError } = await supabase
          .from('courses')
          .update(courseData)
          .eq('id', courseToEdit.id);
        if (dbError) throw dbError;
      } else {
        const { error: dbError } = await supabase
          .from('courses')
          .insert([courseData]);
        if (dbError) throw dbError;
      }

      setSuccess(true);
      if (onSuccess) onSuccess();
      
      if (!courseToEdit) {
        setFormData({ title: "", description: "", duration: "20h", price: "", level: "Básico", category: "Legal" });
        setModules([{ id: 1, title: "Módulo 1", file: null }]);
      }

    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error al subir el curso";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-[#141534]">
        <Upload className="text-[#ff6600]" /> {courseToEdit ? "Editar Curso" : "Crear Nuevo Curso"}
      </h2>

      {success && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center gap-3 text-emerald-700 text-sm font-bold">
          <CheckCircle className="w-5 h-5" /> ¡Curso subido y publicado con éxito!
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-xl flex items-center gap-3 text-rose-700 text-sm font-bold">
          <AlertCircle className="w-5 h-5" /> {error}
        </div>
      )}

      <form onSubmit={handleUpload} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-slate-400 ml-1">Título del Curso</label>
            <input 
              required
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-orange-500 text-slate-700 transition-colors"
              placeholder="Ej: Análisis Forense BTC"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-slate-400 ml-1">Precio (€)</label>
            <input 
              required
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-orange-500 text-slate-700 transition-colors"
              placeholder="199"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-slate-400 ml-1">Duración</label>
            <input 
              required
              type="text"
              value={formData.duration}
              onChange={(e) => setFormData({...formData, duration: e.target.value})}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-orange-500 text-slate-700 transition-colors"
              placeholder="Ej: 20h"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-slate-400 ml-1">Descripción Breve</label>
            <input 
              required
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-orange-500 text-slate-700 transition-colors"
              placeholder="Ej: Aprende las bases legales..."
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-slate-400 ml-1">Nivel</label>
            <select 
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-orange-500 text-slate-500 transition-colors"
              value={formData.level}
              onChange={(e) => setFormData({...formData, level: e.target.value})}
            >
              <option>Básico</option>
              <option>Intermedio</option>
              <option>Avanzado</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-slate-400 ml-1">Categoría</label>
            <select 
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-orange-500 text-slate-500 transition-colors"
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
            >
              <option>Legal</option>
              <option>Técnico</option>
              <option>Investigación</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase text-slate-400 ml-1">Módulos del Curso</label>
            <button 
              type="button"
              onClick={() => setModules([...modules, { id: Date.now(), title: `Módulo ${modules.length + 1}`, file: null }])}
              className="text-xs font-bold text-[#ff6600] hover:text-orange-700 bg-orange-50 px-3 py-1 rounded-lg transition-colors"
            >
              + Añadir Módulo
            </button>
          </div>
          
          <div className="space-y-4">
            {modules.map((mod, index) => (
              <div key={mod.id} className="p-5 border border-slate-200 rounded-2xl bg-slate-50/50 flex flex-col md:flex-row gap-4 items-center">
                <input 
                  required
                  type="text"
                  value={mod.title}
                  onChange={(e) => {
                    const newMods = [...modules];
                    newMods[index].title = e.target.value;
                    setModules(newMods);
                  }}
                  className="w-full md:w-1/3 bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-orange-500 text-slate-700 transition-colors"
                  placeholder="Título del Módulo"
                />
                
                <div className="flex-1 w-full relative border-2 border-dashed border-slate-200 rounded-xl p-3 text-center hover:border-orange-400 transition-all bg-white overflow-hidden cursor-pointer">
                  <input 
                    type="file" 
                    accept=".html"
                    onChange={(e) => {
                      const newMods = [...modules];
                      newMods[index].file = e.target.files?.[0] || null;
                      setModules(newMods);
                    }}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  <div className="flex items-center justify-center gap-2 text-slate-500 font-medium text-sm">
                    <Upload className="w-5 h-5 text-slate-400" />
                    <span className="truncate">
                      {mod.file ? mod.file.name : mod.existingPath ? "Mantener archivo actual" : "Seleccionar archivo .html"}
                    </span>
                  </div>
                </div>

                {modules.length > 1 && (
                  <button 
                    type="button"
                    onClick={() => setModules(modules.filter(m => m.id !== mod.id))}
                    className="p-3 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-colors"
                  >
                    Eliminar
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <button 
          disabled={loading}
          className="w-full py-4 bg-[#141534] hover:bg-[#ff6600] disabled:bg-slate-300 text-white rounded-xl font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3 shadow-lg shadow-orange-900/10"
        >
          {loading ? (
            <>Guardando... <Loader2 className="w-5 h-5 animate-spin" /></>
          ) : (
            <>{courseToEdit ? "Guardar Cambios" : "Publicar Curso"}</>
          )}
        </button>
      </form>
    </div>
  );
};

export default CourseUploader;

"use client";

import { useState, useEffect } from "react";
import { LayoutDashboard, BookOpen, Users, Plus, Edit2, Trash2, Eye, EyeOff, ArrowLeft } from "lucide-react";
import CourseUploader from "@/components/admin/CourseUploader";
import { supabase } from "@/lib/supabase";

export default function AdminAcademia() {
  const [showUploader, setShowUploader] = useState(false);
  const [editingCourse, setEditingCourse] = useState<any>(null);

  const stats = [
    { label: "Cursos Activos", value: "3", icon: <BookOpen className="text-blue-600" /> },
    { label: "Total Alumnos", value: "128", icon: <Users className="text-[#0c366a]" /> },
    { label: "Ingresos Mes", value: "2.450€", icon: <LayoutDashboard className="text-emerald-600" /> },
  ];

  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCourses = async () => {
    try {
      const { data, error } = await supabase.from("courses").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      setCourses(data || []);
    } catch (err) {
      console.error("Error fetching courses:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const togglePublish = async (id: number, currentStatus: boolean) => {
    try {
      const { error } = await supabase.from("courses").update({ is_published: !currentStatus }).eq("id", id);
      if (error) throw error;
      fetchCourses();
    } catch (err) {
      console.error("Error toggling publish status:", err);
    }
  };

  const deleteCourse = async (id: number, contentPath: string) => {
    if (!confirm("¿Estás seguro de que quieres eliminar este curso?")) return;
    try {
      if (contentPath) {
        await supabase.storage.from("courses-content").remove([contentPath]);
      }
      const { error } = await supabase.from("courses").delete().eq("id", id);
      if (error) throw error;
      fetchCourses();
    } catch (err) {
      console.error("Error deleting course:", err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-[#141534] p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-3xl font-outfit font-bold mb-2">Panel de Administración</h1>
            <p className="text-slate-500 font-medium">Gestiona los cursos y contenidos de la Academia Labmoon.</p>
          </div>
          {!showUploader ? (
            <button 
              onClick={() => {
                setEditingCourse(null);
                setShowUploader(true);
              }}
              className="flex items-center gap-2 px-6 py-3 bg-[#141534] hover:bg-[#ff6600] text-white rounded-xl font-bold transition-all shadow-lg shadow-orange-900/10"
            >
              <Plus className="w-5 h-5" /> Nuevo Curso HTML
            </button>
          ) : (
            <button 
              onClick={() => {
                setShowUploader(false);
                setEditingCourse(null);
                fetchCourses();
              }}
              className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl font-bold transition-all text-[#141534]"
            >
              <ArrowLeft className="w-5 h-5" /> Volver al Listado
            </button>
          )}
        </div>

        {showUploader ? (
          <div className="max-w-3xl mx-auto">
            <CourseUploader 
              key={editingCourse?.id || 'new'}
              courseToEdit={editingCourse} 
              onSuccess={() => {
                setShowUploader(false);
                setEditingCourse(null);
                fetchCourses();
              }} 
            />
          </div>
        ) : (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {stats.map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center">
                      {stat.icon}
                    </div>
                    <span className="text-2xl font-black text-[#141534]">{stat.value}</span>
                  </div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Courses Table */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
              <div className="p-6 border-b border-slate-50 bg-slate-50/50 font-bold uppercase text-xs tracking-widest text-slate-500">
                Listado de Cursos
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-xs font-bold uppercase text-slate-400 border-b border-slate-50">
                      <th className="p-6">Título del Curso</th>
                      <th className="p-6">Precio</th>
                      <th className="p-6">Ventas</th>
                      <th className="p-6">Estado</th>
                      <th className="p-6 text-center">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan={5} className="p-6 text-center text-slate-500 font-medium">Cargando cursos...</td>
                      </tr>
                    ) : courses.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-6 text-center text-slate-500 font-medium">No hay cursos creados.</td>
                      </tr>
                    ) : courses.map((course) => (
                      <tr key={course.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                        <td className="p-6 font-bold text-[#141534]">{course.title}</td>
                        <td className="p-6 text-slate-500 font-medium">{course.price}€</td>
                        <td className="p-6 text-slate-500 font-medium">0</td>
                        <td className="p-6">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                            course.is_published ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                          }`}>
                            {course.is_published ? 'Activo' : 'Borrador'}
                          </span>
                        </td>
                        <td className="p-6">
                          <div className="flex items-center justify-center gap-3">
                            <button 
                              onClick={() => togglePublish(course.id, course.is_published)}
                              title={course.is_published ? "Ocultar" : "Publicar"}
                              className="p-2 hover:bg-blue-50 rounded-lg transition-colors text-slate-400 hover:text-blue-600"
                            >
                              {course.is_published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                            <button 
                              onClick={() => deleteCourse(course.id, course.content_path)}
                              title="Eliminar"
                              className="p-2 hover:bg-rose-50 rounded-lg transition-colors text-slate-400 hover:text-rose-600"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => {
                                setEditingCourse(course);
                                setShowUploader(true);
                              }}
                              title="Editar"
                              className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 hover:text-[#141534]"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

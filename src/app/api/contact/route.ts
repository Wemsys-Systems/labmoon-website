import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const nombre = formData.get('nombre') as string | null;
    const email = formData.get('email') as string | null;
    const tipo = formData.get('tipo') as string | null;
    const descripcion = formData.get('descripcion') as string | null;

    // Basic validation
    if (!nombre || !email || !descripcion) {
      return NextResponse.json(
        { success: false, message: 'Faltan campos obligatorios.' },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Email inválido.' },
        { status: 400 }
      );
    }

    console.log('Contact form submission:', { nombre, email, tipo, descripcion });

    return NextResponse.json(
      { success: true, message: 'Formulario recibido.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { success: false, message: 'Error interno del servidor.' },
      { status: 500 }
    );
  }
}

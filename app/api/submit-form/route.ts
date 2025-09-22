// src/app/api/submit-form/route.ts

import { google } from 'googleapis';
import { NextResponse } from 'next/server';

// Tipado para los datos esperados del formulario
type FormData = {
  name: string;
  email: string;
  satisfaction: string;
  comment: string;
};

export async function POST(request: Request) {
  try {
    const body: FormData = await request.json();

    // Validaciones básicas
    if (!body.name || !body.email || !body.satisfaction) {
      return NextResponse.json({ error: 'Faltan campos requeridos.' }, { status: 400 });
    }

    // Verificar que las variables de entorno estén configuradas
    if (!process.env.GOOGLE_SHEETS_CLIENT_EMAIL || !process.env.GOOGLE_SHEETS_PRIVATE_KEY || !process.env.GOOGLE_SHEET_ID) {
      console.error('Faltan variables de entorno requeridas');
      return NextResponse.json({ error: 'Error de configuración del servidor.' }, { status: 500 });
    }

    // Autenticación con Google Sheets
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({
      auth,
      version: 'v4',
    });

    const timestamp = new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' });

    // Añadimos la nueva fila a la hoja de cálculo
    // Usamos 'A:E' para que encuentre automáticamente la última fila con contenido
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'A:E',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [
          [timestamp, body.name, body.email, body.satisfaction, body.comment || '']
        ],
      },
    });

    return NextResponse.json({
      message: '¡Formulario enviado con éxito!',
      data: response.data,
    });

  } catch (error) {
    console.error('Error al escribir en Google Sheets:', error);
    
    // Verificar si es un error de autenticación específico
    if (error instanceof Error && error.message.includes('unsupported')) {
      return NextResponse.json(
        { error: 'Error de configuración: Problema con la clave de autenticación.' },
        { status: 500 }
      );
    }
    
    const errorMessage = error instanceof Error ? error.message : 'Un error desconocido ocurrió.';
    return NextResponse.json(
      { error: 'Ocurrió un error en el servidor.', details: errorMessage },
      { status: 500 }
    );
  }
}
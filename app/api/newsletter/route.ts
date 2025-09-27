/* eslint-disable @typescript-eslint/no-unused-vars */
import { google } from 'googleapis';
import { NextResponse } from 'next/server';

// Tipado específico para newsletter
type NewsletterData = {
  email: string;
};

export async function POST(request: Request) {
  try {
    const body: NewsletterData = await request.json();

    // Validación simple
    if (!body.email) {
      return NextResponse.json({ error: 'El email es requerido.' }, { status: 400 });
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({ error: 'El formato del email no es válido.' }, { status: 400 });
    }

    // Verificar variables de entorno
    const requiredEnvVars = [
      'GOOGLE_SHEETS_CLIENT_EMAIL_NEWSLETTER',
      'GOOGLE_SHEETS_PRIVATE_KEY_NEWSLETTER', 
      'NEXT_PUBLIC_GOOGLE_SHEET_ID_NEWSLETTER'
    ];

    for (const envVar of requiredEnvVars) {
      if (!process.env[envVar]) {
        console.error(`Falta variable de entorno: ${envVar}`);
        return NextResponse.json({ error: 'Error de configuración del servidor.' }, { status: 500 });
      }
    }

    // Autenticación
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL_NEWSLETTER,
        private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY_NEWSLETTER?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ auth, version: 'v4' });
    const timestamp = new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' });

    // Escribir en Google Sheets
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID_NEWSLETTER,
      range: 'A:B', // Solo timestamp y email
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[timestamp, body.email]],
      },
    });

    return NextResponse.json({
      message: '¡Te has suscrito al newsletter con éxito!',
    });

  } catch (error) {
    console.error('Error al escribir en Google Sheets:', error);
    
    if (error instanceof Error && error.message.includes('unsupported')) {
      return NextResponse.json(
        { error: 'Error de autenticación con Google Sheets.' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'Error interno del servidor.' },
      { status: 500 }
    );
  }
}
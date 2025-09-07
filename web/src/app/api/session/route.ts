import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ success: true });
  
  // Seta cookie session=1 com configurações httpOnly
  response.cookies.set('session', '1', {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 3600, // 1 hora
  });
  
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  
  // Remove o cookie session
  response.cookies.set('session', '', {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 0, // Expira imediatamente
  });
  
  return response;
}

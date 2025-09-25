'use client';

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <html>
      <body style={{ padding: 24, color: '#fff', background: '#0b0b0f', fontFamily: 'ui-sans-serif, system-ui' }}>
        <h1 style={{ fontSize: 18, marginBottom: 12 }}>Algo deu errado</h1>
        <pre style={{ whiteSpace: 'pre-wrap', opacity: 0.8 }}>{error?.message}</pre>
        <button
          onClick={() => reset()}
          style={{ marginTop: 16, padding: '6px 10px', background: '#1f2937', border: '1px solid #374151', borderRadius: 6, color: '#e5e7eb' }}
        >
          Tentar novamente
        </button>
      </body>
    </html>
  );
}




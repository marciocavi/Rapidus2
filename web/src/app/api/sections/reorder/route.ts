import { NextRequest, NextResponse } from 'next/server';

// Mock data structure - replace with actual database
interface Section {
  id: string;
  key: string;
  label: string;
  enabled: boolean;
  position: number;
}

// Mock database - replace with actual Prisma/database calls
const mockSections: Section[] = [
  { id: 'hero', key: 'hero', label: 'Hero', enabled: true, position: 1 },
  { id: 'features', key: 'features', label: 'Features', enabled: true, position: 2 },
  { id: 'services', key: 'services', label: 'Services', enabled: true, position: 3 },
  { id: 'parceiros', key: 'parceiros', label: 'Parceiros', enabled: true, position: 4 },
  { id: 'instagram', key: 'instagram', label: 'Instagram', enabled: true, position: 5 },
  { id: 'blog', key: 'blog', label: 'Blog', enabled: true, position: 6 },
  { id: 'cta', key: 'cta', label: 'CTA', enabled: true, position: 7 },
  { id: 'stats', key: 'stats', label: 'Stats', enabled: true, position: 8 },
  { id: 'carrossels', key: 'carrossels', label: 'Carrosséis', enabled: false, position: 9 },
  { id: 'certificacoes', key: 'certificacoes', label: 'Certificações', enabled: false, position: 10 },
  { id: 'icones-flutuantes', key: 'icones-flutuantes', label: 'Ícones Flutuantes', enabled: false, position: 11 },
  { id: 'header', key: 'header', label: 'Header', enabled: true, position: 12 },
  { id: 'footer', key: 'footer', label: 'Footer', enabled: true, position: 13 }
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { order } = body as { order: Array<{ id: string; position: number }> };

    // Validate payload
    if (!Array.isArray(order)) {
      return NextResponse.json(
        { error: 'Invalid payload. Expected order array.' },
        { status: 400 }
      );
    }

    // Validate each item in order array
    for (const item of order) {
      if (!item.id || typeof item.position !== 'number') {
        return NextResponse.json(
          { error: 'Invalid item format. Expected { id: string, position: number }' },
          { status: 400 }
        );
      }
    }

    // Update positions in mock database
    // In real implementation, this would be a database transaction
    for (const item of order) {
      const sectionIndex = mockSections.findIndex(s => s.id === item.id);
      if (sectionIndex !== -1) {
        mockSections[sectionIndex].position = item.position;
      }
    }

    // Sort sections by position
    mockSections.sort((a, b) => a.position - b.position);

    return NextResponse.json({ 
      success: true, 
      message: 'Sections reordered successfully',
      sections: mockSections
    });

  } catch (error) {
    console.error('Error reordering sections:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Return current sections order
    const sortedSections = [...mockSections].sort((a, b) => a.position - b.position);
    
    return NextResponse.json({
      success: true,
      sections: sortedSections
    });
  } catch (error) {
    console.error('Error fetching sections:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

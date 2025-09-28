import { NextRequest, NextResponse } from 'next/server';

import { loadSiteConfig, saveSiteConfig, SiteConfigSchema } from '@/lib/site-config';

export async function GET() {
  try {
    const config = await loadSiteConfig();
    return NextResponse.json(config);
  } catch {
    return NextResponse.json(
      { error: 'Failed to load site configuration' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the incoming data
    const validatedConfig = SiteConfigSchema.parse(body);
    
    // Try to save to server if ALLOW_ADMIN_WRITE is enabled
    const saved = await saveSiteConfig(validatedConfig);
    
    if (saved) {
      return NextResponse.json({ success: true, message: 'Configuration saved to server' });
    }

    return NextResponse.json({
      success: false,
      message: 'Server write not allowed, using localStorage fallback',
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: 'Invalid configuration data', details: error.message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to save configuration' },
      { status: 500 }
    );
  }
}

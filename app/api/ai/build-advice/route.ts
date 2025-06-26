import { NextRequest, NextResponse } from 'next/server';
import { aiService } from '../../../lib/ai';

export async function POST(req: NextRequest) {
  try {
    const { buildData } = await req.json();
    
    if (!buildData) {
      return NextResponse.json(
        { error: 'Build data is required' },
        { status: 400 }
      );
    }

    const result = await aiService.getBuildAdvice(buildData);
    
    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({ advice: result.data });
  } catch (error) {
    console.error('AI Build Advice Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 
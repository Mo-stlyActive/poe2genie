import { NextRequest, NextResponse } from 'next/server';
import { aiService } from '../../../lib/ai';

export async function POST(req: NextRequest) {
  try {
    const { item } = await req.json();
    
    if (!item) {
      return NextResponse.json(
        { error: 'Item data is required' },
        { status: 400 }
      );
    }

    const result = await aiService.analyzeItem(item);
    
    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({ analysis: result.data });
  } catch (error) {
    console.error('AI Analyze Item Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 
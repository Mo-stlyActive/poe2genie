import { NextRequest, NextResponse } from 'next/server';
import { aiService } from '../../../lib/ai';

export async function POST(req: NextRequest) {
  try {
    const { question } = await req.json();
    
    if (!question) {
      return NextResponse.json(
        { error: 'Question is required' },
        { status: 400 }
      );
    }

    const result = await aiService.answerQuestion(question);
    
    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({ answer: result.data });
  } catch (error) {
    console.error('AI Chat Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 
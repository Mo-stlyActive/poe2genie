'use client';

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import NavBar from "../../NavBar";

const ITEM_TYPE = 'UniqueArmour'; // You can make this dynamic later
const LEAGUE = 'Affliction';

async function fetchItem(detailsId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/poe-ninja?itemType=${encodeURIComponent(ITEM_TYPE)}&league=${encodeURIComponent(LEAGUE)}`);
  if (!res.ok) return null;
  const data = await res.json();
  const item = (data.lines || []).find((i: any) => i.detailsId === detailsId);
  return item || null;
}

export default function ItemPage({ params, searchParams }: any) {
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  // Fetch item data on component mount
  useEffect(() => {
    fetchItem(params.id).then(itemData => {
      if (!itemData) {
        notFound();
      }
      setItem(itemData);
      setLoading(false);
    });
  }, [params.id]);

  const handleAiAnalysis = async () => {
    if (!item) return;
    
    setAiLoading(true);
    setAiError(null);
    
    try {
      const response = await fetch('/api/ai/analyze-item', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ item }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to get AI analysis');
      }
      
      setAiAnalysis(data.analysis);
    } catch (error) {
      setAiError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setAiLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-fuchsia-700 to-orange-400 flex flex-col items-center justify-center">
        <NavBar />
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-400 border-t-fuchsia-600 border-b-purple-900 rounded-full animate-spin mb-6"></div>
          <p className="text-fuchsia-100 text-lg">Loading item details...</p>
        </div>
      </div>
    );
  }

  if (!item) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-fuchsia-700 to-orange-400 flex flex-col items-center">
      <NavBar />
      <div className="max-w-4xl w-full bg-purple-950/80 rounded-2xl shadow-2xl border-2 border-fuchsia-700/40 p-8 flex flex-col items-center py-16 px-4">
        <img src={item.icon} alt={item.name} className="w-24 h-24 rounded-lg mb-4 bg-black/30 border border-fuchsia-700/40" />
        <h1 className="text-3xl font-bold text-white mb-2 text-center">{item.name}</h1>
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-orange-500/20 to-fuchsia-500/20 border border-orange-400/40 rounded-full backdrop-blur-sm animate-pulse mb-2">
          <div className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-ping"></div>
          <span className="text-orange-300 text-xs font-medium">PoE1 Data • PoE2 Coming Soon</span>
          <div className="w-1.5 h-1.5 bg-fuchsia-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
        </div>
        <div className="text-fuchsia-200 text-lg mb-2 text-center">{item.typeLine}</div>
        <div className="text-orange-300 font-bold text-2xl mb-4 text-center">{item.chaosValue} <span className="text-fuchsia-200 font-normal text-lg">chaos</span></div>
        
        <button
          onClick={handleAiAnalysis}
          disabled={aiLoading}
          className="mb-6 bg-gradient-to-r from-cyan-400 to-fuchsia-400 hover:from-cyan-300 hover:to-fuchsia-300 text-purple-900 px-6 py-3 rounded-lg font-bold text-lg border-2 border-cyan-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all transform hover:scale-105 disabled:opacity-50"
        >
          {aiLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-purple-900 border-t-transparent rounded-full animate-spin"></div>
              Analyzing...
            </div>
          ) : (
            '🤖 Get AI Analysis'
          )}
        </button>

        {aiError && (
          <div className="w-full mb-6 p-4 bg-red-900/50 border border-red-400/50 rounded-lg">
            <p className="text-red-300 text-center">{aiError}</p>
          </div>
        )}

        {aiAnalysis && (
          <div className="w-full mb-6 p-6 bg-gradient-to-r from-cyan-900/30 to-fuchsia-900/30 border border-cyan-400/50 rounded-lg">
            <h3 className="text-xl font-bold text-cyan-300 mb-4 text-center">🤖 AI Analysis</h3>
            <div className="text-fuchsia-100 whitespace-pre-wrap leading-relaxed">
              {aiAnalysis}
            </div>
          </div>
        )}

        {item.explicitModifiers && item.explicitModifiers.length > 0 && (
          <ul className="mb-4 list-disc list-inside text-orange-200">
            {item.explicitModifiers.map((mod: any, i: number) => (
              <li key={i}>{mod.text}</li>
            ))}
          </ul>
        )}
        {item.flavourText && (
          <div className="italic text-fuchsia-300 mt-2 text-center">{item.flavourText}</div>
        )}
        {!item.explicitModifiers && !item.flavourText && (
          <div className="text-fuchsia-400 text-center">No additional stats available.</div>
        )}
        <a href="/search" className="mt-8 inline-block bg-orange-400/90 hover:bg-orange-300 text-fuchsia-900 px-6 py-2 rounded-lg font-semibold border-2 border-fuchsia-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-fuchsia-400 transition-all">Back to Search</a>
      </div>
    </div>
  );
} 
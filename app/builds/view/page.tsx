'use client';

import { useSearchParams } from 'next/navigation';
import NavBar from "../../NavBar";

interface Build {
  name: string;
  characterClass: string;
  description: string;
  equipment: {
    weapon: string;
    offhand: string;
    helmet: string;
    chest: string;
    gloves: string;
    boots: string;
    belt: string;
    amulet: string;
    ring1: string;
    ring2: string;
  };
  notes: string;
}

const EQUIPMENT_SLOTS = [
  { key: 'weapon', label: 'Weapon', icon: '⚔️' },
  { key: 'offhand', label: 'Offhand', icon: '🛡️' },
  { key: 'helmet', label: 'Helmet', icon: '⛑️' },
  { key: 'chest', label: 'Chest', icon: '👕' },
  { key: 'gloves', label: 'Gloves', icon: '🧤' },
  { key: 'boots', label: 'Boots', icon: '👢' },
  { key: 'belt', label: 'Belt', icon: '👖' },
  { key: 'amulet', label: 'Amulet', icon: '📿' },
  { key: 'ring1', label: 'Ring 1', icon: '💍' },
  { key: 'ring2', label: 'Ring 2', icon: '💍' },
];

function decodeBuild(data: string): Build | null {
  try {
    return JSON.parse(atob(decodeURIComponent(data)));
  } catch {
    return null;
  }
}

export default function BuildViewPage() {
  const params = useSearchParams();
  const data = params.get('data');
  const build = data ? decodeBuild(data) : null;

  if (!build) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-fuchsia-700 to-orange-400">
        <div className="bg-purple-950/90 p-8 rounded-2xl shadow-2xl border-2 border-fuchsia-700/40 max-w-lg w-full text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Invalid Build Link</h1>
          <p className="text-fuchsia-200">Sorry, this build link is invalid or corrupted.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-fuchsia-700 to-orange-400">
      <NavBar />
      <div className="max-w-4xl mx-auto py-16 px-4">
        {/* Header */}
        <div className="bg-purple-950/90 rounded-2xl shadow-2xl border-2 border-fuchsia-700/40 p-8 mb-8">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-white mb-2">{build.name}</h1>
            <div className="text-fuchsia-200 text-xl">{build.characterClass}</div>
          </div>
          {build.description && (
            <div className="bg-purple-900/80 rounded-lg p-4 border border-fuchsia-500/30">
              <div className="text-fuchsia-200 font-semibold mb-2">Build Description</div>
              <div className="text-white leading-relaxed">{build.description}</div>
            </div>
          )}
        </div>

        {/* Equipment Grid */}
        <div className="bg-purple-950/90 rounded-2xl shadow-2xl border-2 border-fuchsia-700/40 p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Equipment</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {EQUIPMENT_SLOTS.map(slot => {
              const item = build.equipment[slot.key as keyof typeof build.equipment];
              return (
                <div key={slot.key} className="bg-purple-900/80 rounded-lg p-4 border border-fuchsia-500/30">
                  <div className="flex items-center mb-2">
                    <span className="text-2xl mr-3">{slot.icon}</span>
                    <div className="text-fuchsia-200 font-semibold">{slot.label}</div>
                  </div>
                  <div className="text-white font-medium">
                    {item || <span className="text-fuchsia-400 italic">Not specified</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Notes */}
        {build.notes && (
          <div className="bg-purple-950/90 rounded-2xl shadow-2xl border-2 border-fuchsia-700/40 p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Additional Notes</h2>
            <div className="bg-purple-900/80 rounded-lg p-4 border border-fuchsia-500/30">
              <div className="text-white leading-relaxed whitespace-pre-wrap">{build.notes}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 
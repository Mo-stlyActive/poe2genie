'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

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

interface Item {
  id: number;
  name: string;
  icon: string;
  typeLine: string;
  baseType: string;
}

const CLASSES = [
  'Witch', 'Shadow', 'Ranger', 'Duelist', 'Marauder', 'Templar', 'Scion',
];

const EQUIPMENT_SLOTS = [
  { key: 'weapon', label: 'Weapon', icon: '⚔️', itemType: 'UniqueWeapon' },
  { key: 'offhand', label: 'Offhand', icon: '🛡️', itemType: 'UniqueWeapon' },
  { key: 'helmet', label: 'Helmet', icon: '⛑️', itemType: 'UniqueArmour' },
  { key: 'chest', label: 'Chest', icon: '👕', itemType: 'UniqueArmour' },
  { key: 'gloves', label: 'Gloves', icon: '🧤', itemType: 'UniqueArmour' },
  { key: 'boots', label: 'Boots', icon: '👢', itemType: 'UniqueArmour' },
  { key: 'belt', label: 'Belt', icon: '👖', itemType: 'UniqueAccessory' },
  { key: 'amulet', label: 'Amulet', icon: '📿', itemType: 'UniqueAccessory' },
  { key: 'ring1', label: 'Ring 1', icon: '💍', itemType: 'UniqueAccessory' },
  { key: 'ring2', label: 'Ring 2', icon: '💍', itemType: 'UniqueAccessory' },
];

function encodeBuild(build: Build) {
  return encodeURIComponent(btoa(JSON.stringify(build)));
}

function decodeBuild(data: string): Build | null {
  try {
    return JSON.parse(atob(decodeURIComponent(data)));
  } catch {
    return null;
  }
}

// Equipment Search Component
function EquipmentSearch({ 
  slot, 
  value, 
  onChange, 
  onSelect 
}: { 
  slot: typeof EQUIPMENT_SLOTS[0]; 
  value: string; 
  onChange: (value: string) => void; 
  onSelect: (item: Item) => void; 
}) {
  const [items, setItems] = useState<Item[]>([]);
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchItems() {
      setLoading(true);
      try {
        const response = await fetch(`/api/poe-ninja?type=${slot.itemType}&league=Standard`);
        const data = await response.json();
        setItems(data.lines || []);
        setFilteredItems(data.lines || []);
      } catch (error) {
        console.error('Failed to fetch items:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchItems();
  }, [slot.itemType]);

  useEffect(() => {
    if (value) {
      const filtered = items.filter(item => 
        item.name.toLowerCase().includes(value.toLowerCase()) ||
        item.baseType.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredItems(filtered.slice(0, 10)); // Limit to 10 results
    } else {
      setFilteredItems(items.slice(0, 10));
    }
  }, [value, items]);

  return (
    <div className="relative">
      <div className="flex items-center mb-2">
        <span className="text-lg mr-2">{slot.icon}</span>
        <label className="text-fuchsia-200 text-sm font-medium">{slot.label}</label>
      </div>
      <div className="relative">
        <input
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="w-full px-3 py-2 rounded-lg border-2 border-fuchsia-400 bg-purple-900 text-white focus:outline-none focus:border-orange-400 transition-colors text-sm"
          placeholder={`Search ${slot.label.toLowerCase()}...`}
        />
        {loading && (
          <div className="absolute right-3 top-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-orange-400"></div>
          </div>
        )}
      </div>
      
      {isOpen && filteredItems.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-purple-900 border-2 border-fuchsia-400 rounded-lg shadow-xl max-h-60 overflow-y-auto">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                onSelect(item);
                setIsOpen(false);
              }}
              className="px-3 py-2 hover:bg-purple-800 cursor-pointer border-b border-fuchsia-500/30 last:border-b-0"
            >
              <div className="text-white font-medium text-sm">{item.name}</div>
              <div className="text-fuchsia-300 text-xs">{item.baseType}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function BuildPlannerPage() {
  const [build, setBuild] = useState<Build>({
    name: '',
    characterClass: CLASSES[0],
    description: '',
    equipment: {
      weapon: '',
      offhand: '',
      helmet: '',
      chest: '',
      gloves: '',
      boots: '',
      belt: '',
      amulet: '',
      ring1: '',
      ring2: '',
    },
    notes: '',
  });
  const [savedBuilds, setSavedBuilds] = useState<Build[]>([]);
  const [shareUrl, setShareUrl] = useState('');
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem('poe2genie_builds');
    if (stored) setSavedBuilds(JSON.parse(stored));
  }, []);

  function saveBuild() {
    const newBuilds = [build, ...savedBuilds];
    setSavedBuilds(newBuilds);
    localStorage.setItem('poe2genie_builds', JSON.stringify(newBuilds));
    setShareUrl(`${window.location.origin}/builds/view?data=${encodeBuild(build)}`);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    if (name.startsWith('equipment.')) {
      const slot = name.split('.')[1];
      setBuild({
        ...build,
        equipment: { ...build.equipment, [slot]: value }
      });
    } else {
      setBuild({ ...build, [name]: value });
    }
  }

  function handleEquipmentSelect(slotKey: string, item: Item) {
    setBuild({
      ...build,
      equipment: { ...build.equipment, [slotKey]: item.name }
    });
  }

  function handleViewBuild(b: Build) {
    router.push(`/builds/view?data=${encodeBuild(b)}`);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-fuchsia-700 to-orange-400 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Build Planner</h1>
          <p className="text-fuchsia-200 text-lg">Create and share your Path of Exile builds</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Build Form */}
          <div className="bg-purple-950/80 rounded-2xl shadow-2xl border-2 border-fuchsia-700/40 p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Create New Build</h2>
            <form onSubmit={e => { e.preventDefault(); saveBuild(); }} className="space-y-6">
              {/* Basic Info */}
              <div className="space-y-4">
                <div>
                  <label className="block text-fuchsia-200 mb-2 font-semibold">Build Name</label>
                  <input
                    name="name"
                    value={build.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border-2 border-fuchsia-400 bg-purple-900 text-white focus:outline-none focus:border-orange-400 transition-colors"
                    placeholder="Enter build name..."
                    required
                  />
                </div>
                <div>
                  <label className="block text-fuchsia-200 mb-2 font-semibold">Class</label>
                  <select
                    name="characterClass"
                    value={build.characterClass}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border-2 border-fuchsia-400 bg-purple-900 text-white focus:outline-none focus:border-orange-400 transition-colors"
                  >
                    {CLASSES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-fuchsia-200 mb-2 font-semibold">Description</label>
                  <textarea
                    name="description"
                    value={build.description}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border-2 border-fuchsia-400 bg-purple-900 text-white focus:outline-none focus:border-orange-400 transition-colors"
                    rows={3}
                    placeholder="Describe your build concept..."
                  />
                </div>
              </div>

              {/* Equipment Grid */}
              <div>
                <label className="block text-fuchsia-200 mb-4 font-semibold text-lg">Equipment</label>
                <div className="grid grid-cols-1 gap-4">
                  {EQUIPMENT_SLOTS.map(slot => (
                    <EquipmentSearch
                      key={slot.key}
                      slot={slot}
                      value={build.equipment[slot.key as keyof typeof build.equipment]}
                      onChange={(value) => {
                        setBuild({
                          ...build,
                          equipment: { ...build.equipment, [slot.key]: value }
                        });
                      }}
                      onSelect={(item) => handleEquipmentSelect(slot.key, item)}
                    />
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-fuchsia-200 mb-2 font-semibold">Additional Notes</label>
                <textarea
                  name="notes"
                  value={build.notes}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border-2 border-fuchsia-400 bg-purple-900 text-white focus:outline-none focus:border-orange-400 transition-colors"
                  rows={3}
                  placeholder="Add any additional notes, tips, or strategies..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-300 hover:to-orange-400 text-fuchsia-900 px-6 py-4 rounded-lg font-bold text-lg border-2 border-fuchsia-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-fuchsia-400 transition-all transform hover:scale-105"
              >
                Save & Generate Shareable Link
              </button>
            </form>

            {shareUrl && (
              <div className="mt-6 bg-purple-900/90 rounded-lg p-4 border border-fuchsia-500/30">
                <div className="text-fuchsia-200 mb-3 font-semibold">✨ Share this build:</div>
                <div className="flex gap-2">
                  <input
                    value={shareUrl}
                    readOnly
                    className="flex-1 px-3 py-2 rounded bg-purple-950 text-white text-sm border border-fuchsia-500/30"
                    onFocus={e => e.target.select()}
                  />
                  <button
                    onClick={() => { 
                      navigator.clipboard.writeText(shareUrl);
                      // Could add a toast notification here
                    }}
                    className="bg-fuchsia-600 hover:bg-fuchsia-500 text-white px-4 py-2 rounded font-semibold text-sm transition-colors"
                  >
                    Copy
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Saved Builds */}
          <div className="bg-purple-950/80 rounded-2xl shadow-xl border-2 border-fuchsia-700/40 p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Your Saved Builds</h2>
            {savedBuilds.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-fuchsia-200 text-lg mb-2">No builds saved yet</div>
                <div className="text-fuchsia-300 text-sm">Create your first build to get started!</div>
              </div>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {savedBuilds.map((b, i) => (
                  <div key={i} className="bg-purple-900/80 rounded-lg p-4 border border-fuchsia-500/30 hover:border-fuchsia-400/50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <div className="text-white font-bold text-lg">{b.name}</div>
                        <div className="text-fuchsia-200 text-sm">{b.characterClass}</div>
                      </div>
                      <button
                        onClick={() => handleViewBuild(b)}
                        className="bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-300 hover:to-orange-400 text-fuchsia-900 px-4 py-2 rounded font-semibold text-sm border border-fuchsia-200 transition-all transform hover:scale-105"
                      >
                        View Build
                      </button>
                    </div>
                    {b.description && (
                      <div className="text-fuchsia-300 text-sm line-clamp-2">{b.description}</div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 
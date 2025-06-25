'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PassiveTree from "./PassiveTree";
import NavBar from "../NavBar";

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
  passives: {
    selectedNodes: number[];
    note: string;
  };
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

const AFFIXES = [
  'Physical Damage',
  'Elemental Damage',
  'Attack Speed',
  'Critical Strike Chance',
  'Accuracy',
  'Life',
  'Energy Shield',
  'Armour',
  'Evasion',
  'Resistances',
  'Attributes',
  'Mana',
  'Spell Damage',
  'Movement Speed',
  'Chaos Damage',
  'Minion Damage',
  'Projectile Speed',
  'Area of Effect',
  'Curse Effect',
  'Reduced Attribute Requirements',
  'Other',
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

// Equipment Picker Component
function EquipmentPicker({
  slot,
  value,
  onChange,
}: {
  slot: typeof EQUIPMENT_SLOTS[0];
  value: any;
  onChange: (val: any) => void;
}) {
  const [mode, setMode] = useState(value?.type || 'unique');
  const [uniqueValue, setUniqueValue] = useState(value?.type === 'unique' ? value.name : '');
  const [baseValue, setBaseValue] = useState(value?.type === 'base' ? value.baseType : '');
  const [affixes, setAffixes] = useState<string[]>(value?.type === 'base' ? value.affixes || [] : []);
  const [baseOptions, setBaseOptions] = useState<{ name: string; type: string }[]>([]);
  const [baseSearch, setBaseSearch] = useState('');
  const [isBaseOpen, setIsBaseOpen] = useState(false);
  const [uniqueItems, setUniqueItems] = useState<Item[]>([]);
  const [filteredUniques, setFilteredUniques] = useState<Item[]>([]);
  const [isUniqueOpen, setIsUniqueOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch base items
  useEffect(() => {
    fetch('/poe-bases.json')
      .then(res => res.json())
      .then(data => setBaseOptions(data));
  }, []);

  // Fetch unique items
  useEffect(() => {
    async function fetchItems() {
      setLoading(true);
      try {
        const response = await fetch(`/api/poe-ninja?type=${slot.itemType}&league=Standard`);
        const data = await response.json();
        setUniqueItems(data.lines || []);
        setFilteredUniques(data.lines || []);
      } catch (error) {
        setUniqueItems([]);
        setFilteredUniques([]);
      } finally {
        setLoading(false);
      }
    }
    if (mode === 'unique') fetchItems();
  }, [slot.itemType, mode]);

  // Filter unique items
  useEffect(() => {
    if (uniqueValue) {
      const filtered = uniqueItems.filter(item =>
        item.name.toLowerCase().includes(uniqueValue.toLowerCase()) ||
        item.baseType.toLowerCase().includes(uniqueValue.toLowerCase())
      );
      setFilteredUniques(filtered.slice(0, 10));
    } else {
      setFilteredUniques(uniqueItems.slice(0, 10));
    }
  }, [uniqueValue, uniqueItems]);

  // Filter base items
  const filteredBases = baseOptions.filter(
    b => b.type === slot.label || slot.label === 'Offhand' && b.type === 'Weapon' // Offhand can be shield or weapon
  ).filter(b =>
    !baseSearch || b.name.toLowerCase().includes(baseSearch.toLowerCase())
  ).slice(0, 10);

  // Handle affix add/remove
  function toggleAffix(affix: string) {
    if (affixes.includes(affix)) {
      setAffixes(affixes.filter(a => a !== affix));
    } else {
      setAffixes([...affixes, affix]);
    }
  }

  // Save on change
  useEffect(() => {
    if (mode === 'unique') {
      onChange({ type: 'unique', name: uniqueValue });
    } else {
      onChange({ type: 'base', baseType: baseValue, affixes });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, uniqueValue, baseValue, affixes]);

  return (
    <div className="relative mb-4">
      <div className="flex items-center mb-2 gap-2">
        <span className="text-lg mr-2">{slot.icon}</span>
        <label className="text-fuchsia-200 text-sm font-medium">{slot.label}</label>
        <div className="ml-auto flex gap-1">
          <button
            type="button"
            className={`px-2 py-1 rounded text-xs font-bold border-2 ${mode === 'unique' ? 'bg-fuchsia-700 text-white border-orange-400' : 'bg-purple-900 text-fuchsia-200 border-fuchsia-400'}`}
            onClick={() => setMode('unique')}
          >Unique</button>
          <button
            type="button"
            className={`px-2 py-1 rounded text-xs font-bold border-2 ${mode === 'base' ? 'bg-fuchsia-700 text-white border-orange-400' : 'bg-purple-900 text-fuchsia-200 border-fuchsia-400'}`}
            onClick={() => setMode('base')}
          >Base</button>
        </div>
      </div>
      {mode === 'unique' && (
        <div className="relative">
          <input
            value={uniqueValue}
            onChange={e => { setUniqueValue(e.target.value); setIsUniqueOpen(true); }}
            onFocus={() => setIsUniqueOpen(true)}
            className="w-full px-3 py-2 rounded-lg border-2 border-fuchsia-400 bg-purple-900 text-white focus:outline-none focus:border-orange-400 transition-colors text-sm"
            placeholder={`Search unique ${slot.label.toLowerCase()}...`}
          />
          {loading && (
            <div className="absolute right-3 top-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-orange-400"></div>
            </div>
          )}
          {isUniqueOpen && filteredUniques.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-purple-900 border-2 border-fuchsia-400 rounded-lg shadow-xl max-h-60 overflow-y-auto">
              {filteredUniques.map((item) => (
                <div
                  key={item.id}
                  onClick={() => { setUniqueValue(item.name); setIsUniqueOpen(false); }}
                  className="px-3 py-2 hover:bg-purple-800 cursor-pointer border-b border-fuchsia-500/30 last:border-b-0"
                >
                  <div className="text-white font-medium text-sm">{item.name}</div>
                  <div className="text-fuchsia-300 text-xs">{item.baseType}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      {mode === 'base' && (
        <div>
          <div className="relative mb-2">
            <input
              value={baseSearch}
              onChange={e => { setBaseSearch(e.target.value); setIsBaseOpen(true); }}
              onFocus={() => setIsBaseOpen(true)}
              className="w-full px-3 py-2 rounded-lg border-2 border-fuchsia-400 bg-purple-900 text-white focus:outline-none focus:border-orange-400 transition-colors text-sm"
              placeholder={`Search base ${slot.label.toLowerCase()}...`}
            />
            {isBaseOpen && filteredBases.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-purple-900 border-2 border-fuchsia-400 rounded-lg shadow-xl max-h-60 overflow-y-auto">
                {filteredBases.map((b, i) => (
                  <div
                    key={b.name + i}
                    onClick={() => { setBaseValue(b.name); setIsBaseOpen(false); }}
                    className="px-3 py-2 hover:bg-purple-800 cursor-pointer border-b border-fuchsia-500/30 last:border-b-0"
                  >
                    <div className="text-white font-medium text-sm">{b.name}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {baseValue && (
            <div className="mb-2">
              <div className="text-fuchsia-200 text-xs mb-1">Affixes to look for:</div>
              <div className="flex flex-wrap gap-2">
                {AFFIXES.map(affix => (
                  <button
                    key={affix}
                    type="button"
                    className={`px-2 py-1 rounded text-xs border-2 font-semibold transition-colors ${affixes.includes(affix) ? 'bg-orange-400 text-fuchsia-900 border-fuchsia-700' : 'bg-purple-900 text-fuchsia-200 border-fuchsia-400 hover:bg-fuchsia-800/40'}`}
                    onClick={() => toggleAffix(affix)}
                  >
                    {affix}
                  </button>
                ))}
              </div>
              {affixes.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {affixes.map(a => (
                    <span key={a} className="bg-fuchsia-700 text-white px-2 py-1 rounded text-xs">{a}</span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const TABS = [
  { key: 'general', label: 'General' },
  { key: 'equipment', label: 'Equipment' },
  { key: 'passives', label: 'Passives' },
  { key: 'notes', label: 'Notes' },
];

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
    passives: {
      selectedNodes: [],
      note: '',
    },
  });
  const [savedBuilds, setSavedBuilds] = useState<Build[]>([]);
  const [shareUrl, setShareUrl] = useState('');
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('general');

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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-fuchsia-700 to-orange-400">
      <NavBar />
      <div className="max-w-6xl mx-auto py-16 px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Build Planner</h1>
          <p className="text-fuchsia-200 text-lg">Create and share your Path of Exile builds</p>
        </div>
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Build Card */}
          <div className="bg-purple-950/80 rounded-2xl shadow-2xl border-2 border-fuchsia-700/40 p-8 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="text-3xl">
                  {/* Class icon placeholder, can be replaced with SVGs */}
                  {build.characterClass === 'Witch' && '🧙‍♀️'}
                  {build.characterClass === 'Shadow' && '🕵️‍♂️'}
                  {build.characterClass === 'Ranger' && '🏹'}
                  {build.characterClass === 'Duelist' && '🤺'}
                  {build.characterClass === 'Marauder' && '💪'}
                  {build.characterClass === 'Templar' && '🙏'}
                  {build.characterClass === 'Scion' && '👸'}
                </span>
                <input
                  name="name"
                  value={build.name}
                  onChange={handleChange}
                  className="bg-transparent text-white text-2xl font-bold border-b-2 border-fuchsia-400 focus:outline-none focus:border-orange-400 px-2 py-1 w-48"
                  placeholder="Build Name"
                  required
                />
              </div>
              {/* Quick actions placeholder */}
              <div className="flex gap-2">
                {/* Future: Edit, Share, Delete icons */}
              </div>
            </div>
            {/* Tabs */}
            <div className="flex gap-2 mb-6">
              {TABS.map(tab => (
                <button
                  key={tab.key}
                  className={`px-4 py-2 rounded-t-lg font-semibold text-sm transition-colors border-b-2 ${activeTab === tab.key ? 'bg-fuchsia-700/80 text-white border-orange-400' : 'bg-purple-900/60 text-fuchsia-200 border-transparent hover:bg-fuchsia-800/40'}`}
                  onClick={() => setActiveTab(tab.key)}
                  type="button"
                >
                  {tab.label}
                </button>
              ))}
            </div>
            {/* Tab Content */}
            <div className="flex-1">
              {activeTab === 'general' && (
                <div className="space-y-4">
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
              )}
              {activeTab === 'equipment' && (
                <div>
                  <label className="block text-fuchsia-200 mb-4 font-semibold text-lg">Equipment</label>
                  <div className="grid grid-cols-1 gap-4">
                    {EQUIPMENT_SLOTS.map(slot => (
                      <EquipmentPicker
                        key={slot.key}
                        slot={slot}
                        value={build.equipment[slot.key as keyof typeof build.equipment]}
                        onChange={(val) => {
                          setBuild({
                            ...build,
                            equipment: { ...build.equipment, [slot.key]: val }
                          });
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
              {activeTab === 'passives' && (
                <PassiveTree
                  selectedNodes={build.passives.selectedNodes}
                  setSelectedNodes={ids => setBuild({
                    ...build,
                    passives: { ...build.passives, selectedNodes: ids },
                  })}
                  note={build.passives.note}
                  setNote={note => setBuild({
                    ...build,
                    passives: { ...build.passives, note },
                  })}
                />
              )}
              {activeTab === 'notes' && (
                <div>
                  <label className="block text-fuchsia-200 mb-2 font-semibold">Additional Notes</label>
                  <textarea
                    name="notes"
                    value={build.notes}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border-2 border-fuchsia-400 bg-purple-900 text-white focus:outline-none focus:border-orange-400 transition-colors"
                    rows={6}
                    placeholder="Add any additional notes, tips, or strategies..."
                  />
                </div>
              )}
            </div>
            {/* Footer Actions */}
            <div className="mt-8 flex gap-4 justify-end">
              <button
                onClick={saveBuild}
                className="bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-300 hover:to-orange-400 text-fuchsia-900 px-6 py-3 rounded-lg font-bold text-lg border-2 border-fuchsia-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-fuchsia-400 transition-all transform hover:scale-105"
              >
                Save & Generate Link
              </button>
              {/* Future: Export, Delete buttons */}
            </div>
            {/* Share URL */}
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
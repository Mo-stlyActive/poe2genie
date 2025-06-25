'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import NavBar from "../NavBar";

interface SearchItem {
  id: string;
  name: string;
  typeLine: string;
  icon: string;
  chaosValue: number;
  explicitModifiers?: { text: string }[];
  flavourText?: string;
  currencyTypeName?: string;
  detailsId?: string;
}

const ITEM_TYPES = [
  { label: 'All', value: 'All' },
  { label: 'Unique Armour', value: 'UniqueArmour' },
  { label: 'Unique Weapon', value: 'UniqueWeapon' },
  { label: 'Unique Flask', value: 'UniqueFlask' },
  { label: 'Unique Jewel', value: 'UniqueJewel' },
  { label: 'Unique Accessory', value: 'UniqueAccessory' },
  { label: 'Currency', value: 'Currency' },
  { label: 'Divination Card', value: 'DivinationCard' },
  { label: 'Map', value: 'Map' },
  { label: 'Skill Gem', value: 'SkillGem' },
  { label: 'Prophecy', value: 'Prophecy' },
];

const LEAGUES = [
  'Affliction',
  'Standard',
  'Hardcore',
  'Hardcore Affliction',
  'SSF Affliction',
  'SSF Standard',
  'SSF Hardcore',
  'SSF Hardcore Affliction',
];

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [itemType, setItemType] = useState('All');
  const [league, setLeague] = useState('Affliction');
  const router = useRouter();

  async function doSearch(query: string, type: string, league: string) {
    if (!query.trim()) return;
    setIsLoading(true);
    setError(null);
    setSearchResults([]); // Clear results immediately
    try {
      let allResults: SearchItem[] = [];
      const typesToFetch = type === 'All' ? ITEM_TYPES.filter(t => t.value !== 'All').map(t => t.value) : [type];
      for (const t of typesToFetch) {
        const res = await fetch(`/api/poe-ninja?itemType=${encodeURIComponent(t)}&league=${encodeURIComponent(league)}`);
        if (!res.ok) continue;
        const data = await res.json();
        const filtered = (data.lines || []).filter((item: any) =>
          item.name.toLowerCase().includes(query.toLowerCase())
        );
        allResults = allResults.concat(filtered);
      }
      setSearchResults(allResults);
    } catch (err) {
      setError('Failed to fetch item data.');
    } finally {
      setIsLoading(false);
    }
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    doSearch(searchQuery, itemType, league);
  };

  const handleTrendingClick = (item: string) => {
    setSearchQuery(item);
    doSearch(item, itemType, league);
  };

  const handleItemClick = (item: SearchItem) => {
    if (item.detailsId) {
      router.push(`/item/${item.detailsId}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-fuchsia-700 to-orange-400">
      <NavBar />
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Search Header */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-white mb-4">Item Search</h2>
            <p className="text-fuchsia-100 text-lg">
              Search for any item in Path of Exile 2 and get real-time trade values
            </p>
          </div>

          {/* Filters */}
          <form onSubmit={handleSearch} className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-center mb-4">
              <select
                value={league}
                onChange={e => setLeague(e.target.value)}
                className="px-4 py-2 rounded-lg border-2 border-fuchsia-400 bg-purple-950/60 text-white focus:outline-none focus:border-orange-400"
              >
                {LEAGUES.map(l => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
              <select
                value={itemType}
                onChange={e => setItemType(e.target.value)}
                className="px-4 py-2 rounded-lg border-2 border-fuchsia-400 bg-purple-950/60 text-white focus:outline-none focus:border-orange-400"
              >
                {ITEM_TYPES.map(t => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
              <div className="relative flex-1 w-full max-w-md">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for items (e.g., 'Shavronne', 'Kaom', 'Briskwrap')"
                  className="w-full px-6 py-4 bg-purple-950/60 border-2 border-fuchsia-400 rounded-xl text-white placeholder-fuchsia-200 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-200/30 transition-all shadow-md"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="absolute right-2 top-2 bg-orange-400/90 hover:bg-orange-300 text-fuchsia-900 px-6 py-2 rounded-lg font-semibold transition-all border-2 border-fuchsia-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-fuchsia-400 disabled:opacity-50"
                >
                  {isLoading ? 'Searching...' : 'Search'}
                </button>
              </div>
            </div>
          </form>

          {/* Error State */}
          {error && (
            <div className="text-center py-4">
              <p className="text-red-400 text-lg">{error}</p>
            </div>
          )}

          {/* Loading Spinner */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="w-16 h-16 border-4 border-orange-400 border-t-fuchsia-600 border-b-purple-900 rounded-full animate-spin mb-6"></div>
              <p className="text-fuchsia-100 text-lg">Searching for items...</p>
            </div>
          )}

          {/* Search Results */}
          {searchResults.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-white mb-4">Search Results</h3>
              {searchResults.map((item) => (
                <div
                  key={item.id || item.detailsId}
                  className="cursor-pointer bg-purple-950/60 backdrop-blur-sm rounded-xl p-6 border-2 border-fuchsia-700/40 hover:border-orange-400/60 transition-all shadow-xl flex items-center gap-6 group hover:bg-purple-900/80"
                  onClick={() => handleItemClick(item)}
                >
                  <img src={item.icon} alt={item.name} className="w-16 h-16 rounded-md bg-black/30 border border-fuchsia-700/40" />
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold text-white mb-1">{item.name}</h4>
                    <div className="text-fuchsia-200 text-sm mb-1">{item.typeLine}</div>
                    <div className="text-orange-300 font-bold text-lg">{item.chaosValue} <span className="text-fuchsia-200 font-normal text-base">chaos</span></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!isLoading && searchResults.length === 0 && searchQuery && !error && (
            <div className="text-center py-12">
              <p className="text-fuchsia-200 text-lg">No items found. Try a different search term.</p>
            </div>
          )}

          {/* Popular Searches */}
          {/* TODO: Once Path of Exile 2 is released and APIs provide PoE2 data, revisit and improve this feature to show trending or popular PoE2 items. */}
          {/* (Popular Searches section removed for now) */}
        </div>
      </main>
    </div>
  );
}

// Add fade-in animation for tooltip
// In your global CSS (e.g., app/globals.css), add:
// .animate-fade-in { animation: fadeIn 0.2s ease; }
// @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } } 
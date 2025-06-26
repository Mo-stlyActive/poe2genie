import Image from "next/image";
import styles from "./page.module.css";
import NavBar from "./NavBar";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-fuchsia-700 to-cyan-400 relative overflow-hidden">
      <NavBar />
      {/* Starfield Animated Background */}
      <div className="absolute inset-0 z-0 pointer-events-none starfield" />
      {/* Hero Section */}
      <main className="container mx-auto px-4 py-24 relative z-10">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 font-hero drop-shadow-[0_2px_24px_rgba(0,255,255,0.18)]">
            Forge Your Legend.<br />
            <span className="block text-4xl md:text-6xl font-black tracking-tight bg-gradient-to-r from-fuchsia-400 via-orange-400 to-cyan-300 bg-clip-text text-transparent animate-gradient-x">poe2genie</span>
          </h1>
          <p className="text-2xl md:text-3xl text-fuchsia-100 max-w-2xl mx-auto mb-10 font-medium drop-shadow-lg">
            The ultimate AI-powered build & trade companion for Path of Exile 2.<br />
            <span className="text-cyan-300">Search. Plan. Dominate. Repeat.</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
            <a href="/search" className="relative group inline-block px-10 py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-orange-400 via-fuchsia-400 to-cyan-400 text-fuchsia-950 shadow-xl border-2 border-fuchsia-200 hover:scale-105 hover:shadow-2xl transition-all focus:outline-none focus:ring-4 focus:ring-cyan-400/40">
              <span className="absolute -inset-1 bg-gradient-to-r from-orange-400 via-fuchsia-400 to-cyan-400 rounded-xl blur-lg opacity-60 group-hover:opacity-90 transition-all z-0" />
              <span className="relative z-10 flex items-center gap-2">
                <svg className="w-6 h-6 text-orange-500 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                Start Searching
              </span>
            </a>
            <a href="/builds" className="relative group inline-block px-10 py-4 rounded-xl font-bold text-lg border-2 border-fuchsia-300 text-fuchsia-100 bg-purple-950/60 hover:bg-fuchsia-900/40 shadow-xl hover:scale-105 hover:shadow-2xl transition-all focus:outline-none focus:ring-4 focus:ring-fuchsia-400/40 animate-pulse">
              <span className="absolute -inset-1 bg-gradient-to-r from-fuchsia-400 via-orange-400 to-cyan-400 rounded-xl blur-lg opacity-40 group-hover:opacity-70 transition-all animate-pulse z-0" />
              <span className="relative z-10 flex items-center gap-2">
                <svg className="w-6 h-6 text-fuchsia-300 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Create Build
              </span>
            </a>
          </div>
          {/* Feature Tags */}
          <div className="flex flex-wrap gap-4 justify-center mt-6 animate-fade-in">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-fuchsia-900/70 border border-fuchsia-400 text-fuchsia-100 font-semibold text-sm shadow-md animate-float" style={{animationDelay:'0.1s'}}>
              <svg className="w-4 h-4 text-cyan-300" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 12.93V15a1 1 0 11-2 0v-.07A6.002 6.002 0 014 9a6 6 0 1112 0 6.002 6.002 0 01-5 5.93z" /></svg>
              AI-Powered
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-fuchsia-700/80 border border-fuchsia-300 text-white font-semibold text-sm shadow-md animate-float" style={{animationDelay:'0.3s'}}>
              <svg className="w-4 h-4 text-cyan-200" fill="currentColor" viewBox="0 0 20 20"><path d="M2 10a8 8 0 1116 0A8 8 0 012 10zm8-4a4 4 0 100 8 4 4 0 000-8z" /></svg>
              Free Forever
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-900/80 border border-fuchsia-400 text-fuchsia-100 font-semibold text-sm shadow-md animate-float" style={{animationDelay:'0.4s'}}>
              <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20"><path d="M3 3h14v2H3V3zm0 4h14v2H3V7zm0 4h14v2H3v-2zm0 4h14v2H3v-2z" /></svg>
              Ultra Fast
            </span>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Item Search Feature */}
          <div className="bg-purple-950/60 backdrop-blur-sm rounded-xl p-6 border border-fuchsia-700/40 hover:border-orange-400/60 transition-all shadow-xl">
            <div className="w-12 h-12 bg-orange-300/20 rounded-lg flex items-center justify-center mb-4 shadow-md">
              <svg className="w-6 h-6 text-orange-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Item Search</h3>
            <p className="text-fuchsia-100 mb-4">
              Search for any item in Path of Exile 2 and get real-time trade values, 
              detailed stats, and AI-powered explanations.
            </p>
            <a href="/search" className="text-orange-300 hover:text-orange-200 font-medium underline underline-offset-4">
              Try it now →
            </a>
          </div>

          {/* Build Planner Feature */}
          <div className="bg-purple-950/60 backdrop-blur-sm rounded-xl p-6 border border-fuchsia-700/40 hover:border-orange-400/60 transition-all shadow-xl">
            <div className="w-12 h-12 bg-fuchsia-400/20 rounded-lg flex items-center justify-center mb-4 shadow-md">
              <svg className="w-6 h-6 text-fuchsia-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Build Planner</h3>
            <p className="text-fuchsia-100 mb-4">
              Plan and save your character builds. Share them with the community 
              and get AI suggestions for improvements.
            </p>
            <a href="/builds" className="text-orange-300 hover:text-orange-200 font-medium underline underline-offset-4">
              Create build →
            </a>
          </div>

          {/* AI Tools Feature */}
          <div className="bg-purple-950/60 backdrop-blur-sm rounded-xl p-6 border border-fuchsia-700/40 hover:border-orange-400/60 transition-all shadow-xl">
            <div className="w-12 h-12 bg-fuchsia-400/20 rounded-lg flex items-center justify-center mb-4 shadow-md">
              <svg className="w-6 h-6 text-fuchsia-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">AI Assistant</h3>
            <p className="text-fuchsia-100 mb-4">
              Get instant answers to your PoE questions, build advice, and 
              natural language search powered by advanced AI.
            </p>
            <a href="/ai" className="text-orange-300 hover:text-orange-200 font-medium underline underline-offset-4">
              Ask AI →
            </a>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-purple-950/40 backdrop-blur-sm rounded-xl p-8 border border-fuchsia-700/40 shadow-lg">
          <h3 className="text-2xl font-bold text-white text-center mb-8">Why Choose poe2genie?</h3>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-orange-300 mb-2">10K+</div>
              <div className="text-fuchsia-100">Items Database</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-fuchsia-300 mb-2">Real-time</div>
              <div className="text-fuchsia-100">Price Updates</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-200 mb-2">AI-Powered</div>
              <div className="text-fuchsia-100">Insights</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-fuchsia-200 mb-2">Free</div>
              <div className="text-fuchsia-100">Forever</div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-fuchsia-700/40 bg-purple-950/60 backdrop-blur-sm mt-16 shadow-inner">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-fuchsia-200">
            <p>&copy; 2024 poe2genie. Built for Path of Exile 2 players.</p>
            <p className="mt-2 text-sm">
              Not affiliated with Grinding Gear Games. All game data belongs to their respective owners.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

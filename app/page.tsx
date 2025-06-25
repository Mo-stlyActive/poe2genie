import Image from "next/image";
import styles from "./page.module.css";
import NavBar from "./NavBar";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-fuchsia-700 to-orange-400">
      <NavBar />
      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Your AI-Powered
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-fuchsia-400 to-purple-600">
              Path of Exile 2
            </span>
            Companion
          </h2>
          <p className="text-xl text-fuchsia-100 max-w-3xl mx-auto mb-8">
            Search items, plan builds, and get AI-powered advice for Path of Exile 2. 
            Everything you need to master the game, all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/search" className="bg-orange-400/90 hover:bg-orange-300 text-fuchsia-900 px-8 py-3 rounded-lg font-semibold transition-all text-center border-2 border-fuchsia-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-fuchsia-400">
              Start Searching Items
            </a>
            <a href="/builds" className="border-2 border-fuchsia-300 text-fuchsia-100 px-8 py-3 rounded-lg font-semibold hover:bg-fuchsia-900/30 transition-all text-center shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-orange-300">
              Create Build
            </a>
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

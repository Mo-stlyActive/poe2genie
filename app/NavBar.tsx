import Link from "next/link";

export default function NavBar() {
  return (
    <header className="border-b border-fuchsia-700/40 bg-purple-950/60 backdrop-blur-sm shadow-md z-20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-fuchsia-600 rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-sm">P2</span>
            </div>
            <span className="text-2xl font-bold text-white">poe2genie</span>
          </div>
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="text-white font-medium">Home</Link>
            <Link href="/search" className="text-fuchsia-200 hover:text-white transition-colors">Item Search</Link>
            <Link href="/builds" className="text-fuchsia-200 hover:text-white transition-colors">Build Planner</Link>
            <Link href="/ai-chat" className="text-fuchsia-200 hover:text-white transition-colors">🤖 AI Chat</Link>
          </nav>
        </div>
      </div>
    </header>
  );
} 
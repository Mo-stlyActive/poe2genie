'use client';

import { useState, useRef, useEffect } from 'react';
import NavBar from "../NavBar";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function AIChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your Path of Exile AI assistant. Ask me anything about PoE mechanics, items, builds, trading, or general gameplay! 🤖",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: inputText }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get response');
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.answer,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `Sorry, I encountered an error: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again or check if the AI service is configured properly.`,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestedQuestions = [
    "What is the best league starter build?",
    "How does the trade system work?",
    "What are the best items for a new player?",
    "How do I craft good items?",
    "What's the difference between leagues?",
    "How do I make currency efficiently?",
    "What are the best farming strategies?",
    "How do I understand item mods?",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-fuchsia-700 to-cyan-400 relative overflow-hidden">
      <NavBar />
      {/* Starfield Animated Background */}
      <div className="absolute inset-0 z-0 pointer-events-none starfield" />
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-24 relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 font-hero drop-shadow-[0_2px_24px_rgba(0,255,255,0.18)] bg-gradient-to-r from-fuchsia-400 via-orange-400 to-cyan-300 bg-clip-text text-transparent animate-gradient-x">
            AI PoE Assistant
          </h1>
          {/* PoE2 Placeholder Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500/20 to-fuchsia-500/20 border border-orange-400/40 rounded-full backdrop-blur-sm animate-pulse mb-4">
            <div className="w-2 h-2 bg-orange-400 rounded-full animate-ping"></div>
            <span className="text-orange-300 text-sm font-medium">PoE1 Data • PoE2 Coming Soon</span>
            <div className="w-2 h-2 bg-fuchsia-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
          </div>
          <p className="text-xl md:text-2xl text-fuchsia-100 max-w-2xl mx-auto font-medium drop-shadow-lg">
            Ask me anything about Path of Exile! I can help with builds, items, trading, mechanics, and more.
          </p>
        </div>

        {/* Chat Container */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-purple-950/80 rounded-2xl shadow-2xl border-2 border-fuchsia-700/40 overflow-hidden">
            {/* Messages */}
            <div className="h-96 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-2xl ${
                      message.isUser
                        ? 'bg-gradient-to-r from-orange-400 to-orange-500 text-fuchsia-900'
                        : 'bg-gradient-to-r from-cyan-900/60 to-fuchsia-900/60 text-fuchsia-100 border border-cyan-400/40'
                    }`}
                  >
                    <div className="whitespace-pre-wrap leading-relaxed">
                      {message.text}
                    </div>
                    <div className={`text-xs mt-2 ${message.isUser ? 'text-fuchsia-800' : 'text-fuchsia-300'}`}>
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gradient-to-r from-cyan-900/60 to-fuchsia-900/60 text-fuchsia-100 border border-cyan-400/40 px-4 py-3 rounded-2xl">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                      <span>Thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="p-6 border-t border-fuchsia-700/40">
              <div className="flex gap-4">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Ask me about PoE builds, items, trading, mechanics..."
                  className="flex-1 px-4 py-3 bg-purple-900/60 border-2 border-fuchsia-400 rounded-xl text-white placeholder-fuchsia-200 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200/30 transition-all"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !inputText.trim()}
                  className="bg-gradient-to-r from-cyan-400 to-fuchsia-400 hover:from-cyan-300 hover:to-fuchsia-300 text-purple-900 px-6 py-3 rounded-xl font-bold border-2 border-cyan-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
                >
                  Send
                </button>
              </div>
            </form>
          </div>

          {/* Suggested Questions */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-white mb-4 text-center">💡 Suggested Questions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => setInputText(question)}
                  className="text-left p-3 bg-purple-900/60 border border-fuchsia-700/40 rounded-lg text-fuchsia-200 hover:bg-purple-800/60 hover:border-cyan-400/60 transition-all"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 
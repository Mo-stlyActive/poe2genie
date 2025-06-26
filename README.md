# poe2genie: Path of Exile 2 Build & Trade AI Helper

A modern web application for Path of Exile players to search for items, plan builds, and get AI-powered assistance.

## Features

- **Item Search & Trade Values**: Search for items and view current trade values via poe.ninja API
- **Build Planner**: Create, save, and share character builds with equipment and passive tree planning
- **AI-Powered Features**:
  - 🤖 **AI Item Analysis**: Get detailed insights about items, build suggestions, and trade advice
  - 🤖 **AI Build Advisor**: Receive personalized build advice and improvement suggestions
  - 🤖 **AI Chat Assistant**: Ask questions about PoE mechanics, builds, trading, and more
- **Modern UI**: Beautiful, responsive design with PoE-inspired purple/orange theme
- **PoE2 Ready**: Designed to transition to PoE2 data when available

## AI Setup

To enable AI features, you'll need to set up an OpenAI API key:

1. **Get an OpenAI API Key**:
   - Visit [OpenAI Platform](https://platform.openai.com/api-keys)
   - Create an account and generate an API key
   - The free tier includes $5 of credits (sufficient for testing)

2. **Configure Environment Variables**:
   Create a `.env.local` file in the project root:
   ```bash
   OPENAI_API_KEY=your_openai_api_key_here
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

3. **Restart the Development Server**:
   ```bash
   npm run dev
   ```

## Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/poe2genie.git
   cd poe2genie
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables** (see AI Setup section above)

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser** and navigate to `http://localhost:3000`

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **AI Integration**: OpenAI API (GPT-3.5-turbo)
- **Data Sources**: poe.ninja API for item prices and data
- **Deployment**: Vercel (recommended)

## Project Structure

```
poe2genie/
├── app/
│   ├── api/                    # API routes
│   │   ├── ai/                # AI endpoints
│   │   └── poe-ninja/         # PoE data proxy
│   ├── builds/                # Build planner pages
│   ├── item/                  # Item details pages
│   ├── search/                # Item search page
│   ├── ai-chat/               # AI chat interface
│   └── lib/                   # Utility functions
│       └── ai.ts              # AI service layer
├── public/                    # Static assets
└── README.md
```

## AI Features

### Item Analysis
- Detailed item descriptions and mechanics explanations
- Build suggestions that benefit from the item
- Trade advice and price analysis
- Meta analysis and popularity insights

### Build Advisor
- Personalized build improvement suggestions
- Alternative approaches and item recommendations
- Playstyle notes and tips
- Potential issues and weaknesses identification

### AI Chat Assistant
- General PoE knowledge and FAQ
- Build strategy discussions
- Trading advice and market insights
- Game mechanics explanations

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [poe.ninja](https://poe.ninja/) for providing item price data
- [Path of Exile](https://www.pathofexile.com/) community for inspiration
- OpenAI for providing the AI capabilities

## Future Enhancements

- PoE2 data integration when available
- Advanced build planner with visual skill tree
- Trade tracking and notifications
- Community features and build sharing
- Internationalization (French, Spanish support)
- Local AI models for cost optimization

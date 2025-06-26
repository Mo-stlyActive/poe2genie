# poe2genie: Path of Exile 2 Build & Trade AI Helper

## About the Developer
I am a software developer with a background in tech-ed, having worked in the field for 5 years after graduating in software development. I am now pivoting to AI-driven development, aiming to leverage modern AI tools and frameworks to build real-world, scalable applications. My goal is to secure a software development position in Europe, particularly in Valencia (Spain) or Brussels (Belgium). This project is designed as a showcase of my ability to use AI agents and modern technologies to deliver impactful solutions, while keeping costs minimal.

---

## Overview
A modern web application for Path of Exile players to:
- Search for items and view current trade values
- Plan, save, and share character builds
- Use AI tools for item/build explanations, build advice, natural language search, and game FAQs

---

## Tech Stack

### Frontend
- **Framework:** Next.js (React-based, SSR/SSG, API routes)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui or Chakra UI
- **State Management:** React Context (or Zustand/Jotai if needed)
- **Form Handling:** React Hook Form

### Backend
- **API Layer:** Next.js API routes
- **Database:** PostgreSQL (free tier via Supabase, Neon, Railway, or Render)
- **ORM:** Prisma
- **Authentication:** NextAuth.js

### AI/LLM Integration
- **Provider:** OpenAI API (ChatGPT/GPT-4, for LLM features; start with free trial/credits)
- **(Future) Open Source LLM:** Ollama, HuggingFace (for local/cheaper inference)

### External APIs
- **Path of Exile Data:** poe.ninja API (item prices, meta data)
- **(Optional) Official PoE API:** For more detailed or real-time data

### DevOps/Deployment
- **Frontend/Backend Hosting:** Vercel (free tier)
- **Database Hosting:** Railway, Render, Supabase, or Neon (free PostgreSQL)
- **Version Control:** Git + GitHub

### Tooling
- **AI Coding Assistant:** Cursor
- **Linting/Formatting:** ESLint, Prettier
- **Testing:** Jest, React Testing Library
- **Documentation:** README.md, (optional) Storybook

---

## Cost Optimization
- All services used are on free tiers or open source.
- AI features default to OpenAI API (with free credits); future migration to open-source LLMs (Ollama) planned.
- No paid dependencies or hosting required for MVP.

---

## Product Requirements Document (PRD)

### Project Name
poe2genie: Path of Exile 2 Build & Trade AI Helper

### Target Users
- Path of Exile players (new and experienced)
- Players interested in trading, build planning, and learning game mechanics

### Core Features (MVP)
1. **Item Search & Trade Value Lookup**
   - Search for items by name/type
   - View current trade values (via poe.ninja API)
   - View item details

2. **Build Planner & Sharing**
   - Create and save builds (start simple: text or basic form)
   - Share builds via link

3. **AI Tools**
   - **Item/Build Description Generator:** LLM generates human-readable explanations/tips
   - **Build Advisor:** LLM suggests builds or improvements based on user input
   - **Search Query Enhancer:** LLM interprets natural language queries and applies filters
   - **FAQ/Help Chatbot:** LLM answers PoE-related questions

### Future Features (Post-MVP)
- User authentication and profiles
- Advanced build planner (visual skill tree, item import)
- Trade tracking and notifications
- Community features (comments, ratings)
- More advanced AI integrations (e.g., personalized recommendations)
- **Internationalization (i18n):** Add support for French and Spanish (and possibly other languages) to make the app accessible to a wider European audience and demonstrate global readiness.

### User Stories
- As a player, I want to search for items and see their current trade value.
- As a player, I want to get an explanation of what an item or build does.
- As a player, I want to input my playstyle and get build suggestions.
- As a player, I want to ask questions about PoE and get instant answers.
- As a player, I want to save and share my builds with others.

### Success Criteria
- Users can search for items and see up-to-date prices.
- Users can generate AI-powered explanations for items/builds.
- Users can get build advice from the AI.
- Users can use natural language to search for items/builds.
- Users can interact with an AI chatbot for PoE questions.

### Non-Goals
- Real-time in-game integration
- Full-featured trade platform (focus is on helper tools, not replacing official trade)

### Design/UX Principles
- Clean, modern, and responsive UI
- Fast and intuitive search
- Clear separation between AI-generated and official data
- Accessibility and mobile-friendly

---

## Future Enhancement: Internationalization (i18n)
- **Goal:** Add support for French and Spanish (at minimum) to make the app accessible to a wider European audience and demonstrate internationalization skills.
- **Approach:** Use a library like `next-i18next` for Next.js. Store translations in JSON files (e.g., `en.json`, `fr.json`, `es.json`).
- **Timing:** Planned as a post-MVP enhancement, after core features are stable.
- **Benefits:**
  - Broader audience reach
  - Professional polish
  - Highly relevant for European job market
- **Effort:**
  - Initial setup: 1–2 days
  - Ongoing: Add translations for new features as needed

---

## Notes
- This project is designed to be as cost-effective as possible, leveraging free tiers and open-source tools.
- AI features will start with OpenAI API and may migrate to open-source LLMs for zero-cost operation in the future.
- Internationalization is a planned enhancement to further increase the project's value for European employers.

## Vision
A modern, AI-powered Path of Exile 2 build & trade helper, with a focus on extensibility, modularity, and a beautiful, PoE-inspired UI.

## Features (Current)
- Modern, dark UI with purple/orange color palette
- CORS proxy for poe.ninja API requests
- Item search across all item types and leagues
- Dedicated item details page
- Build planner with equipment slots and searchable equipment picker
- Local storage for builds and shareable links
- Modular, extensible codebase

## AI & PoE2 Focus
- Designed for future AI integration (build suggestions, trade analysis)
- All public APIs currently provide PoE1 data; codebase and docs include TODOs to revisit for PoE2

## Limitations
- No PoE2 data available yet (pending public API release)
- Some features (e.g., AI build suggestions) are placeholders for future development

## Next Steps
- Integrate PoE2 data when available
- Add AI-powered build and trade features
- Expand build planner and item database 

## TODO: AI Improvements & Enhancements

### Phase 1: Context Enhancement (High Priority)
- [ ] **Real-time Data Integration**
  - Feed current league mechanics and meta data to AI prompts
  - Include real-time item prices and availability from poe.ninja
  - Add current build popularity data and meta analysis
  - Include recent patch notes and balance changes

- [ ] **Enhanced Prompting**
  - Implement few-shot prompting with high-quality PoE examples
  - Add structured output formats (JSON) for better parsing
  - Include build templates and skill gem setups
  - Add item recommendations with current prices

### Phase 2: Personalization & User Experience (Medium Priority)
- [ ] **User Context & Memory**
  - Remember user preferences and playstyle
  - Adapt responses based on user's experience level
  - Consider user's current build and suggest improvements
  - Track user's previous questions for context

- [ ] **Advanced Features**
  - Build comparison and optimization suggestions
  - Item crafting advice with current meta
  - Farming strategy recommendations
  - Trade advice with current market conditions
  - Leveling guides and progression paths

### Phase 3: Cost Optimization & Performance (Low Priority)
- [ ] **Efficiency Improvements**
  - Implement response caching for common questions
  - Use local AI models (Ollama) for basic queries
  - Implement smart prompt engineering to reduce token usage
  - Add conversation memory to reduce redundant context

- [ ] **Alternative AI Providers**
  - Research and implement Claude API integration
  - Consider local models for cost reduction
  - Implement fallback mechanisms for API failures

### Phase 4: Advanced AI Features (Future)
- [ ] **Build Optimization**
  - AI-powered passive tree optimization
  - Skill gem setup recommendations
  - Item synergy analysis
  - Build viability scoring

- [ ] **Market Analysis**
  - Price trend predictions
  - Investment opportunity identification
  - Market arbitrage suggestions
  - Supply/demand analysis

### Implementation Notes
- All improvements should maintain the current UI/UX consistency
- Consider implementing feature flags for gradual rollout
- Monitor API usage and costs closely
- Gather user feedback to prioritize improvements
- Maintain backward compatibility during updates 
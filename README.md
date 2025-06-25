# poe2genie

poe2genie is a modern, modular, and extensible Path of Exile build & trade AI helper, designed with a focus on Path of Exile 2. The app features a dark, PoE-inspired theme with a purple/orange color palette, and is built using Next.js, TypeScript, and Tailwind CSS.

## Features

- **Modern UI**: Clean, dark, and responsive interface inspired by PoE, with a purple/orange color palette.
- **AI-Ready**: Designed for future AI-powered build suggestions and trade analysis.
- **CORS Proxy**: Uses a Next.js API route to proxy poe.ninja API requests, avoiding CORS issues and keeping the frontend clean.
- **Item Search**: Search across all item types and leagues, with dropdowns for league and item type. Results are merged if "All" is selected.
- **Item Details**: Dedicated item details page for each item, displaying all relevant info.
- **Build Planner**: Local-storage-based build planner with shareable links and equipment slots for all gear types. Equipment selection uses a searchable picker, ready for future AI integration.
- **Extensible**: Modular codebase, ready for future enhancements and PoE2 data integration.

## PoE2 Data

**Note:** All public APIs (including poe.ninja) currently provide PoE1 data. The codebase and README include TODOs to revisit this when PoE2 launches and public data becomes available.

## Development

- Built with Next.js, TypeScript, and Tailwind CSS.
- Modern, maintainable, and future-proofed for PoE2.

---

For more details, see the code and comments throughout the project.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

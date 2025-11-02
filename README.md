# Gray Code Editor

A modern, web-based code editor built with Next.js and TypeScript, designed for editing, managing and visualizing Gray code sequences (or any binary/bitwise workflows).  
This project provides a flexible editor interface, plugin architecture and visual tools to work with binary/Gray code conversions, bit-flips and related concepts.

## Features

- Interactive editor UI built with Next.js + TypeScript.  
- Real-time Gray code ↔ binary conversion with live preview.  
- Bit-flip visualization: highlight transitions between successive Gray codes.  
- Syntax-highlighted code editor area (supports multiple languages but optimised for binary/bit-level workflows).  
- Plugin module structure: extend conversion logic, add custom visualisations, support alternative encodings (e.g., Gray code variants, reflected/unreflected).  
- Responsive UI, deployable to modern front-end hosting (e.g., Vercel).

## Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)  
- npm or yarn (or pnpm)  

### Installation

```bash
git clone https://github.com/ZatChBELL0/gray-code-editor.git
cd gray-code-editor
npm install
# or
yarn
# or
pnpm install
```

### Running Locally

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.  
Edit `app/page.tsx` or other files under `app/`, `components/`, etc., and the page will auto-reload with your changes.

### Building for Production

```bash
npm run build
# or
yarn build
# or
pnpm build
```

Then run:

```bash
npm run start
# or
yarn start
# or
pnpm start
```

## Folder Structure

```
.
├── app/                # Next.js App directory (pages/layouts/components)
├── components/         # Shared UI components
├── hooks/              # Custom React hooks
├── lib/                # Utility libraries (conversion logic, bit-flip tools)
├── modules/            # Feature modules (e.g., Gray code variant modules)
├── prisma/             # (Optional) Prisma setup if using a database
├── public/             # Static assets
├── styles/             # Global and module styles (if applicable)
├── package.json
├── next.config.ts
├── tsconfig.json
└── README.md
```

## Usage

1. Navigate to the editor page.  
2. Enter a binary number or a Gray code sequence.  
3. The conversion engine will compute the corresponding Gray code or binary.  
4. Visualise the transitions (bit flips) between successive codes.  
5. Use modules/plugins to customize the workflow or add new encodings.

## Contributing

Contributions are welcome! If you’d like to:

- Add new encoding variants (e.g., non-reflected Gray code, n-ary Gray codes)  
- Improve UI/UX (themes, dark mode, accessibility)  
- Improve performance or refactor code  
- Add tests and CI workflows

Please:

1. Fork the repository  
2. Create a new branch (e.g., `feature/my-feature`)  
3. Make your changes and commit with clear messages  
4. Submit a pull request, describing your change and why it’s useful

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## About

Built by [ZatChBELL0](https://github.com/ZatChBELL0).  
If you’d like to explore or use this editor in your own workflow (for education, digital logic design, bit-level simulations, etc.), feel free to fork or adapt/customise.

---

*Happy coding and happy bit-flipping!* 🧮  

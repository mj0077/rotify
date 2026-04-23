# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ROTIFY is a Next.js 14 website for a homemade tiffin/meal delivery service based in Meerut, India. It features a dark-themed UI with custom animations, meal plan listings, and a scheduling system that submits data to Google Sheets.

## Development Commands

```bash
# Start development server (runs on localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run ESLint
npm run lint
```

## Architecture

### Framework & Routing
- **Next.js 14** with App Router (file-based routing in `/app`)
- All components are React Client Components using `"use client"` directive
- API routes in `/app/api/submit/route.js` handle form submissions to Google Sheets

### Key Directories
- `/app` - Pages, layouts, loading states, and API routes
- `/components` - Reusable React components (Navbar, Footer, ScheduleModal, etc.)
- `/assets` - Fonts, images, global CSS, and Zod schemas
- `/public` - Static assets

### Styling
- **Tailwind CSS** with custom configuration
- Custom fonts: `NeueMachina` (primary), `29LT` (secondary), `Batangas`
- Dark theme with CSS custom properties (HSL color format)
- Custom scrollbar and responsive breakpoints (includes custom `xs: 400px`)

### Design System (Taste-Skill Enhanced)
The UI follows premium design patterns with:

**Color Palette:**
- Primary Yellow: `#FCDF59`
- Red Gradient: `#971303` to `#FF000D`
- WhatsApp Green: `#25D366` to `#128C7E`
- Dark Background: `#111` / `zinc-950`

**Animation Patterns:**
- **Double-Bezel Architecture**: Outer shell (`p-[1px]` + gradient border) + Inner core (content with `backdrop-blur`)
- **Magnetic Interactions**: Framer Motion's `useMotionValue`/`useSpring` pulling elements toward cursor
- **Spring Physics**: Standard config `{ stiffness: 100, damping: 20 }`, Magnetic config `{ stiffness: 150, damping: 15, mass: 0.1 }`
- **3D Tilt Effects**: `perspective: 1000` + `rotateX`/`rotateY` transforms on hover
- **Custom Easing**: `[0.32, 0.72, 0, 1]` (cubic-bezier for fluid motion)
- **Staggered Reveals**: Parent variants with `staggerChildren: 0.12`

### Form Handling
- **Zod** schema validation in `/assets/schema/formSchema.ts`
- Schedule modal submits to `/api/submit` which appends to Google Sheets
- Form fields: name, phNumber (10-digit Indian), startDate/endDate (ISO format), breakfast/lunch/dinner (booleans)

### Data
- Meal plans data is hardcoded in `/Meals.js` (Breakfast, Lunch, Dinner with Standard/Deluxe plans)
- Prices are in INR (₹80-120 per plate, ₹2000-3200 monthly)

## Important Implementation Details

### Path Aliases
- Use `@/*` for imports from the project root (configured in `jsconfig.json`)
- Example: `import Navbar from "@/components/Navbar"`

### Fonts
- Custom fonts are loaded via `@font-face` in `/assets/styles/globals.css`
- Font files are in `/assets/fonts/`
- Apply via inline style: `style={{ fontFamily: "NeueMachina, serif" }}`

### Image Optimization
- Uses Next.js `Image` component with placeholders
- Background images are often handled via CSS `background-image` for overlays
- Food images in Hero use a 2x2 grid collage pattern

### Animation Libraries
- **GSAP** with `@gsap/react` for advanced animations (Hero entrance sequence)
- **Framer Motion** for component-level animations (hover effects, modal transitions, staggered reveals)

### Linting
- ESLint with `next/core-web-vitals` configuration only

## Environment Variables

Create `.env.local` file with these variables for Google Sheets integration:

```bash
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_SERVICE_ACCOUNT_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=your-google-sheet-id
```

**Note**: The private key must have newlines escaped as `\n` or use `replace(/\\n/g, '\n')` when reading.

## Troubleshooting

**Build errors with "_document not found" or stale cache:**
```bash
rm -rf .next
npm run build
```

**Google Sheets API errors:**
- Verify service account has Editor access to the spreadsheet
- Check that `GOOGLE_SHEET_ID` is the actual spreadsheet ID (from URL)
- Ensure private key newlines are properly handled

**Font loading issues:**
- Fonts are loaded via CSS `@font-face`, not Next.js `next/font`
- Verify font files exist in `/assets/fonts/`

## Component Patterns

When adding new interactive components, follow these established patterns:

1. **Use "use client"** directive at the top
2. **Import from path aliases**: `@/components`, `@/assets/images`
3. **Color tokens**: Use `#FCDF59` for yellow, `#971303` for dark red
4. **Animation**: Use Framer Motion for hover effects, GSAP for page-load sequences
5. **Responsive**: Mobile-first, custom `xs:` breakpoint at 400px

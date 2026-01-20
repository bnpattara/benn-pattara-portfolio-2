<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Benn Pattara | Portfolio Style Guide

This comprehensive style guide documents all visual components, design tokens, and integrations used throughout the portfolio website.

---

## 🎨 Design Philosophy

The design system is built on **minimalist brutalism** with a focus on:
- **Surgical Precision**: Clean lines, intentional spacing, and typographic hierarchy
- **Subtle Sophistication**: Grayscale aesthetics with strategic contrast
- **Tactile Interactions**: Custom cursor, hover states, and micro-animations
- **Editorial Excellence**: Magazine-inspired layouts with generous whitespace

---

## 📐 Color Palette

### Primary Colors
| Color Name | Hex Code | Usage |
|------------|----------|-------|
| **Stone 900** | `#1c1917` | Primary text, headings, borders, backgrounds (CTA/footer accents) |
| **Stone 800** | `#292524` | Hover states for dark backgrounds |
| **Stone 600** | `#57534e` | Body text, secondary content |
| **Stone 500** | `#78716c` | Metadata, supporting text |
| **Stone 400** | `#a8a29e` | Muted text, inactive navigation, labels |
| **Stone 200** | `#e7e5e4` | Borders, dividers |
| **Stone 100** | `#f5f5f4` | Page background |
| **Stone 50** | `#fafaf9` | Card backgrounds, image placeholders |
| **White** | `#ffffff` | Card backgrounds, reversed text, custom cursor |

### Semantic Colors
- **Background (Primary)**: `#f5f5f4` (Stone 100)
- **Background (Cards)**: `white` or `#fafaf9` (Stone 50)
- **Text (Primary)**: `#1c1917` (Stone 900)
- **Text (Secondary)**: `#57534e` - `#78716c` (Stone 600-500)
- **Accent (Dark)**: `#1c1917` (Stone 900) for CTAs and emphasis
- **Selection**: Background `#1c1917`, Text `#ffffff`

### Visual Effects
- **Grayscale Filter**: Applied to images by default, removed on hover (`grayscale` → `grayscale-0`)
- **Opacity Adjustments**: Images at 80-90% opacity for editorial sophistication
- **Mix Blend Difference**: Custom cursor uses `mix-blend-difference` for contrast inversion

---

## 🔤 Typography

### Font Family
```css
font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
```
- **Primary**: Helvetica Neue (sans-serif)
- **Fallbacks**: Helvetica, Arial, system sans-serif
- **Smoothing**: `-webkit-font-smoothing: antialiased`, `-moz-osx-font-smoothing: grayscale`

### Type Scale

| Element | Size | Weight | Tracking | Transform | Line Height | Usage |
|---------|------|--------|----------|-----------|-------------|-------|
| **Display Hero** | 5xl-9xl (3rem-8rem) | 300 (Light) | -0.05em (Tighter) | Uppercase | 0.9-0.95 | Page titles, hero headings |
| **Headline Large** | 4xl-6xl (2.25rem-3.75rem) | 300 (Light) | -0.025em (Tight) | Uppercase/None | 1.1 | Section headings, About intro |
| **Headline Medium** | 2xl-3xl (1.5rem-1.875rem) | 300 (Light) | -0.025em (Tight) | Uppercase | Normal | Card titles, subsections |
| **Headline Small** | xl (1.25rem) | 300 (Light) | Normal | Uppercase | Normal | Solution cards, feature titles |
| **Body Large** | xl-3xl (1.25rem-1.875rem) | 300 (Light) | Normal | None | Relaxed | Editorial pullquotes, hero descriptions |
| **Body Regular** | base-sm (0.875rem-1rem) | 300 (Light) | Normal | None | Relaxed | Paragraphs, descriptions, list items |
| **Label Large** | 11px | 700 (Bold) | 0.15em-0.4em | Uppercase | Normal | Section labels, navigation |
| **Label Small** | 10px | 700 (Bold) | 0.2em-0.3em | Uppercase | Normal | Metadata, tags, year/role indicators |
| **Micro** | 10px | 500 (Medium) | 0.3em | Uppercase | Normal | Copyright, timestamps |

### Font Weight Usage
- **Light (300)**: Headlines, body text, quotes (primary aesthetic)
- **Normal (400)**: Standard text, italic emphasis
- **Medium (500)**: Supporting text, phone numbers, metadata
- **Bold (700)**: Labels, navigation, section headers, CTAs

### Letter Spacing (Tracking)
- **Tighter** (`-0.05em` to `-0.025em`): Large display text for visual tightness
- **Normal**: Body text and standard content
- **Wide** (`0.15em` - `0.4em`): Uppercase labels and metadata for readability
- **Extra Wide** (`0.3em`): Footer tagline, micro text

### Italic Usage
- **Emphasis within headlines**: "creative customer experience", "Systems Designer"
- **Strategic differentiation**: Second part of split titles (e.g., "Run Free")
- **Stylistic hierarchy**: Skill category titles, pull quotes

---

## 📏 Spacing & Layout

### Container Widths
- **Max Content Width**: `1440px` (centered with `mx-auto`)
- **Horizontal Padding**: `px-6` (mobile), `px-12` (desktop)
- **Vertical Padding**: 
  - Sections: `py-16` - `py-32` (4rem-8rem)
  - Cards: `p-8` - `p-10` (2rem-2.5rem)
  - Hero sections: `py-32` - `py-48` (8rem-12rem)

### Grid Systems
- **Case Study Grid**: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- **Content Grid**: `grid-cols-1 md:grid-cols-12` with column spans
- **Solution Cards**: `grid-cols-1 md:grid-cols-2`

### Spacing Scale
- **Micro** (`gap-2`, `space-y-2`): 0.5rem - Tight relationships
- **Small** (`gap-4`, `space-y-4`): 1rem - Related content
- **Medium** (`gap-8`, `space-y-8`): 2rem - Component sections
- **Large** (`gap-12`, `space-y-12`): 3rem - Major sections
- **Extra Large** (`gap-16`, `space-y-16`): 4rem - Page divisions
- **Massive** (`gap-24`, `space-y-24`): 6rem - Major content blocks

### Borders & Dividers
- **Weight**: `border` (1px), `border-thin` (0.5px custom class)
- **Color**: `border-stone-200` (default), `border-stone-900` (emphasis)
- **Decorative Lines**: `h-px w-32 bg-stone-900` for horizontal rules

---

## 🎭 Components

### Header (Navigation)
- **Position**: Sticky top, z-index 50
- **Background**: `#f5f5f4` with `border-b border-stone-200`
- **Logo**: 
  - Name: `text-2xl md:text-3xl`, bold, tracking `0.15em`, stone-900
  - Tagline: `text-[10px] md:text-[11px]`, tracking `0.3em`, stone-500, uppercase
- **Navigation Links**:
  - Size: `text-[11px]`, bold, tracking `0.15em`, uppercase
  - Active: `text-stone-900` with `underline underline-offset-8 decoration-1`
  - Inactive: `text-stone-400`
  - Hover: `hover:text-stone-400 transition-colors`
- **CTA Button**:
  - Style: `px-6 py-2 bg-stone-900 text-white`
  - Hover: `hover:bg-stone-800 transition-colors`

### Footer
- **Background**: White with `border-t border-stone-200`
- **Padding**: `py-16 px-6 md:px-12`
- **Email Link**: `text-xl md:text-2xl font-light hover:text-stone-500`
- **Social Links**: Border-bottom effect with hover transitions
- **Copyright**: Ultra-small uppercase with wide tracking

### Case Study Card
- **Container**: White background, `border border-stone-200`
- **Image**:
  - Aspect ratio: `3:4`
  - Default: Grayscale with `bg-stone-50`
  - Hover: Color reveal with `scale-105`, `duration-700`, ease-out
- **Content Padding**: `p-8`
- **Year/Role**: `text-[10px]`, bold, tracking `0.2em`, stone-400, uppercase
- **Title**: `text-2xl`, light, tracking tight, stone-900, uppercase
- **Category**: `text-[11px]`, medium, tracking `0.15em`, stone-500, uppercase
- **Description**: Small, light, relaxed leading, stone-600
- **CTA**: `text-[10px]`, bold, `border-b border-stone-900`, hover expands padding right

### Custom Cursor
- **Core Dot**: `w-1.5 h-1.5`, white, rounded-full
- **Pulse Ring**: `w-10 h-10`, white border with 60% opacity
- **Blend Mode**: `mix-blend-difference` for universal contrast
- **Animation**: `animate-pulse-custom` (2.5s infinite)
- **Hover Detection**: Scales on interactive elements (links, buttons, `.group` class)
- **Visibility**: Hidden until mouse movement, disappears on mouse leave

### Image Trail
- **Animation**: `fade-out-up` (0.8s ease-out)
- **Keyframes**: 
  - Start: opacity 0, scale 0.8
  - Peak (15%): opacity 0.8, scale 1
  - End: opacity 0, scale 1.1
- **Trigger**: Mouse movement within ImageTrail component wrapper

### Buttons & CTAs

#### Primary CTA
```css
px-12 py-5 bg-white text-stone-900 
text-[11px] font-bold tracking-[0.3em] uppercase
hover:bg-stone-100 transition-colors
```

#### Secondary CTA (Dark)
```css
px-6 py-2 bg-stone-900 text-white
hover:bg-stone-800 transition-colors
```

#### Text Link with Border
```css
text-[11px] font-bold tracking-[0.15em] uppercase
border-b border-stone-900 pb-1
hover:border-stone-400 hover:text-stone-400 transition-all
```

### Solution Cards (Case Studies)
- **Background**: White with `border border-stone-200`
- **Padding**: `p-10`
- **Number Label**: `text-[10px]`, bold, stone-400, uppercase (e.g., "01")
- **Title**: `text-xl`, light, uppercase, tight tracking
- **Description**: Small, light, relaxed leading, stone-500

### Impact Section
- **Background**: `bg-stone-900 text-white`
- **Padding**: `p-12 md:p-24`
- **Quote**: `text-3xl md:text-5xl`, light, tight tracking, italic
- **Section Label**: `text-[11px]`, bold, tracking `0.4em`, stone-400, uppercase
- **Impact Cards**: Grid with border-top `border-stone-800`

---

## 🎬 Animations & Transitions

### Global Transitions
- **Default Duration**: `transition-colors` (150ms default)
- **Slow Transitions**: `duration-700` (image hover effects)
- **Fast Transitions**: `duration-300` (cursor dot scaling)

### Custom Animations

#### Image Hover
```css
grayscale group-hover:grayscale-0 
group-hover:scale-105 
transition-all duration-700 ease-out
```

#### Cursor Pulse Ring
```css
@keyframes pulse-ring {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.4; }
  50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.8; }
  100% { transform: translate(-50%, -50%) scale(1); opacity: 0.4; }
}
animation: pulse-ring 2.5s infinite ease-in-out;
```

#### Image Trail
```css
@keyframes fade-out-up {
  0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
  15% { opacity: 0.8; transform: translate(-50%, -50%) scale(1); }
  100% { opacity: 0; transform: translate(-50%, -50%) scale(1.1); }
}
animation: fade-out-up 0.8s ease-out forwards;
```

### Interactive States
- **Link Hover**: Text color change with smooth transition
- **Card Hover**: Border color change from stone-200 to stone-400
- **Button Hover**: Background color change (stone-900 → stone-800)
- **Image Hover**: Grayscale removal + scale increase
- **CTA Expansion**: Padding increase on hover (`group-hover:pr-4`)

---

## 🖼️ Image Treatment

### Default State
- **Filter**: `grayscale`
- **Opacity**: `opacity-80` or `opacity-90`
- **Background**: `bg-stone-50` or `bg-stone-200`

### Hover State
- **Filter**: `group-hover:grayscale-0`
- **Transform**: `group-hover:scale-105`
- **Duration**: `duration-700` with `ease-out`

### Aspect Ratios
- **Portrait Cards**: `aspect-[3/4]` (case study cards)
- **Profile Images**: `aspect-[4/5]` (about page)
- **Hero Images**: `aspect-[21/9]` (wide cinematic)

### Image Overlays
- **Gradient Overlays**: `bg-gradient-to-t from-black/50 to-transparent`
- **Caption Style**: White text, `text-[10px]`, tracking widest, uppercase

---

## 🎯 Interactive Elements

### Cursor Behavior
- **Global**: `cursor: none !important` (default cursor hidden)
- **Custom Cursor**: White dot with pulsing ring on hover
- **Z-index**: `9999` (always on top)
- **Pointer Events**: `pointer-events-none` (doesn't block clicks)

### Hover Targets
- Links (`<a>`)
- Buttons (`<button>`)
- Elements with `cursor-pointer` class
- Elements within `.group` containers
- Elements with `role="button"`

### Focus States
- **Selection**: Background `#1c1917`, text `#ffffff`
- **Accessibility**: Inherits from default Tailwind focus rings

---

## 🔧 Technical Stack

### Framework & Libraries
- **React**: 19.2.3 (via ESM CDN)
- **React Router DOM**: 7.12.0
- **Lucide React**: 0.562.0 (for icons like `ArrowUpRight`)
- **Tailwind CSS**: Via CDN (script tag)

### Build Tools
- **Vite**: Build tool and dev server
- **TypeScript**: Type safety

### Browser Features
- **Import Maps**: For module resolution
- **CSS Features**: 
  - Custom properties
  - Grid/Flexbox layouts
  - CSS animations
  - Mix-blend modes
  - Backdrop filters (potential future use)

---

## 📱 Responsive Breakpoints

### Tailwind Default Breakpoints
- **Mobile**: < 768px (default/base styles)
- **Tablet** (`md:`): ≥ 768px
- **Desktop** (`lg:`): ≥ 1024px
- **Large Desktop** (`xl:`): ≥ 1280px

### Responsive Patterns
- **Typography**: Progressive scaling (e.g., `text-5xl md:text-9xl`)
- **Padding**: Increased on larger screens (`px-6 md:px-12`)
- **Grid**: Stacked mobile, multi-column desktop (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`)
- **Layout**: Flex direction changes (`flex-col md:flex-row`)

---

## 🎨 Design Tokens Summary

### Border Radius
- **None**: `rounded-none` (consistent with brutalist aesthetic)
- **Full**: `rounded-full` (cursor dot only)

### Shadows
- **None**: No box-shadows used (flat design)

### Z-Index Layers
- **Header**: `z-50`
- **Custom Cursor**: `z-[9999]`

### Opacity Scale
- **Image Overlays**: 50% (`/50`)
- **Cursor Ring**: 40-80% (`opacity-0.4` to `opacity-0.8`)
- **Images**: 80-90% (`opacity-80`, `opacity-90`)

---

## 📋 Component Checklist

### Pages
- ✅ Home (Hero + Case Study Grid)
- ✅ About (Profile + Experience + Skills)
- ✅ Case Study Detail (Editorial Layout)

### Components
- ✅ Header (Sticky Navigation)
- ✅ Footer (Contact + Social)
- ✅ CaseStudyCard (Grid Item)
- ✅ CustomCursor (Global Overlay)
- ✅ ImageTrail (Interactive Hero)
- ✅ ProjectNavigation (Case Study Footer)

### Utilities
- ✅ constants.tsx (Data definitions)
- ✅ types.ts (TypeScript interfaces)

---

## 🚀 Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key

3. Run the app:
   ```bash
   npm run dev
   ```

---

## 🔗 External Links

View your app in AI Studio: https://ai.studio/apps/drive/16jzAyAUujX0UJxPgSqY6BoZNiO9caX-K

---

<!-- ⚠️ DO NOT OVERWRITE THIS SECTION ⚠️ -->
## 🖼️ How to Add Images & Figma Prototypes (BENN'S GUIDE)

> **⚠️ IMPORTANT: This section should NOT be overwritten by AI assistants.**

### Adding Images to Case Studies

**Step 1: Save your image**
Place your image in the `public/images/` folder (create it if needed):
```
/public/images/nike-style-gym-mockup.png
```

**Step 2: Reference in your component**
In the Nike section components (or any component), use:
```tsx
<img 
  src="/images/nike-style-gym-mockup.png" 
  alt="Style Gym mockup"
  className="w-full h-auto"
/>
```

**Step 3: For full-width hero images**
```tsx
<div className="aspect-[16/9] overflow-hidden">
  <img 
    src="/images/your-image.png" 
    alt="Description"
    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
  />
</div>
```

### Image Best Practices
- **Hero images**: 1920×900px or 21:9 aspect ratio
- **Inline mockups**: 1200×800px or 3:2 aspect ratio
- **Format**: PNG for mockups, JPEG for photos
- **Naming**: Use kebab-case: `nike-stylist-ai-mockup.png`

---

### Embedding Figma Prototypes

**Yes! You can embed interactive Figma prototypes.** Users can click through them directly on your page.

**Step 1: Get your Figma embed URL**
1. Open your Figma file
2. Click **Share** → **Get embed code**
3. Copy the `src` URL (looks like: `https://www.figma.com/embed?embed_host=share&url=...`)

**Step 2: Add to your component**
```tsx
<div className="aspect-[16/9] w-full">
  <iframe
    src="https://www.figma.com/embed?embed_host=share&url=YOUR_FIGMA_URL"
    className="w-full h-full border border-stone-200"
    allowFullScreen
  />
</div>
```

**Step 3: For a styled Figma section**
```tsx
<div className="space-y-4">
  <h3 className="text-[11px] font-bold tracking-[0.3em] text-stone-900 uppercase">
    Interactive Prototype
  </h3>
  <p className="text-sm text-stone-500">Click through the prototype below:</p>
  <div className="aspect-[16/9] w-full border border-stone-200 overflow-hidden">
    <iframe
      src="https://www.figma.com/embed?embed_host=share&url=YOUR_FIGMA_URL"
      className="w-full h-full"
      allowFullScreen
    />
  </div>
</div>
```

### Example: Adding to NikeSolution.tsx
To add a Figma prototype in the Solution section, add after the execution grid:
```tsx
{/* Figma Prototype */}
<div className="space-y-6 pt-8">
  <h3 className="text-[11px] font-bold tracking-[0.3em] text-stone-900 uppercase">
    Try the Prototype
  </h3>
  <div className="aspect-[4/3] w-full">
    <iframe
      src="https://www.figma.com/embed?embed_host=share&url=YOUR_URL_HERE"
      className="w-full h-full border border-stone-200"
      allowFullScreen
    />
  </div>
</div>
```

<!-- END OF PROTECTED SECTION -->

---

<!-- ⚠️ DO NOT OVERWRITE THIS SECTION ⚠️ -->
## 👁️ How to Hide/Show Case Studies on Homepage (BENN'S GUIDE)

> **⚠️ IMPORTANT: This section should NOT be overwritten by AI assistants.**

### Hiding a Case Study

To hide a case study from your homepage, simply comment it out in `/constants.tsx`:

**Step 1: Open the file**
```bash
/constants.tsx
```

**Step 2: Find the case study**
Look for the case study object in the `CASE_STUDIES` array.

**Step 3: Comment it out**
Add `//` at the beginning of each line:

```tsx
export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'on-apex',
    // ... visible
  },
  // HIDDEN: Uncomment to show Stella McCartney
  // {
  //   id: 'stella-mccartney',
  //   title: 'Stella McCartney x Zellerfeld',
  //   category: 'Sustainability | Innovation | Luxury',
  //   description: '...',
  //   imageUrl: '...',
  //   year: '2025',
  //   role: 'Brand Strategist & Creative Director'
  // },
  {
    id: 'nike-snkrs',
    // ... visible
  },
];
```

**Step 4: Deploy**
```bash
npm run build
cp -r dist/* docs/
git add constants.tsx docs/
git commit -m "Hide Stella McCartney from homepage"
git push origin main
```

### Showing a Hidden Case Study

**Step 1: Find the commented section in `/constants.tsx`**

**Step 2: Remove the `//` from each line**

**Step 3: Deploy using the same commands above**

### Why This Method?
- ✅ **Safe**: No complex filtering logic
- ✅ **Simple**: Just comment/uncomment
- ✅ **Clear**: Easy to see what's hidden
- ✅ **Reliable**: Won't break your site

<!-- END OF PROTECTED SECTION -->

---

## 📜 License

© 2025 Benn Pattara. All rights reserved.

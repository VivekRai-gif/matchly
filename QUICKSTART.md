# 🚀 Quick Start Guide - Scoutify AI Landing Page

## Installation & Setup

### Step 1: Install Dependencies
Open your terminal in the project directory and run:
```bash
npm install
```

This will install:
- React & React DOM
- TypeScript
- Vite (dev server)
- Tailwind CSS
- Framer Motion
- Lucide React (icons)
- All dev dependencies

### Step 2: Start Development Server
```bash
npm run dev
```

The landing page will open at: **http://localhost:3000**

### Step 3: Explore the Experience
- Scroll slowly to see choreographed animations
- Hover over cards to see 3D tilt effects
- Move your mouse to see the glow cursor
- Notice floating orbs and particles

## 🎨 What You'll See

### Hero Section
- Animated headline with gradient text and glow effect
- Floating UI mockup with glassmorphism
- Particle field background
- CTA buttons with hover effects

### Scroll Story (4 Sections)
1. **The Problem** - Algorithmic bias statistics
2. **The Solution** - Multi-agent architecture
3. **Transparency** - Explainable decisions
4. **Privacy** - Ethical design principles

### Feature Showcase
6 interactive cards with:
- 3D mouse tilt effect
- Gradient backgrounds
- Animated icons
- Hover glow effects

### Architecture Diagram
- Animated node connections
- Pulsing agent nodes
- 4-step process breakdown

### Final CTA
- Bold call-to-action
- Animated gradients
- Social links
- Footer

## 📂 File Structure Explained

```
src/
├── components/
│   ├── HeroSection.tsx          # First section users see
│   ├── ScrollStorySection.tsx   # Problem/solution narrative
│   ├── FeatureShowcase.tsx      # 6 feature cards
│   ├── ArchitectureReveal.tsx   # System diagram
│   ├── CTASection.tsx           # Final call-to-action
│   └── Effects.tsx              # Reusable effects (orbs, particles, cursor)
├── hooks/
│   └── useScroll.ts             # Custom scroll utilities
├── App.tsx                       # Main component that combines all sections
├── main.tsx                      # Entry point
└── index.css                     # Global styles & utilities
```

## 🛠️ Customization Tips

### Change Colors
1. Open `tailwind.config.js`
2. Modify the `colors.primary` section
3. Update gradient classes in components

### Adjust Animations
- **Speed**: Change `duration` values in motion components
- **Delay**: Modify `delay` in `transition` objects
- **Easing**: Update `ease` values (e.g., "easeInOut", "easeOut")

### Update Content
- **Headlines**: Edit text in each section component
- **Descriptions**: Update `description` props
- **Stats**: Modify the stats arrays in components

### Add New Sections
1. Create a new component in `src/components/`
2. Import it in `App.tsx`
3. Add it between existing sections

## 🚀 Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### Preview Production Build
```bash
npm run preview
```

## 🌐 Deploy

### Option 1: Vercel (Easiest)
1. Push code to GitHub
2. Import project on vercel.com
3. Deploy automatically

### Option 2: Netlify
1. Run `npm run build`
2. Drag `dist/` folder to netlify.com/drop

### Option 3: GitHub Pages
1. Run `npm run build`
2. Deploy `dist/` folder to gh-pages branch

## 💡 Pro Tips

- **Scroll Slowly**: Animations are choreographed for smooth scrolling
- **Desktop First**: Best experienced on desktop (but mobile-responsive)
- **Modern Browser**: Use Chrome, Firefox, or Safari for best performance
- **GPU Acceleration**: Animations use CSS transforms for 60fps

## 🐛 Troubleshooting

### Dependencies won't install
```bash
rm -rf node_modules package-lock.json
npm install
```

### Port 3000 already in use
Edit `vite.config.ts`:
```ts
server: {
  port: 3001,  // Change to any available port
}
```

### Animations not smooth
- Close other apps to free up GPU
- Update graphics drivers
- Try a different browser

## 📸 Features Breakdown

| Feature | Technology | Purpose |
|---------|-----------|---------|
| Scroll animations | Framer Motion | Choreographed reveals |
| 3D tilt effect | Motion values | Interactive cards |
| Glassmorphism | Tailwind + CSS | Premium UI feel |
| Gradient text | Tailwind utilities | Bold headlines |
| Floating orbs | Keyframe animations | Ambient background |
| Glow cursor | Mouse tracking | Cinematic feel |
| Particle field | React state | Depth effect |

## 🎯 Next Steps

1. ✅ Install dependencies
2. ✅ Run dev server
3. ✅ Explore the page
4. 🎨 Customize content
5. 🚀 Deploy to production

---

**Need Help?** Check `LANDING_PAGE_README.md` for detailed documentation.

**Built by Team Zygo** 🚀

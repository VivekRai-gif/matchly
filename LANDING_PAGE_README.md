# 🚀 Scoutify AI - Cinematic Landing Page

A premium, scroll-driven landing page experience for Scoutify AI - the world's first multi-agent ethical hiring engine.

## ✨ Features

- **Cinematic Scroll Experience**: Smooth, choreographed animations triggered by scroll
- **Premium Design**: Dark mode with Apple x Tesla x Awwwards aesthetic
- **Framer Motion Animations**: Sophisticated scroll-based and hover animations
- **Glassmorphism UI**: Modern glass panels with backdrop blur effects
- **3D Tilt Effects**: Interactive card tilts that respond to mouse movement
- **Parallax Depth**: Layered floating elements with parallax motion
- **Glow Cursor**: Custom cursor with radial gradient glow effect
- **Particle System**: Subtle animated particles in the background
- **Responsive Design**: Fully responsive across all device sizes
- **Performance Optimized**: Lazy animations and optimized rendering

## 🛠️ Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Advanced animations
- **Lucide React** - Beautiful icons

## 📦 Installation

1. **Install dependencies**:
```bash
npm install
```

2. **Start development server**:
```bash
npm run dev
```

The app will open at `http://localhost:3000`

3. **Build for production**:
```bash
npm run build
```

4. **Preview production build**:
```bash
npm run preview
```

## 🎨 Project Structure

```
scoutify-ai-landing/
├── src/
│   ├── components/
│   │   ├── HeroSection.tsx          # Hero with floating UI mockup
│   │   ├── ScrollStorySection.tsx   # Scroll-triggered story cards
│   │   ├── FeatureShowcase.tsx      # Interactive feature cards
│   │   ├── ArchitectureReveal.tsx   # Animated architecture diagram
│   │   ├── CTASection.tsx           # Call-to-action section
│   │   └── Effects.tsx              # Reusable effect components
│   ├── hooks/
│   │   └── useScroll.ts             # Custom scroll hooks
│   ├── App.tsx                       # Main app component
│   ├── main.tsx                      # App entry point
│   └── index.css                     # Global styles
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## 🎯 Key Sections

### 1. Hero Section
- Full-screen cinematic intro
- Animated headline reveal with gradient text
- Floating 3D UI mockup with glassmorphism
- Particle background with floating orbs
- Smooth scroll indicator

### 2. Scroll Story
- 4 scroll-triggered story cards
- Each section fades, slides, and scales on scroll
- Interactive stats and hover effects
- Problem → Solution → Transparency → Privacy flow

### 3. Feature Showcase
- 6 interactive feature cards
- 3D tilt effect on mouse movement
- Hover glow and shine effects
- Staggered reveal animations

### 4. Architecture Reveal
- Animated node diagram
- SVG line connections with path animations
- Pulsing node effects
- 4-step process breakdown

### 5. CTA Section
- Bold final call-to-action
- Glowing gradient background
- Animated CTA buttons
- Social links and footer

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to customize the color palette:

```js
colors: {
  primary: {
    500: '#0ea5e9',  // Main blue
    // ... other shades
  },
}
```

### Animations
Modify animation timings in component files or add new keyframes in `tailwind.config.js`:

```js
animation: {
  'float': 'float 6s ease-in-out infinite',
}
```

### Content
Update text content directly in each section component:
- Hero: `src/components/HeroSection.tsx`
- Features: `src/components/FeatureShowcase.tsx`
- etc.

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
1. Connect your Git repository
2. Build command: `npm run build`
3. Publish directory: `dist`

### GitHub Pages
```bash
npm run build
# Deploy the dist/ folder
```

## 💡 Tips for Customization

1. **Adjust Scroll Timing**: Modify `offset` values in `useScroll` hooks
2. **Change Gradients**: Update `from-{color}` and `to-{color}` classes
3. **Add Sections**: Create new components in `src/components/`
4. **Modify Particles**: Edit count in `ParticleField` component
5. **Customize Blur**: Adjust `blur-{size}` values in effects

## 🎭 Animation Performance

- Animations use GPU-accelerated transforms
- Scroll effects use `will-change` for optimization
- Lazy viewport detection with Framer Motion
- Smooth 60fps experience on modern browsers

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

This is a showcase project built for Scoutify AI by Team Zygo.

## 📄 License

MIT License - feel free to use this for your own projects!

## 🌟 Credits

Built with ❤️ by **Team Zygo** during a 24-hour hackathon.

---

**Scoutify AI** - Ethical Hiring Intelligence

# Migration to Vite + React - Complete Guide

## 🎉 Project Successfully Migrated!

Your artist portfolio has been successfully converted from plain HTML/CSS/JavaScript to a modern **Vite + React** stack, while maintaining 100% of the original design, layout, and functionality.

## 📁 Project Structure

```
artist/
├── src/
│   ├── components/
│   │   ├── Header.jsx                 # Navigation header component
│   │   ├── Hero.jsx                   # Main hero/landing section
│   │   ├── Slider.jsx                 # Project slider with 3D animations
│   │   ├── OrbitContainer.jsx         # Orbiting artwork images
│   │   └── ArtistInfoPanel.jsx        # Artist information modal
│   ├── data/
│   │   └── projects.js                # Artist and project data
│   ├── hooks/
│   │   └── useSlider.js               # Custom React hook for slider logic
│   ├── utils/
│   │   └── helpers.js                 # Utility functions (escape, render, etc.)
│   ├── styles/
│   │   ├── globals.css                # Global styles and CSS variables
│   │   ├── header.css                 # Header component styles
│   │   ├── hero.css                   # Hero section styles
│   │   ├── slider.css                 # Slider component styles
│   │   ├── orbitContainer.css         # Orbit animation styles
│   │   └── artistInfoPanel.css        # Modal panel styles
│   ├── App.jsx                        # Root App component
│   ├── main.jsx                       # React entry point
│   └── index.css                      # Global imports
├── public/                            # Static assets (can be used for images)
├── dist/                              # Production build output
├── index.html                         # Vite HTML template
├── package.json                       # Dependencies and scripts
├── vite.config.js                     # Vite configuration
├── .gitignore                         # Git ignore rules
├── assets/                            # Artwork folders (unchanged)
│   ├── priyanka-bardhan-artworks/
│   ├── madhushree-pawar-artworks/
│   ├── vivek-kisan-vadkar-artworks/
│   ├── panchu-gharami-artworks/
│   ├── sangita-agarwal-artworks/
│   ├── sanjana-patel-artworks/
│   └── richard-anbudurai-artworks/
└── README_VITE.md                     # This file

```

## 🚀 Getting Started

### Install Dependencies
```bash
npm install
```

### Development Server
```bash
npm run dev
```
This starts the Vite dev server at `http://localhost:5173` with hot module reloading (HMR) for fast development.

### Production Build
```bash
npm run build
```
Creates optimized production files in the `dist/` folder.

### Preview Production Build
```bash
npm run preview
```
Locally preview the production build before deploying.

## 🔄 What Changed

### Before: Plain HTML/CSS/JS
- Single HTML file with inline structure
- Global CSS file with all styles
- Vanilla JavaScript with DOM manipulation
- Manual animation handling with GSAP
- Global state management through DOM

### After: React + Vite
- ✅ **Component-based architecture** - Modular, reusable components
- ✅ **Organized CSS** - Separate CSS files per component
- ✅ **React Hooks** - Modern state management with `useState`, `useRef`, `useEffect`
- ✅ **Custom Hooks** - `useSlider` hook encapsulates slider logic
- ✅ **Build optimization** - Vite provides fast builds and code splitting
- ✅ **Hot Module Reloading** - Instant updates during development
- ✅ **Production ready** - Optimized bundle with proper tree-shaking

## 📦 Key Technologies

- **Vite** (v5.0.8) - Lightning-fast build tool and dev server
- **React** (v18.2.0) - UI library with hooks
- **GSAP** (v3.12.5) - Animation library (unchanged, still used for 3D effects)
- **CSS3** - Modern CSS with custom properties and animations

## 🎨 Design & Layout Preservation

All original design elements have been maintained:
- ✅ Premium portfolio aesthetic
- ✅ Cinematic 3D slider transitions
- ✅ Orbiting artwork images with scroll-driven rotation
- ✅ Artist information modal
- ✅ Smooth hover effects and animations
- ✅ Responsive design (mobile to desktop)
- ✅ Gradient backgrounds and visual effects
- ✅ Font selections (Plus Jakarta Sans, Cormorant Garamond)
- ✅ Color scheme and typography

## 🔌 Component Overview

### Header Component (`Header.jsx`)
- Fixed navigation header
- Logo, contact info, services, social links
- Navigation links (WRK, ABT)
- Fully styled and responsive

### Hero Component (`Hero.jsx`)
- Main landing section
- Coordinates slider and orbit container
- Handles keyboard, touch, and wheel navigation
- Manages info panel visibility

### Slider Component (`Slider.jsx`)
- Project image slides with 3D transforms
- Hover effects and overlays
- Image parallax on mouse movement
- Updates project index and caption dynamically
- GSAP-powered animations

### OrbitContainer Component (`OrbitContainer.jsx`)
- 5 orbiting artwork images
- Scroll-driven rotation
- 3D layering for depth effect
- Dynamic artwork loading based on current artist
- Auto-rotation with pause on hover/interaction

### ArtistInfoPanel Component (`ArtistInfoPanel.jsx`)
- Modal showing detailed artist information
- Scrollable content area
- Close button and backdrop dismiss
- Dynamic content rendering from project data
- Responsive grid layout

## 🎯 Key Features Maintained

1. **3D Slider Animations** - GSAP-powered 3D perspective transforms
2. **Orbiting Images** - Continuous 3D orbit rotation with scroll control
3. **Artist Profiles** - Detailed information panels for each artist
4. **Responsive Design** - Adapts seamlessly from mobile to desktop
5. **Smooth Interactions** - Hover effects, parallax, and transitions
6. **Accessibility** - Semantic HTML, ARIA labels, keyboard navigation
7. **Performance** - Optimized animations and lazy loading

## 🔧 Customization

### Adding New Artists
Edit `src/data/projects.js` and add to the `projects` array:
```javascript
{
  artist: "Artist Name",
  location: "City, Country",
  title: "Artwork Title",
  year: "2025",
  medium: "Medium",
  description: "Description",
  link: "URL",
  image: IMG[index],
  artistInfo: {
    // ... artist details
  },
  works: [/* ... */]
}
```

### Modifying Colors
Edit CSS variables in `src/styles/globals.css`:
```css
:root {
  --bg-main: #f5f1ea;
  --charcoal: #1d1a16;
  --gold: #b89a63;
  /* ... etc */
}
```

### Styling Updates
- Global styles: `src/styles/globals.css`
- Component styles: `src/styles/{component-name}.css`
- Each component imports its own CSS

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above (full effects)
- **Tablet**: 980px - 1199px (adjusted layouts)
- **Mobile**: 640px - 979px (simplified UI)
- **Small Mobile**: below 640px (optimized for tiny screens)

## ⚡ Performance Tips

1. **Development**: Vite's HMR makes changes appear instantly
2. **Production**: Optimized bundle (~240KB JS, ~17KB CSS gzipped)
3. **Images**: Artwork loads from `assets/` folders
4. **Animations**: GSAP is optimized for performance

## 🐛 Browser Support

Modern browsers with ES6+ support:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## 📝 Next Steps

1. **Test the dev server**: `npm run dev`
2. **Customize content**: Edit `src/data/projects.js`
3. **Adjust styling**: Modify files in `src/styles/`
4. **Deploy**: Run `npm run build` and deploy the `dist/` folder

## 🚀 Deployment Options

### Vercel (Recommended for Vite)
```bash
npm install -g vercel
vercel
```

### Netlify
1. Connect your git repo
2. Set build command: `npm run build`
3. Set publish directory: `dist`

### Traditional Hosting
1. Run `npm run build`
2. Upload the `dist/` folder contents to your server

## 📚 Resources

- [Vite Documentation](https://vitejs.dev)
- [React Documentation](https://react.dev)
- [GSAP Documentation](https://gsap.com)
- [MDN Web Docs](https://developer.mozilla.org)

## ✨ Summary

Your portfolio is now built with modern web technologies while maintaining its beautiful, premium aesthetic. The React component structure makes it easy to maintain and extend, while Vite ensures blazing-fast development and optimized production builds.

Happy coding! 🎨✨

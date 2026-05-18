# Artist Portfolio - Vite + React

A premium artist portfolio website built with Vite and React, featuring cinematic slider transitions and editorial design.

## Features

- ⚡ Vite for fast development and optimized builds
- ⚛️ React for component-based UI
- 🎨 Beautiful portfolio design with GSAP animations
- 📱 Fully responsive layout
- 🎯 Artist information panels
- 🔄 Smooth slide transitions with 3D effects
- 🎪 Orbiting artwork images with scroll-driven rotation

## Project Structure

```
src/
├── components/           # React components
│   ├── Header.jsx       # Navigation header
│   ├── Hero.jsx         # Main hero section
│   ├── Slider.jsx       # Project slider
│   ├── OrbitContainer.jsx   # Orbiting artwork images
│   └── ArtistInfoPanel.jsx  # Artist information modal
├── data/                # Data files
│   └── projects.js      # Project and artist data
├── hooks/               # Custom React hooks
│   └── useSlider.js     # Slider logic hook
├── styles/              # Component-specific CSS
│   ├── globals.css
│   ├── header.css
│   ├── hero.css
│   ├── slider.css
│   ├── orbitContainer.css
│   └── artistInfoPanel.css
├── utils/               # Utility functions
│   └── helpers.js
├── App.jsx              # Main app component
├── main.jsx             # React entry point
└── index.css            # Global imports
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Technologies

- **Vite** - Next generation frontend tooling
- **React** - UI library
- **GSAP** - Animation library
- **CSS3** - Modern styling with custom properties

## Development

The project uses:
- React hooks for state management
- GSAP for advanced animations
- CSS custom properties for theming
- Responsive design with mobile-first approach

## Browser Support

Modern browsers with ES6 support:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## License

© 2024 Artist Portfolio. All rights reserved.

# GTA 6 Website

A modern, interactive website for Grand Theft Auto 6 built with React, GSAP animations, and Tailwind CSS.

## Project Overview

This project is a promotional website for GTA 6 featuring:
- Animated intro with VI logo mask effect
- Interactive parallax scrolling effects
- Multiple screens with different background options
- Responsive design with modern UI elements

## Background Customization Options

### First Screen (Landing Page)

The first screen features a sky background with buildings, characters, and animated text. You can customize the sky background by using either:

- **sky1.png** - Current default sky background
- **sky2.png** - Alternative sky background

To change the background, modify the image source in `App.jsx` around line 197:

```jsx
<img
  className="sky absolute scale-[1.7] rotate-[-20deg] top-0 left-0 w-full h-full object-cover"
  src="sky1.png" // Change to "sky2.png" for alternative background
  alt="sky"
/>
```

### Second Screen (Content Page)

The second screen currently uses a video background. You have two options for this screen:

1. **Video Background** (Current) - Uses city_night.mp4 for a dynamic background
2. **Animated Gradient** - A colorful animated gradient background

To switch to the animated gradient background:

1. Open `src/index.css`
2. Uncomment the `.animated-gradient` and `@keyframes gradientMove` CSS blocks (around lines 14-24)
3. In `App.jsx`, replace the video element with a div using the animated-gradient class:

```jsx
{/* Replace this: */}
<video
  src="./city_night.mp4"
  autoPlay
  loop
  muted
  playsInline
  className="absolute inset-0 w-full h-full object-cover scale-[1.1]"
/>

{/* With this: */}
<div className="animated-gradient absolute inset-0 w-full h-full"></div>
```

## Development

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Technologies Used

- React 19
- Vite
- GSAP for animations
- Tailwind CSS for styling
- Remixicon for icons
# nr.com v5

Personal portfolio site for Nate Richardson. Built with a Windows 95 desktop theme on larger screens and a Palm Pilot PDA interface on mobile.

## Tech Stack

- **Astro** - Static site generator
- **TypeScript** - Type-safe scripting
- **Tailwind CSS 4** - Utility-first styling
- **MDX** - Blog content with JSX support

## Project Structure

```text
src/
  components/
    desktop/     # Win95 UI: Window, Taskbar, StartMenu, BootScreen, EasterEggs
    mobile/      # PDA UI: AppGrid, AppIcon, AppScreen, PdaTopBar
    shared/      # Content used by both layouts: About, Experience, Projects, Contact, Blog
  content/
    blog/        # MDX blog posts
  data/          # TypeScript data files (experience, projects, social)
  layouts/       # BaseLayout, DesktopOS, MobileOS
  pages/         # Routes: index, blog, 404
  styles/        # global.css, win95.css
public/
  fonts/         # W95FA (Windows 95 font)
  icons/         # SVG icons for desktop/app icons
  images/        # Portfolio images, headshots, favicons
```

## Development

```sh
npm install      # Install dependencies
npm run dev      # Start dev server at localhost:4321
npm run build    # Build for production
npm run preview  # Preview production build locally
```

## Features

- Responsive: Win95 desktop (768px+) / Palm Pilot PDA (mobile)
- Draggable, resizable windows with minimize/maximize/close
- File Explorer-style experience viewer
- Tabbed project showcase (Open Source / Case Studies / Client Work)
- Boot sequence with BIOS animation
- Easter eggs: Clippy, Konami code, BSOD, right-click context menu, screensaver
- Blog system via MDX content collections
- Full SEO: structured data, Open Graph, sitemap

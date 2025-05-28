# 🏁 Formula 1 Racing Explorer

A modern, feature-rich web application for exploring Formula 1 data, built with React, TypeScript, and Tailwind CSS. Discover F1 seasons, races, drivers, and results with an intuitive, responsive interface.

![F1 Racing Explorer](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.3.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)

## ✨ Features

### 🏆 Season & Race Management
- **Season Browser**: Explore F1 seasons from 1950 to present with paginated navigation
- **Race Schedules**: View comprehensive race calendars with circuit details and timing
- **Race Results**: Detailed race outcomes with driver standings, lap times, and constructors
- **Grid/List Views**: Toggle between card-based and list-based viewing modes

### 📌 Race Pinning System
- **Pin Favorite Races**: Save races for quick access with persistent local storage
- **Visual Indicators**: Clear visual feedback for pinned races with special styling
- **Bulk Management**: Pin/unpin individual races or clear all pinned races
- **Timestamp Tracking**: Chronological ordering of pinned races

### 🎛️ User Preferences
- **View Customization**: Choose between grid and list layouts
- **Pagination Control**: Adjust items per page (12, 24, 48 options)
- **Persistent Settings**: User preferences saved across browser sessions
- **Responsive Design**: Optimized experience on desktop, tablet, and mobile

### 🔍 Advanced Navigation
- **Season Filtering**: Jump to specific years with intuitive season selector
- **Race Details**: Deep-dive into individual race results and statistics
- **Circuit Information**: Complete venue details including location and track data
- **Driver Profiles**: Comprehensive driver information with nationality flags

## 🚀 Technology Stack

### Frontend Framework
- **React 19.1.0**: Latest React with concurrent features
- **TypeScript 5.8.3**: Full type safety and enhanced developer experience
- **React Router DOM 6.28.0**: Client-side routing and navigation
- **Vite 6.3.3**: Ultra-fast build tool and dev server

### Styling & UI
- **Tailwind CSS 4.1.4**: Utility-first CSS framework
- **Lucide React**: Beautiful, customizable icon library
- **Responsive Design**: Mobile-first approach with fluid layouts

### State Management
- **Zustand 5.0.5**: Lightweight state management for UI preferences and pinned races
- **Local Storage Integration**: Persistent data across browser sessions
- **Optimistic Updates**: Immediate UI feedback with robust error handling

### API & Data
- **Axios 1.9.0**: HTTP client for API requests
- **Ergast F1 API**: Official Formula 1 data source
- **Date-fns 4.1.0**: Modern date formatting and manipulation
- **Custom Type Definitions**: Comprehensive TypeScript interfaces

### Testing Framework
- **Vitest 3.1.4**: Fast, modern test runner with ESM support
- **React Testing Library 16.3.0**: Component testing with user-centric approach
- **@testing-library/jest-dom**: Extended DOM matchers
- **35+ Test Cases**: Comprehensive coverage of utilities, state, and components

## 📁 Project Structure

```
src/
├── components/              # Reusable UI components
│   ├── __tests__/          # Component tests
│   ├── ErrorMessage.tsx    # Error state handling
│   ├── ItemsPerPageSelector.tsx
│   ├── Layout.tsx          # App layout wrapper
│   ├── LoadingSpinner.tsx  # Loading states
│   ├── Navigation.tsx      # App navigation
│   ├── Pagination.tsx      # Data pagination
│   ├── PinButton.tsx       # Race pinning functionality
│   ├── RaceCard.tsx        # Race display card
│   ├── RaceListItem.tsx    # Race list item
│   ├── RaceResultTable.tsx # Race results display
│   ├── SeasonCard.tsx      # Season overview card
│   ├── SeasonListItem.tsx  # Season list item
│   ├── SeasonSelector.tsx  # Year selection dropdown
│   └── ViewToggle.tsx      # Grid/list view toggle
├── pages/                  # Page components
│   ├── Home.tsx           # Landing page
│   ├── Seasons.tsx        # Seasons overview
│   ├── SeasonDetails.tsx  # Individual season details
│   └── RaceDetails.tsx    # Individual race results
├── services/              # External API integration
│   └── api.ts            # Ergast API client
├── store/                 # State management
│   ├── __tests__/        # Store tests
│   └── pinnedRacesStore.ts # Zustand store
├── utils/                 # Utility functions
│   ├── __tests__/        # Utility tests
│   └── formatters.ts     # Data formatting helpers
├── test/                  # Test configuration
│   └── setup.ts          # Test environment setup
├── App.tsx               # Main app component
├── main.tsx              # App entry point
└── index.css             # Global styles
```

## 🛠️ Getting Started

### Prerequisites
- **Node.js** 18+ 
- **npm** or **yarn**
- Modern web browser

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd f1-task

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Available Scripts

```bash
# Development
npm run dev          # Start dev server with hot reload
npm run build        # Build for production
npm run preview      # Preview production build locally
npm run typecheck    # Run TypeScript type checking

# Testing
npm test            # Run tests in watch mode
npm run test:run    # Run tests once
npm run test:ui     # Run tests with UI interface
```

## 🧪 Testing

The application includes comprehensive unit tests covering:

- **Utility Functions** (11 tests): Data formatting, date handling, country flags
- **State Management** (11 tests): Race pinning, preferences, store actions  
- **Component Logic** (13 tests): Rendering, interactions, accessibility

### Test Coverage Highlights
- ✅ **35 total test cases** across 3 test suites
- ✅ **100% pass rate** with comprehensive edge case handling
- ✅ **Accessibility testing** for screen readers and keyboard navigation
- ✅ **State persistence** validation for pinned races and preferences
- ✅ **Error boundary** testing for graceful failure handling

Run tests with:
```bash
npm test           # Interactive watch mode
npm run test:run   # Single run with results
npm run test:ui    # Visual test interface
```

## 🎮 Usage Guide

### Exploring Seasons
1. Navigate to **Seasons** from the main menu
2. Use the **season selector** to jump to specific years
3. Toggle between **grid** and **list** views
4. Adjust **items per page** for your preferred browsing experience
5. Click any race to view detailed results

### Pinning Races
1. Click the **pin button** (⭐) on any race card
2. Pinned races show visual indicators and special styling
3. Access pinned races quickly from the pinned section
4. Unpin races individually or clear all at once

### Viewing Race Results
1. Select any race from a season
2. Explore comprehensive race information:
   - **Winner and podium finishers**
   - **Complete driver standings** with positions and points
   - **Lap times and fastest lap** information
   - **Constructor standings** and team details
   - **Circuit information** and race conditions

### Customizing Experience
- **View Preferences**: Choose grid or list layouts
- **Pagination**: Select 12, 24, or 48 items per page
- **Pinned Races**: Save favorite races for quick access
- **Responsive Design**: Optimized for any screen size

## 🔗 API Integration

This application integrates with the **Ergast F1 API** (https://ergast.com/mrd/), providing:

- 📊 **Historical Data**: Complete F1 records from 1950 to present
- 🏎️ **Race Results**: Detailed outcomes, lap times, and standings
- 🏁 **Circuit Information**: Track details, locations, and layouts
- 👨‍🚗 **Driver & Constructor Data**: Comprehensive profiles and statistics
- 📡 **Real-time Updates**: Latest season data and race results

### API Features
- **Efficient Caching**: Minimized requests with smart data management
- **Error Handling**: Graceful fallbacks and retry mechanisms
- **Type Safety**: Comprehensive TypeScript interfaces for all endpoints
- **Rate Limiting**: Respectful API usage following best practices

## 🚀 Deployment

### Vercel (Recommended for Production)
The app is optimized for Vercel deployment with automatic SPA routing:

1. **Connect Repository** to Vercel
2. **Import Project** - Vercel auto-detects Vite configuration
3. **Deploy** - Automatic builds on every push to main
4. **Access** your app at your Vercel domain

**Configuration:**
- ✅ `vercel.json` handles SPA routing rewrites
- ✅ Root path deployment (`/`)
- ✅ Static asset caching optimized
- ✅ Automatic builds and deployments

### GitHub Pages (Alternative)
For GitHub Pages deployment, use the `gh-pages` branch:

```bash
# Switch to GitHub Pages configuration
git checkout gh-pages  # If you have a separate branch for GitHub Pages

# Or modify for GitHub Pages:
# 1. Set base: "/incorta-f1/" in vite.config.ts
# 2. Add basename="/incorta-f1" to BrowserRouter in main.tsx
```

**GitHub Pages Setup:**
1. **Enable GitHub Pages** in repository settings
2. **Set source** to "GitHub Actions"
3. **Push to main branch** - automatic deployment via GitHub Actions
4. **Access** your app at: `https://username.github.io/incorta-f1/`

### Manual Deployment
```bash
# Build for production
npm run build

# Deploy the dist/ folder to your hosting service
# Supports: Vercel, Netlify, Surge, AWS S3, etc.
```

### Environment Configuration
- **Vercel**: Root path deployment with SPA routing
- **GitHub Pages**: Subdirectory deployment (`/incorta-f1/`)
- **SPA Mode**: Single Page Application routing
- **Static Assets**: Optimized bundle with code splitting

### Troubleshooting Deployment Issues

**Vercel 404 Errors:**
- ✅ Ensure `vercel.json` exists with SPA rewrites
- ✅ Remove basename from BrowserRouter
- ✅ Set `base: "/"` in vite.config.ts

**GitHub Pages Issues:**
- ✅ Set correct base path in vite.config.ts
- ✅ Add basename to BrowserRouter
- ✅ Enable GitHub Pages in repository settings

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

### Development Guidelines
- Follow **TypeScript** best practices
- Write **comprehensive tests** for new features
- Ensure **accessibility** compliance
- Test across different **screen sizes**
- Maintain **consistent code style**

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **[Ergast API](https://ergast.com/mrd/)** - Comprehensive Formula 1 data
- **[React](https://reactjs.org/)** - The library for building user interfaces  
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Vite](https://vitejs.dev/)** - Next generation frontend tooling
- **[Zustand](https://zustand.surge.sh/)** - Lightweight state management
- **[Vitest](https://vitest.dev/)** - Fast and modern testing framework

---

**Built with ❤️ for the Incorta Technical Assessment**

*Experience the excitement of Formula 1 racing through data and beautiful design.*

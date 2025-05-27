# Formula 1 Explorer

A modern, responsive web application for exploring Formula 1 data built with React Router v7, TypeScript, and Tailwind CSS. This application provides comprehensive access to Formula 1 seasons, races, drivers, and detailed race results using the [Ergast API](https://ergast.com/mrd/).

## Features

### 🏁 Season Explorer

- Browse all available Formula 1 seasons from 1950 to present
- View comprehensive race schedules for each season
- Toggle between card and list views for optimal viewing experience
- Automatic pagination and smooth navigation

### 🏆 Race Results

- Detailed race results with driver positions and points
- Comprehensive race information including circuit details, date, and time
- Visual highlights for podium finishers (Gold, Silver, Bronze)
- Fastest lap information and lap times
- Driver grid positions and final standings
- Constructor information and team details

### 👨‍🚗 Driver Information

- Comprehensive driver profiles with nationality and career data
- Search and filter drivers by name, nationality, or driver code
- Season-specific driver listings
- Driver age calculation and career statistics
- Links to Wikipedia profiles for detailed biographical information

### 🎨 Modern UI/UX

- Responsive design that works seamlessly on all devices
- Beautiful Formula 1-themed color scheme with red accents
- Smooth animations and hover effects
- Loading states and error handling with retry functionality
- Intuitive navigation with clear visual hierarchy

## Architecture & Technology Stack

### Frontend

- **React Router v7**: Modern file-based routing with type safety
- **TypeScript**: Full type safety and enhanced development experience
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Lucide React**: Beautiful, customizable icons
- **Date-fns**: Modern date utility library

### API Integration

- **Ergast API**: Official Formula 1 data source
- **Custom API Service Layer**: Typed API responses and error handling
- **Efficient Data Fetching**: Optimized requests with proper caching considerations

### Code Organization

```
app/
├── components/          # Reusable UI components
│   ├── ErrorMessage.tsx
│   ├── LoadingSpinner.tsx
│   ├── Navigation.tsx
│   ├── RaceCard.tsx
│   ├── RaceListItem.tsx
│   ├── RaceResultTable.tsx
│   ├── SeasonSelector.tsx
│   └── ViewToggle.tsx
├── routes/              # Page-level route components
│   ├── home.tsx
│   ├── seasons.tsx
│   ├── drivers.tsx
│   └── race.$season.$round.tsx
├── services/            # API integration layer
│   └── api.ts
├── utils/               # Utility functions
│   └── formatters.ts
└── app.css             # Global styles and custom CSS
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Modern web browser with JavaScript enabled

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd f1-task
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run typecheck` - Run TypeScript type checking

## Usage Guide

### Navigation

- **Home**: Landing page with feature overview and quick access to main sections
- **Seasons**: Browse and explore Formula 1 seasons and race schedules
- **Drivers**: Search and discover driver profiles and statistics

### Exploring Seasons

1. Navigate to the Seasons page
2. Use the season selector to choose a specific year
3. Toggle between card and list views based on your preference
4. Click on any race to view detailed results

### Viewing Race Results

1. Select a race from the seasons page
2. View comprehensive race information including winner and fastest lap
3. Explore detailed driver standings with positions, times, and points
4. Access constructor information and team details

### Discovering Drivers

1. Navigate to the Drivers page
2. Use the season selector to filter drivers by specific years
3. Search for drivers by name, nationality, or driver code
4. Click "All Drivers" to view the complete historical database
5. Access external Wikipedia links for detailed biographical information

## API Integration

This application integrates with the [Ergast API](https://ergast.com/mrd/), which provides:

- Historical Formula 1 data from 1950 to present
- Comprehensive race results and driver standings
- Circuit information and race schedules
- Driver and constructor details
- JSON format with structured, reliable data

### API Rate Limiting

The application implements responsible API usage:

- Efficient data fetching with minimal requests
- Built-in error handling and retry mechanisms
- Respect for API rate limits and server resources

## Development Notes

### Type Safety

- Full TypeScript integration with strict type checking
- Comprehensive interfaces for API responses
- Type-safe routing with React Router v7

### Performance Optimizations

- Efficient component re-rendering with React hooks
- Memoized computations for search and filtering
- Optimized bundle size with modern build tools

### Error Handling

- Graceful error states with user-friendly messages
- Automatic retry functionality for failed requests
- Loading states to improve perceived performance

## Browser Support

This application supports all modern browsers including:

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Ergast API](https://ergast.com/mrd/) for providing comprehensive Formula 1 data
- [React Router](https://reactrouter.com/) for the excellent routing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Lucide](https://lucide.dev/) for the beautiful icon set

---

Built with ❤️ for Formula 1 enthusiasts

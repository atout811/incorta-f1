# Unit Testing Documentation

## Overview

This project includes comprehensive unit tests covering key components and logic using **Vitest**, **React Testing Library**, and **Jest DOM** matchers. The tests ensure code quality, reliability, and maintainability.

## Testing Framework Setup

### Dependencies

- **Vitest**: Modern testing framework for Vite projects
- **@testing-library/react**: Testing utilities for React components
- **@testing-library/jest-dom**: Custom matchers for DOM testing
- **@testing-library/user-event**: Utilities for simulating user interactions
- **jsdom**: DOM implementation for Node.js

### Configuration Files

- `vitest.config.ts`: Vitest configuration with jsdom environment
- `src/test/setup.ts`: Global test setup and configurations
- `src/test/globals.d.ts`: TypeScript declarations for jest-dom matchers

## Test Suites

### 1. Utility Functions Tests (`src/test/formatters.test.ts`)

**Coverage: 24 test cases**

Tests the utility functions in `app/utils/formatters.ts`:

#### Function Coverage:

- `formatDriverName()` - Format driver full name
- `formatRaceDate()` - Format race date in long format
- `formatRaceDateShort()` - Format race date in short format
- `getDriverInitials()` - Extract driver initials
- `getPositionSuffix()` - Get ordinal suffix (1st, 2nd, 3rd, etc.)
- `formatPosition()` - Format position with suffix
- `formatLapTime()` - Format lap time or return N/A
- `getCountryFlag()` - Get flag emoji for nationality

#### Key Test Scenarios:

- ✅ Valid input formatting
- ✅ Invalid/malformed input handling
- ✅ Edge cases (11th, 12th, 13th positions)
- ✅ Unknown nationalities fallback
- ✅ Date parsing error handling

### 2. State Management Tests (`src/test/pinnedRacesStore.test.ts`)

**Coverage: 17 test cases**

Tests the Zustand store in `app/store/pinnedRacesStore.ts`:

#### Store Actions Coverage:

- `pinRace()` - Add race to pinned list
- `unpinRace()` - Remove race from pinned list
- `isPinned()` - Check if race is pinned
- `getPinnedRaces()` - Get all pinned races sorted by timestamp
- `getPinnedCount()` - Get count of pinned races
- `getPinnedRacesForSeason()` - Get pinned races for specific season
- `clearAllPinned()` - Clear all pinned races

#### Key Test Scenarios:

- ✅ Initial state validation
- ✅ Race pinning and unpinning
- ✅ Duplicate prevention
- ✅ Timestamp handling
- ✅ Sorting functionality
- ✅ Season filtering
- ✅ Cross-season race handling

### 3. React Component Tests (`src/test/PinButton.test.tsx`)

**Coverage: 13 test cases**

Tests the PinButton React component in `app/components/PinButton.tsx`:

#### Component Behavior Coverage:

- **Rendering States**: Pinned vs unpinned appearance
- **User Interactions**: Click events, event propagation
- **Props Handling**: Custom className, tooltip visibility
- **Store Integration**: State synchronization
- **State Changes**: External state updates

#### Key Test Scenarios:

- ✅ Visual state representation (pinned/unpinned)
- ✅ Click handler functionality
- ✅ Event propagation prevention
- ✅ Tooltip behavior
- ✅ Store state synchronization
- ✅ Multiple toggle operations
- ✅ External state change handling
- ✅ Proper data formatting

### 4. API Service Tests (`src/test/api.test.ts`)

**Coverage: 13 test cases**

Tests the F1 API service in `app/services/api.ts`:

#### API Methods Coverage:

- `getSeasons()` - Fetch F1 seasons
- `getRaces()` - Fetch races for a season
- `getRaceResults()` - Fetch race results
- `getDrivers()` - Fetch drivers (all or by season)

#### Key Test Scenarios:

- ✅ Successful API responses
- ✅ HTTP error handling (404, 500, etc.)
- ✅ Network error handling
- ✅ Malformed response handling
- ✅ Empty result sets
- ✅ Different response structures
- ✅ Error logging

## Test Features

### Mocking Strategy

- **localStorage**: Mocked for store persistence testing
- **fetch API**: Mocked for API service testing
- **Date.now()**: Mocked for timestamp consistency
- **React hooks**: Mocked for component isolation

### Test Utilities

- **Mock Data**: Realistic mock objects for drivers, races, and API responses
- **Helper Functions**: Reusable test utilities
- **Cleanup**: Automatic cleanup between tests
- **State Reset**: Store state reset before each test

## Running Tests

```bash
# Run all tests in watch mode
npm test

# Run tests once and exit
npm run test:run

# Run tests with UI
npm run test:ui
```

## Test Results

All **67 test cases** pass successfully across **4 test files**:

- ✅ Utility Functions: 24 tests
- ✅ State Management: 17 tests
- ✅ React Components: 13 tests
- ✅ API Services: 13 tests

## Testing Best Practices Implemented

1. **Isolation**: Each test is independent and doesn't affect others
2. **Mocking**: External dependencies are properly mocked
3. **Coverage**: Critical paths and edge cases are tested
4. **Descriptive**: Test names clearly describe the expected behavior
5. **Maintainable**: Tests are organized and easy to understand
6. **Fast**: Tests run quickly with minimal setup overhead

## Benefits

- **Regression Prevention**: Catch breaking changes early
- **Documentation**: Tests serve as living documentation
- **Confidence**: Safe refactoring with test coverage
- **Quality Assurance**: Ensure components work as expected
- **Debugging**: Easier to identify and fix issues

This comprehensive test suite ensures the reliability and maintainability of the F1 Racing Dashboard application.

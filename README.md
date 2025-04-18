# SpiceBlend

A modern web application for discovering and creating custom spice blends.

## Features

- 🌶️ Browse a comprehensive catalog of spices with details on flavor profiles and heat levels
- 🔍 Search and filter spices by name, heat level, and price
- 🎨 Create custom spice blends by combining individual spices and existing blends
- 📱 Responsive design for optimal viewing on all devices
- ⚡ Fast and efficient with optimized performance
- 🎯 Type-safe with TypeScript and Zod validation
- 🧪 Comprehensive test coverage with Vitest and Playwright

## Tech Stack

- **Frontend Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS + shadcn/ui components
- **Form Handling:** React Hook Form + Zod
- **State Management:** React Context + TanStack Query
- **Testing:** 
  - Unit Tests: Vitest + Testing Library
  - E2E Tests: Playwright
  - Component Tests: Storybook
- **Development:**
  - ESLint for code quality
  - Prettier for code formatting
  - Husky for Git hooks
  - Commitlint for commit message standards

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm 7 or higher

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run unit tests
- `npm run test:e2e` - Run end-to-end tests
- `npm run test:coverage` - Generate test coverage report
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run typecheck` - Check TypeScript types
- `npm run storybook` - Start Storybook development server

## Project Structure

```
src/
├── components/         # Reusable UI components
├── features/          # Feature-specific components and logic
├── contexts/          # React Context providers
├── hooks/             # Custom React hooks
├── lib/              # Utility functions and type definitions
├── mocks/            # MSW handlers and mock data
├── services/         # API and business logic
├── tests/            # Test utilities and setup
└── types/            # TypeScript type definitions
```

## Testing

The project includes:

- Unit tests for components and hooks
- Integration tests for features
- End-to-end tests for critical user flows
- Visual regression tests with Storybook

Run the test suite:

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:coverage
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## Code Style

- ESLint configuration enforces consistent code style
- Prettier formats code automatically
- Husky runs checks before commits
- Commitlint ensures conventional commit messages

## Author

Mikin

## License

MIT
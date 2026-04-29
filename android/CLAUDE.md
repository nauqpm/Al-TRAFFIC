# Claude AI Development Guide

This React Native Expo project follows specific patterns and uses built-in features for consistency and reusability. The project uses an **enterprise-grade architecture** with feature-based module organization.

## Project Context

**Technology Stack:**

- React Native with Expo SDK 54
- TypeScript (strict mode)
- Expo Router v6 (flat config)
- Redux Toolkit for state management
- ESLint 9 with flat config
- React 19.1 and React Native 0.81.4

## Enterprise Architecture

### Core Principles

1. **Feature-Based Modules** - Each business domain has its own self-contained module
2. **Shared/Common Code** - Reusable utilities, hooks, components in `src/shared`
3. **Clean Separation** - Clear boundaries between features and core infrastructure
4. **Scalable** - Easy to add new features without affecting existing code
5. **Maintainable** - Well-organized structure for long-term project health

## Directory Structure

```
src/
├── shared/                    # Reusable code across all features
│   ├── components/           # Shared UI components
│   │   ├── ui/               # Base components (Button, Image, etc.)
│   │   └── layouts/          # Layout components (headers, nav, etc.)
│   ├── hooks/                # Custom React hooks
│   ├── services/             # API services
│   ├── store/                # Redux store configuration
│   │   └── slices/           # Redux Toolkit slices
│   ├── types/                # Shared TypeScript types
│   └── utils/                # Utility functions
├── features/                  # Feature-based modules
│   ├── home/
│   │   └── screens/          # Home feature screens
│   ├── profile/
│   │   └── screens/          # Profile feature screens
│   └── ...                   # Add more features here
├── theme/                    # Theme configuration
│   ├── colors.ts            # Color palette
│   ├── fonts.ts            # Font definitions
│   └── images.ts           # Image assets
├── providers/               # Context providers
│   └── Provider.tsx        # Main app provider
app/                         # Expo Router routes
└── assets/                  # Static assets
```

## Always Use These Built-in Features

### Configuration & Environment

- **`@/shared/utils/config`** - For all environment variables and app configuration
- **`@/shared/utils/deviceInfo`** - For platform detection, screen dimensions, and device info
- Never hardcode values that should come from configuration

### Theme & Styling

- **`@/theme`** - For all theme exports (colors, fonts, images)
- **`@/theme/colors`** - For all color values (supports dark/light mode)
- **`@/theme/fonts`** - For font loading and typography
- **`@/theme/images`** - For image assets and loading
- Always use theme system instead of hardcoded styles

### Custom Hooks

- **`useColorScheme` from `@/shared/hooks`** - For dark/light theme detection
- **`useDataPersist` from `@/shared/hooks`** - For local storage operations
- **`useKeyboard` from `@/shared/hooks`** - For keyboard state management

### State Management

- **Redux Toolkit slices in `@/shared/store/slices`** - For all global state
- Use `useAppSlice` for accessing global state
- Keep local state minimal, prefer global state for shared data

### Services & API

- **`@/shared/services`** - For all API calls and external integrations
- Never make direct API calls from components
- Use the services layer for data transformation

### Type Definitions

- **`@/shared/types`** - For all TypeScript interfaces and types
- Always define component prop interfaces
- Use strict TypeScript - project is configured for it

## Component Development Patterns

### Component Structure

1. Define TypeScript interface for props
2. Use function declarations (not arrow functions)
3. Place hooks at the top
4. Use early returns for conditional rendering
5. Use `StyleSheet.create` for styles
6. Export default at bottom

### Import Order

1. React and React Native
2. Third-party libraries
3. Internal imports with `@/` paths
4. Relative imports

### File Naming

- **Components**: PascalCase (`Button.tsx`)
- **Hooks**: camelCase with "use" prefix (`useColorScheme.ts`)
- **Utils**: camelCase (`deviceInfo.ts`)
- **Types**: PascalCase (`User.ts`)
- **Screens**: PascalCase with "Screen" suffix (`HomeScreen.tsx`)

## Adding New Features

### Step 1: Create Feature Directory

```
src/features/
└── {feature-name}/
    ├── screens/
    │   ├── {Feature}Screen.tsx
    │   ├── {Feature}DetailsScreen.tsx
    │   └── index.ts
    └── index.ts
```

### Step 2: Create Routes

```
app/
└── (main)/
    └── (tabs)/
        └── {feature-name}/
            ├── _layout.tsx
            ├── index.tsx
            └── details.tsx
```

### Step 3: Register in App

Create route files that delegate to feature screens.

## State Management Rules

- Use Redux Toolkit for global state
- Use `useAppSlice` for state operations
- Keep component state local only when not shared
- Use built-in hooks for common functionality
- Each feature can have its own slice if needed

## Styling Rules

- Always import from `@/theme`
- Use `StyleSheet.create` for performance
- Use platform-specific styles when needed
- Support dark/light mode through theme system

## Testing Requirements

- One test file per component
- Test behavior, not implementation
- Use descriptive test names
- Mock external dependencies
- Place tests alongside components: `Component/Component.test.tsx`

## Navigation (Expo Router v6)

- Use flat config format (already configured)
- Keep route files minimal - delegate to feature screens
- Use `<Redirect>` for programmatic navigation
- Handle deep linking through router
- Route groups use parentheses: `(main)`, `(tabs)`

## Code Quality Standards

- No `console.log` in production code
- Always handle loading and error states
- Write self-documenting code
- Keep functions focused and small
- Use TypeScript strictly

## Key Development Principles

1. **Feature-First** - Organize code by features, not by file types
2. **Reuse Shared** - Always check `src/shared` before creating new code
3. **Follow Patterns** - Use established patterns in the codebase
4. **Type Safety** - Use TypeScript strictly for better code quality
5. **Test Everything** - Write tests for all components
6. **Stay Consistent** - Follow naming conventions and code structure

## Common Utilities Available

### Device & Platform

```typescript
import { isIos, isAndroid, windowWidth, windowHeight } from '@/shared/utils/deviceInfo';
```

### Configuration

```typescript
import config from '@/shared/utils/config';
```

### Theme

```typescript
import { colors, loadFonts, loadImages } from '@/theme';
```

### Hooks

```typescript
import useColorScheme from '@/shared/hooks/useColorScheme';
import { useDataPersist } from '@/shared/hooks';
```

### Store

```typescript
import { useAppSlice } from '@/shared/store/slices';
```

## Architecture Notes

- Project uses enterprise architecture with `src/` directory
- Feature-based module organization for scalability
- Shared code centralized in `src/shared`
- Expo SDK 54 with React 19.1
- ESLint 9 with flat config
- TypeScript strict mode enabled (v5.9.2)
- Custom theme system with dark/light support
- SafeAreaView imported from react-native-safe-area-context (not React Native)
- Required peer dependencies: @expo/metro-runtime, react-native-worklets

## Available Scripts

### Development Commands:

- `npm run dev` - Start Expo development server for all platforms with cache cleared
- `npm run dev:ios` - Start development server for iOS simulator only
- `npm run dev:android` - Start development server for Android emulator only
- `npm run dev:web` - Start development server for web browser only
- `npm run dev:doctor` - Run Expo diagnostics to check project health

### Building & Deployment:

- `npm run dev:build:mobile` - Build iOS (IPA) and Android (APK) using EAS Build for development
- `npm run dev:build:web` - Export static web application to `dist/` directory
- `npm run dev:serve:web` - Serve the built web app locally (run after `dev:build:web`)
- `npm run dev:deploy:web` - Build and deploy web app to EAS Hosting

### Environment & Configuration:

- `npm run dev:secret:push` - Upload environment variables from `.env.dev` to EAS secrets
- `npm run dev:secret:list` - List all environment variables stored in EAS
- `npm run dev:config:public` - Display current Expo configuration for debugging

### Code Quality & Testing:

- `npm run lint` - Run ESLint to check code quality and style
- `npm run lint:staged` - Run linting only on staged Git files (used in pre-commit)
- `npm run format` - Format code using Prettier
- `npm run test` - Run Jest unit tests
- `npm run test:watch` - Run Jest tests in watch mode for development

### Git Hooks:

- `npm run prepare` - Set up Husky Git hooks for pre-commit quality checks

## When in Doubt

- Check existing components in `src/shared/components/ui` for similar functionality
- Use built-in utilities from `src/shared/utils`, `@/theme`, and `src/shared/hooks`
- Follow the established patterns in the codebase
- Prefer extending existing components over creating new ones
- Always use the theme system for consistent UI
- Keep features self-contained with their own screens

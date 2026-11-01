# FoodDeliveryApp

FoodDeliveryApp is a React Native food-delivery app prototype. Its screens describe a local-data shopping flow with simulated account and checkout behavior; it is not connected to a production API or payment provider. The current source has a data-module issue that prevents restaurant discovery from working as intended; see [Known implementation gaps](#known-implementation-gaps).

## Current functionality

- Onboarding, sign-in, and registration screens. Sign-in and registration simulate a successful request and save a mock user and token in AsyncStorage. The saved user determines whether the app opens the authentication or main navigation flow.
- Home screen with food categories, featured restaurants, and a restaurant list. The category selection is currently visual and does not filter the restaurant list.
- Local search across restaurant names, categories, and menu items.
- Restaurant menus, food details, and an in-memory cart with quantity controls and a displayed subtotal, delivery fee, tax, and total.
- Checkout UI with a fixed sample address and selectable payment-method labels. Placing an order displays a confirmation alert, clears the cart, and returns to Home; it does not charge a payment method or create a persisted order.
- Orders and order details use hard-coded sample data. The order list is not populated from checkout.
- Restaurant favorites are held in context state for the current app session. Theme preference support exists in a context, but most screens use the fixed color constants and the Profile screen's dark-mode switch is local UI state.

The sample restaurant and menu data are currently written below the color export in `src/constants/Colors.js`, although screens import them from `src/constants/Data.js`. The latter file is empty at present, so the data imports do not resolve. If restored to the intended module, the checked-in sample fixtures contain one restaurant with two menu items. Images are mostly loaded from remote URLs, so they require network access.

## Technology

- React Native `0.83.1` with React `19.2.0`
- React Navigation 7 (stack and bottom tabs)
- AsyncStorage for mock authentication and theme preference
- Native integrations/dependencies include Maps, Image Picker, Reanimated, Safe Area Context, Ratings, and Vector Icons
- Android and iOS native project folders are included

## Requirements

- Node.js `>=20` (as declared in `package.json`) and npm
- React Native native development prerequisites for your platform: Android Studio/Android SDK for Android; macOS, Xcode, and CocoaPods for iOS
- A configured Android emulator/device or iOS simulator/device

Follow the official [React Native environment setup](https://reactnative.dev/docs/set-up-your-environment) for platform-specific SDK and toolchain requirements.

## Install and run

Install JavaScript dependencies from the repository root:

```sh
npm install
```

Start Metro in one terminal:

```sh
npm start
```

In another terminal, launch the app:

```sh
npm run android
```

On macOS, install CocoaPods dependencies when first setting up the project or after changing native dependencies, then run iOS:

```sh
bundle install
bundle exec pod install
npm run ios
```

The app can also be opened and run through Android Studio or Xcode. For Metro controls, device setup, and troubleshooting, see the React Native documentation linked above.

## Useful commands

| Command | Purpose |
| --- | --- |
| `npm start` | Start the Metro development server |
| `npm run android` | Build and launch on Android |
| `npm run ios` | Build and launch on iOS (macOS required) |
| `npm test -- --runInBand` | Run the Jest tests serially |
| `npm run lint` | Run ESLint |

The current Jest suite contains an app-render smoke test in `__tests__/App.test.tsx`. There is no separate TypeScript type-check script; most app implementation files are JavaScript.

## Project structure

```text
App.tsx                      Providers and auth-based app entry
src/
  components/                Shared UI, food, and restaurant components
  config/                    Environment configuration module (currently incomplete)
  constants/                 Colors, layout, icons, and local sample data
  context/                   Auth, cart, restaurant, and theme state
  navigation/                Authentication, tab, and main stacks
  screens/                   Onboarding, shopping, checkout, orders, and profile screens
  utils/                     Storage, validation, formatting, and animation helpers
android/                     Android native project
ios/                         iOS native project
__tests__/                   Jest tests
```

## Navigation

When there is no stored user, the app shows the authentication stack: Onboarding, Login, and Register. Once the mock authentication flow sets a user, the main stack opens with bottom tabs for:

- **Home** — restaurant discovery, with restaurant, food-detail, and search routes
- **Search** — local search
- **Cart** — cart and checkout
- **Orders** — sample order list
- **Profile** — profile and settings UI

The main stack also registers checkout confirmation, order detail, and favorites screens.

## Known implementation gaps

- `src/constants/Data.js` is empty, but `HomeScreen` and `RestaurantContext` import `restaurants` and `categories` from it. The sample data currently appears in `src/constants/Colors.js` instead. Those imports therefore do not provide the arrays the screens expect, and restaurant discovery will fail at runtime until the data module/export wiring is restored.
- Cart contents and favorites are in-memory context state and are lost when the app process is restarted.
- The order list is hard-coded independently of checkout; a successful checkout does not create an order or open the registered checkout-success screen.
- The checkout confirmation copy says a confirmation email will be sent, but no email or payment request is made.
- The Profile screen shows fixed demo user information, and several visible actions/settings are not connected to profile, account, notification, or preference updates.

## Configuration and integration status

The `.env` file contains example values, not working service credentials. `src/config/env.js` imports `react-native-dotenv`, but that package is not declared in `package.json`, the Babel configuration does not configure its plugin, and the module is not currently used by the app. API, Google Maps, Stripe, and Sentry configuration should therefore be treated as unfinished rather than active integrations. Do not put production secrets or private credentials in this repository.

Authentication, checkout, orders, delivery address, promo codes, payment options, and several profile actions are UI/demo behavior only. Before using this as a live service, these flows need to be connected to an appropriately secured backend and real service integrations.

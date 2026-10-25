# Weather App

A weather forecast app built with Vue 3 and Vite. Live demo: https://antonlazurko.github.io/vue-practice/

Pick a city to see current conditions and a multi-day forecast. Clicking a day card switches both panels to that day.

## Features

- Current weather and daily forecast from [WeatherAPI](https://www.weatherapi.com/)
- Day selection: the left panel (date, temperature, conditions) and the stats (chance of rain, humidity, cloud, wind) follow the selected day
- Location search, with an error message when the city is not found
- Responsive layout: the panels stack on tablets, and on phones the day cards scroll horizontally

## Tech stack

- [Vue 3](https://vuejs.org/) with `<script setup>`, Composition API and `provide` / `inject`
- [Vite](https://vite.dev/) for the dev server and build
- SCSS for component styles
- ESLint, Prettier, Husky + lint-staged for code quality
- GitHub Actions + GitHub Pages for deployment

## Getting started

Requirements: Node.js 22+ and a free API key from [weatherapi.com](https://www.weatherapi.com/signup.aspx).

```bash
npm install
cp .env.example .env.local   # then set VITE_WEATHER_API_KEY in .env.local
npm run dev
```

`.env.local` is git-ignored, so the key never gets committed.

## Scripts

| Command                | Description                                |
| ---------------------- | ------------------------------------------ |
| `npm run dev`          | Start the dev server                       |
| `npm run build`        | Build for production into `dist/`          |
| `npm run preview`      | Serve the production build locally         |
| `npm run lint`         | Check code with ESLint                     |
| `npm run lint:fix`     | Fix ESLint issues and format with Prettier |
| `npm run format`       | Format all files with Prettier             |
| `npm run format:check` | Check formatting without changing files    |

A pre-commit hook runs ESLint and Prettier on staged files.

## Project structure

```
src/
├── api.js              # WeatherAPI request and error handling
├── constants.js        # API config, default location, provide/inject keys
├── main.js             # App bootstrap, global v-focus directive
├── style.css           # Global styles and CSS variables (colors, font)
├── App.vue             # Data loading, selected day, provides shared state
└── components/
    ├── LeftPanel.vue       # Selected day: date, location, temperature, conditions
    ├── RightPanel.vue      # Stats, day cards and location changer
    ├── DayCard.vue         # Single forecast day
    ├── Stat.vue            # Label + value row
    ├── LocationChanger.vue # Location input and save button
    ├── WeatherIcon.vue     # Picks an icon by weather condition code
    ├── ErrorMessage.vue
    ├── Button.vue
    ├── Input.vue
    └── icons/              # SVG icons as components
```

### State

`App.vue` holds the shared state and passes it down with `provide` / `inject`. The keys are Symbols from `constants.js`:

| Key                       | Value                                                                          |
| ------------------------- | ------------------------------------------------------------------------------ |
| `FORECAST_PROVIDE`        | Raw API response                                                               |
| `SELECTED_DAY_PROVIDE`    | Data for the selected day: current weather for today, daily forecast otherwise |
| `ACTIVE_DAY_PROVIDE`      | Selected day index, reset to `0` after each load                               |
| `IS_LOADING_PROVIDE`      | Request in progress                                                            |
| `ERROR_PROVIDE`           | Last request error                                                             |
| `CHANGE_LOCATION_PROVIDE` | Function that sets a new location and triggers a reload                        |

## Deployment

Each push to `master` runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which lints, builds and publishes the app to GitHub Pages.

One-time setup in the GitHub repository:

1. **Settings → Secrets and variables → Actions**: add a secret `WEATHER_API_KEY`
2. **Settings → Pages → Source**: select **GitHub Actions**

The build uses `base: '/vue-practice/'` (see [`vite.config.js`](vite.config.js)). If the repository is renamed, update `base` to match.

> **Note:** Vite embeds `VITE_*` variables into the client bundle, so the API key can be seen in the deployed site. The GitHub secret only keeps it out of the repository.

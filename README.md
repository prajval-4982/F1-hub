# F1 Performance Hub 🏎️💨

A high-performance, real-time Formula 1 analytics dashboard built with **Next.js 14**, **TypeScript**, and **Vanilla CSS**. This platform provides deep insights into the 2026 championship, car performance, track-specific telemetry, and race strategies.

---

## 🚀 Features

### 🏁 Track Analyzer
- **10-Track Navigator**: Interactive SVG circuit maps for 10 major GPs (Monaco, Silverstone, Spa, Zandvoort, Interlagos, etc.).
- **Segment Telemetry**: Detailed speed data per team for every corner and straight.
- **Dynamic Highlights**: Team-colored segment visualization with ambient glows and racing line indicators.
- **Theme-Aware**: Optimized for both high-end Dark mode and high-contrast Light mode.

### 📊 Season & Strategy
- **Live Standings**: Real-time Driver and Constructor championship points.
- **Race Results**: Comprehensive results for every round with gap analysis.
- **Tyre Strategy Visualizer**: Horizontal timeline of pit stops and tyre stints per driver.
- **Live Weather**: Real-time race day weather conditions via OpenMeteo API.

### 🤝 Comparisons
- **Car Comparison**: Radar charts and attribute bars comparing aerodynamic, power, and chassis efficiency.
- **Driver Head-to-Head**: Side-by-side statistical analysis of any two drivers on the grid.

### 📱 Modern Tech Stack
- **PWA Support**: Installable on mobile and desktop with offline caching features.
- **CI/CD**: Automated data updates via GitHub Actions every 4 hours during race weekends.
- **Vibe**: Glassmorphic UI with smooth transitions and premium aesthetics.

---

## 🛠️ How to Navigate

1.  **Home Page**: Your entry point. Click "Track Analyzer", "Live Season", or "Car Comparison" to dive in.
2.  **Track Analyzer** (`/track`):
    *   Use the **Track Pills** at the top to switch circuits.
    *   **Hover** over the track map to see segment labels.
    *   **Click** a segment to see detailed speed comparisons between teams in the sidebar.
3.  **Season Page** (`/season`):
    *   **Championship**: View the current standings.
    *   **Race Results**: Select a race pill to see the full classification and local weather.
    *   **Tyre Strategy**: See how the race was won or lost in the pits.
4.  **Comparison** (`/compare`):
    *   Toggle between **Car Comparison** (Radar charts) and **Driver H2H** using the sub-navigation pills.
    *   Pick teams or drivers from the dropdowns to update the metrics instantly.
5.  **Keyboard Shortcuts**:
    *   **Arrow Right**: Next main page.
    *   **Arrow Left**: Previous main page.
    *   **Ctrl+P**: Export current view to a clean PDF (Standings/Results).

---

## 💻 Get Started

### Prerequisites
- Node.js 18+
- npm

### Installation
```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

---

## 📄 License
This project is for educational and enthusiast purposes. data provided by Jolpica/Ergast API.

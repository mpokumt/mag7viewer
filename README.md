# Mag7 Viewer

A full-stack web application for exploring and visualizing **Magnificent 7 (MAG7)** stock data with an interactive frontend and a Python-powered backend.


## 📌 Overview

Mag7 Viewer provides a modern UI for analyzing stock data (e.g., Apple, Microsoft, Google, etc.) with charts, date selection, and real-time querying. It combines a **React + Vite frontend** with a **Python backend (FastAPI/Flask)** for data fetching and processing.


## 🚀 Features

* 📊 Interactive stock data visualization (charts & trends)
* 📅 Date-based filtering and selection
* ⚡ Fast frontend powered by Vite
* 🔄 Backend API for fetching financial data
* 📡 Data sourced via Yahoo Finance (`yfinance`)
* 🎨 Modern UI with Tailwind CSS and Radix UI

---

## 🏗️ Project Structure

```
mag7viewer/
│
├── backend/                  # Python backend API
│   ├── main.py              # Entry point (FastAPI/Flask server)
│   ├── routes/              # API route definitions
│   ├── services/            # Data fetching & processing logic
│
├── src/                     # Frontend source (React + TypeScript)
│   ├── components/          # Reusable UI components
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Shared logic
│   ├── utils/               # Helper functions
│   ├── App.tsx              # Root component
│   ├── main.tsx             # Frontend entry point
│
├── public/                  # Static assets
├── dist/                    # Production build output
│
├── package.json             # Frontend dependencies & scripts
├── yarn.lock                # Yarn lockfile
├── requirements.txt         # Python dependencies
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript configuration
├── eslint.config.js         # Linting rules
├── README.md                # Documentation
```

## 🔌 Architecture Overview

```
[ React Frontend ]  --->  [ Backend API ]  --->  [ yfinance ]
         │                          │
         │                          └── Data processing (Pandas)
         └── Charts (Recharts)
```

---

## 🛠️ Technologies Used

### Frontend

* **React 19**
* **TypeScript**
* **Vite**
* **Tailwind CSS v4**
* **Radix UI**
* **Framer Motion**
* **Recharts**
* **TanStack React Query**
* **Lucide React**

### Backend

* **Python 3**
* **FastAPI / Flask**
* **Uvicorn**
* **Pandas**
* **NumPy**
* **yfinance**
* **BeautifulSoup4**

### Tooling

* **Yarn 4**
* **ESLint**
* **Prettier**
* **gh-pages**

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/mpokumt/mag7viewer.git
cd mag7viewer
```

---

### 2. Install dependencies

#### Frontend

```bash
yarn install
```

#### Backend

First off ensure that you have Python 3.14 + installed on your computer

Set up virtual environment

```
python3 -m venv .venv
```

Activate virtual environment

```
source .venv/bin/activate
```

Install Libraries

```bash
pip install -r requirements.txt
```

---

## ▶️ Running the Project

### Start frontend (development)

```bash
yarn dev
```

### Start backend

```bash
yarn backend
```

Or manually:

```bash
cd backend
python3 main.py
```

---

## 📊 How MAG7 Data is Computed

The application focuses on the **Magnificent 7 stocks**:

* AAPL (Apple)
* MSFT (Microsoft)
* GOOGL (Alphabet)
* AMZN (Amazon)
* META (Meta)
* TSLA (Tesla)
* NVDA (Nvidia)

### Data Pipeline

1. **Fetch**

   * Uses `yfinance` to retrieve historical stock prices
   * Typically pulls daily OHLC (Open, High, Low, Close) data

2. **Process**

   * Cleaned and structured using **Pandas**
   * Dates are normalized across all tickers
   * Missing values handled appropriately

3. **Aggregate**

   * Stocks combined into a unified dataset
   * Optional transformations:

     * Normalization (e.g., base index = 100)
     * Percentage change over time
     * Relative performance comparison

4. **Serve**

   * Data exposed via REST API endpoints
   * JSON responses optimized for frontend consumption

5. **Visualize**

   * Rendered using **Recharts**
   * Supports line charts, comparisons, and time-series views

---


## 🧪 Development Notes

* Uses **React Query** for API state management
* Tailwind utilities (`clsx`, `tailwind-merge`) for styling
* Modular component structure for scalability
* Backend supports async processing (FastAPI-ready)

---

## 📬 Contact

Open an issue on GitHub for questions or suggestions.

---

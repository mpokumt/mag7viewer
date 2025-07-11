# MAG7 Interactive Return Viewer (React + TypeScript + Vite + Python)

A simple full-stack app to visualize daily returns of the MAG7 stocks (MSFT, AAPL, GOOGL, AMZN, NVDA, META, TSLA) using data from yfinance

## Prerequisites

- Install nvm
- Install node
- Install [yarn](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-the-yarn-package-manager-for-node-js) 4.7.0

```
nvm install <node_version>
nvm use <node_version>

npm install -g yarn

yarn set version 4.7.0
```

## Getting Started

### Frontend - Make sure you're in the the root of the project before proceeding.

First things first, install the libraries:

```bash
yarn install --immutable
```

Then, run the development server:

```bash
yarn dev
```

Open [http://localhost:5173](http://localhost:5173) with your browser to see the result.

### Backend - Make sure you're in the the /backend directory of the project before proceeding.

First off ensure that you have Python 3+ installed on your computer

Set up virtual environment

```
python3 -m venv .venv
```

Activate virtual environment

```
source .venv/bin/activate
```

Install Python libraries

```
pip install -r requirements.txt
```

Run Python backend

```
python3 main.py
```

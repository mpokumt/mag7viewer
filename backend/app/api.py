from fastapi import FastAPI, HTTPException, Query, Request
from fastapi.middleware.cors import CORSMiddleware
import yfinance as yf
import statistics
import pandas as pd
from datetime import date
import logging

########################### Logging Configuration ###########################
logger = logging.getLogger("mag7viewer")
logging.basicConfig(filename='mag7viewer.log', encoding='utf-8', level=logging.INFO,)

# Tickers to monitor
tickers = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'META', 'NVDA']

def retrieveValues(startDate: str, endDate: str):
    dataList = [] 

    for ticker in tickers:
        try:
            stock = yf.Ticker(ticker)
            data = stock.history(start=startDate, end=endDate, interval="1d")

            logger.info(f"Retrieving symbol {ticker} individual values from {startDate} to {endDate}")

            #remove timezone
            data.index = data.index.tz_localize(None)

            #set index
            data.reset_index(inplace=True)

            dataFrame = pd.DataFrame()
            updatedDataFrame = dataFrame.assign(changePercent = data['Close'].pct_change().fillna(0), date = data['Date'].dt.strftime("%b %d '%y"), change = data['Close'])

            logger.info(f"Successfully created dataframe for symbol {ticker} individual values")

            dict =  {
                "currentPrice": stock.info.get('currentPrice'),
                "dailyReturn":  updatedDataFrame.to_dict(orient='records'),
                "max": max(data['Close'].rolling(window=1).max().dropna().tolist()),
                "min": min(data['Close'].rolling(window=1).min().dropna().tolist()),
                "mean": statistics.mean((data['Close'].rolling(window=1).mean().dropna().tolist())),
                "name": stock.info.get('longName'),
                "symbol": stock.info.get('symbol')
            }

            dataList.append(dict)

            logger.info(f"Successfully retrieved symbol {ticker} individual values")

        except Exception as error:
            logger.exception(f"Error while retrieving symbol {ticker} individual values - {error}")

    return dataList

def retrieveSummaryInfo():
    dataList = [] 

    for ticker in tickers:
        try:
            stock = yf.Ticker(ticker)

            logger.info(f"Retrieving symbol {ticker} summary values")

            dict =  {
                "currentPrice": stock.info.get('currentPrice'),
                "change": stock.info.get('regularMarketChange'),
                "changePercent": stock.info.get('regularMarketChangePercent'),
                "high": stock.info.get('dayHigh'),
                "low": stock.info.get('dayLow'),
                "name": stock.info.get('longName'),
                "symbol": stock.info.get('symbol'),
                "marketCap": stock.info.get('marketCap')
            }

            dataList.append(dict)

            logger.info(f"Successfully retrieved symbol {ticker} summary values")

        except Exception as error:
            logger.exception(f"Error while retrieving symbol {ticker} summary values - {error}")

    return dataList

# API ####################################
app = FastAPI()

# Allowed origins for CORS
origins = [
    "http://localhost:5173",
    "http://localhost:4173",
    "https://mpokumt.github.io"
]

# CORS Middleware Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=False,
    allow_methods=["GET", "OPTIONS"],
    allow_headers=["Content-Type"],
    max_age=1800
)

# Middleware to enforce origin checking
@app.middleware("http")
async def enforce_origin(request: Request, call_next):
    origin = request.headers.get("origin")
    if origin and origin not in origins:
        # reject cross-origin requests from untrusted origins early
        logger.warning(f"Blocked request from untrusted origin: {origin}")
        raise HTTPException(status_code=403, detail="Untrusted origin")
    logger.info(f"Accepted request from origin: {origin}")
    return await call_next(request)

@app.get("/returns")
async def get_Ticker_Values(start: date = Query(...), end: date = Query(...)):
    max_range_days = 365

    if start > end:
        logger.warning(f"Invalid date range: start date {start} is after end date {end}")
        raise HTTPException(status_code=400, detail="start date must be before end date")

    if (end - start).days > max_range_days:
        logger.warning(f"Date range too large: {start} to {end}")
        raise HTTPException(status_code=400, detail=f"Date range is too large (max {max_range_days} days)")
    
    retrievedVals = retrieveValues(startDate=start.isoformat(), endDate=end.isoformat())

    return { "data": retrievedVals}

@app.get("/summary")
async def get_summary_values():
    retrievedVals = retrieveSummaryInfo()

    return { "data": retrievedVals}
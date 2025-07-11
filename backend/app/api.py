from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import yfinance as yf
import traceback
import statistics
import pandas as pd

tickers = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'META', 'NVDA']

def retrieveValues(startDate: str, endDate: str):
    dataList = [] 

    for ticker in tickers:
        try:
            stock = yf.Ticker(ticker)
            data = stock.history(start=startDate, end=endDate, interval="1d")

            #remove timezone
            data.index = data.index.tz_localize(None)

            #set index
            data.reset_index(inplace=True)

            dataFrame = pd.DataFrame()
            updatedDataFrame = dataFrame.assign(changePercent = data['Close'].pct_change().fillna(0), date = data['Date'].dt.strftime("%b %d '%y"), change = data['Close'])

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

        except Exception as error:
            print(f'Error while retrieving symbol {ticker}info: {error}')
            print(traceback.format_exc())

    return dataList

def retrieveSummaryInfo():
    dataList = [] 

    for ticker in tickers:
        try:
            stock = yf.Ticker(ticker)

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

        except Exception as error:
            print(f'Error while retrieving symbol {ticker}info: {error}')
            print(traceback.format_exc())

    return dataList

# API ####################################
app = FastAPI()

origins = [
    "http://localhost:5173",
    "localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/returns")
async def get_Ticker_Values(start:str, end: str):
    retrievedVals = retrieveValues(startDate=start, endDate=end)

    return { "data": retrievedVals}

@app.get("/summary")
async def get_summary_values():
    retrievedVals = retrieveSummaryInfo()

    return { "data": retrievedVals}
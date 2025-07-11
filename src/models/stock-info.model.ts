import type { StockChart } from "./stock-chart.model";

export interface StockInfo {
    currentPrice: number;
    website: string;
    name: string;
    max: number;
    mean: number;
    min: number;
    dailyReturn: StockChart[];
    symbol: string;
}

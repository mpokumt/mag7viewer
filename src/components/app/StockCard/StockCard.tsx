import { motion } from "framer-motion";

import { CardChart } from "@/components";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import type { StockChart, StockInfo, Ticker } from "@/models";
import { formatNumber } from "@/utils";

interface StockCardProps {
    stock: StockInfo;
    index: number;
    isLoading: boolean;
}

export const StockCard = ({ stock, index, isLoading }: StockCardProps) => {
    const { symbol, currentPrice, dailyReturn, name, min, max, mean } = stock;

    const colorsKey = {
        AAPL: "#007AFF",
        AMZN: "#FF9900",
        GOOGL: "#4285F4",
        META: "#1877F2",
        MSFT: "#00BCF2",
        NVDA: "#76B900",
        TSLA: "#CC0000"
    };

    const getStockColor = () => {
        return colorsKey[symbol as Ticker] ?? "#2563EB";
    };

    const loadingContainer = (
        <CardContent>
            <div className="space-y-4">
                <div className="animate-pulse flex space-x-4">
                    <div className="rounded-full bg-gray-200 h-10 w-10"></div>
                    <div className="flex-1 space-y-2 py-1">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                </div>
            </div>
        </CardContent>
    );

    const stockCardContent = (
        <>
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                        <div
                            className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                            style={{ backgroundColor: getStockColor() }}
                        >
                            {symbol.slice(0, 2)}
                        </div>

                        <div>
                            <CardTitle className="text-lg font-bold text-gray-900">
                                {symbol}
                            </CardTitle>

                            <p className="text-[0.8rem] text-gray-500">{name}</p>
                        </div>
                    </div>

                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <div className="text-[1rem] font-bold text-gray-900">
                            {formatNumber(currentPrice)}
                        </div>
                    </motion.div>
                </div>
            </CardHeader>

            <CardContent className="pt-0">
                <div className="space-y-4">
                    <CardChart
                        chartColor={getStockColor()}
                        chartData={dailyReturn as StockChart[]}
                    />

                    <div className="grid grid-cols-3 gap-4 pt-3 border-t border-gray-100">
                        <div className="text-center">
                            <div className="text-sm text-gray-500">High</div>

                            <div className="font-semibold text-[0.9rem] text-gray-900">
                                {formatNumber(max)}
                            </div>
                        </div>

                        <div className="text-center">
                            <div className="text-sm text-gray-500">Avg</div>

                            <div className="font-semibold text-[0.9rem] text-gray-900">
                                {formatNumber(mean)}
                            </div>
                        </div>

                        <div className="text-center">
                            <div className="text-sm text-gray-500">Low</div>

                            <div className="font-semibold text-[0.9rem] text-gray-900">
                                {formatNumber(min)}
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </>
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 }
            }}
        >
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                {isLoading ? loadingContainer : stockCardContent}
            </Card>
        </motion.div>
    );
};

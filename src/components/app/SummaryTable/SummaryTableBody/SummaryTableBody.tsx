import { motion } from "framer-motion";

import { Badge, NumberTrend, TableBody, TableCell } from "@/components/ui";
import type { StockSummaryInfo } from "@/models";
import { formatNumber, getChangeColor, getChangePercentColor } from "@/utils";

interface SummaryTableBodyProps {
    sortedData: StockSummaryInfo[];
}

export const SummaryTableBody = ({ sortedData }: SummaryTableBodyProps) => {
    return (
        <TableBody>
            {sortedData?.map((stock: StockSummaryInfo, index: number) => (
                <motion.tr
                    key={stock.symbol}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="hover:bg-gray-50/50 transition-colors cursor-pointer"
                >
                    <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold text-sm">
                                    {stock.symbol.slice(0, 2)}
                                </span>
                            </div>

                            <div>
                                <div className="font-semibold text-gray-900">{stock.symbol}</div>

                                <div className="text-sm text-gray-500">{stock.companyName}</div>
                            </div>
                        </div>
                    </TableCell>

                    <TableCell className="font-semibold text-gray-900">
                        {formatNumber(stock.currentPrice)}
                    </TableCell>

                    <TableCell className={getChangeColor(stock.change)}>
                        <NumberTrend
                            change={stock.change}
                            color={getChangeColor(stock.change)}
                            numberInfo={formatNumber(Math.abs(stock.change))}
                        />
                    </TableCell>

                    <TableCell>
                        <Badge className={getChangePercentColor(stock.changePercent)}>
                            {stock.changePercent > 0 ? "+" : ""}
                            {stock.changePercent?.toFixed(2)}%
                        </Badge>
                    </TableCell>

                    <TableCell className="text-gray-600 font-medium">
                        {formatNumber(stock.marketCap)}
                    </TableCell>
                </motion.tr>
            ))}
        </TableBody>
    );
};

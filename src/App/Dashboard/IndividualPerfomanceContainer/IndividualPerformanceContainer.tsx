import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useState } from "react";

import { DatePicker, ErrorAlert, StockCard } from "@/components/app";
import type { StockInfo } from "@/models";
import type { DateRange } from "../Dashboard";
import { Card, CardContent } from "@/components/ui";

export const IndividualPerformanceContainer = () => {
    const [dateRange, setDateRange] = useState<DateRange>({
        startDate: "2025-07-01",
        endDate: "2025-07-09"
    });

    const retrieveIndividualPerformanceInfo = async () => {
        const response = await fetch(
            `http://localhost:8000/returns?start=${dateRange.startDate}&end=${dateRange.endDate}`
        );

        return response.json();
    };

    const { data, isError, isLoading, isRefetching, refetch } = useQuery({
        queryKey: ["individualInfo", dateRange],
        queryFn: () => retrieveIndividualPerformanceInfo(),
        staleTime: 150000
    });

    const tickers = ["AAPL", "MSFT", "GOOGL", "AMZN", "TSLA", "META", "NVDA"];

    console.log({ dateRange });

    const handleDateChange = (updatedRange: DateRange) => {
        const endDate = new Date(updatedRange.endDate);
        const startDate = new Date(updatedRange.startDate);

        const updatedStartDate = startDate.toISOString().slice(0, 10);
        const updatedEndDate = endDate.toISOString().slice(0, 10);

        setDateRange({
            startDate: updatedStartDate,
            endDate: updatedEndDate
        });

        refetch();
    };

    return (
        <>
            {isError ? (
                <ErrorAlert />
            ) : (
                <div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 px-[1rem] mt-[4rem] text-center">
                            Individual Stock Performance
                        </h2>
                    </motion.div>

                    <DatePicker
                        handeDateChange={handleDateChange}
                        isLoading={isLoading || isRefetching}
                        dateRange={dateRange}
                    />

                    {isLoading || isRefetching ? (
                        <div className="space-y-4 mt-[2rem]">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {tickers.map((ticker: string) => (
                                    <Card
                                        key={ticker}
                                        className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                                    >
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
                                    </Card>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4 mt-[2rem]">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {data?.data?.map((stock: StockInfo, index: number) => (
                                    <StockCard
                                        key={stock.symbol}
                                        stock={stock}
                                        index={index}
                                        isLoading={isLoading}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

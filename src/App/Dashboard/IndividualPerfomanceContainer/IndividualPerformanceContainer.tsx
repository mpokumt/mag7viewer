import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { lazy, Suspense, useState } from "react";

import { DatePicker, ErrorAlert, StockCard } from "@/components/app";
import type { StockInfo } from "@/models";
import type { DateRange } from "../Dashboard";
import { LoadingCard } from "./LoadingCard";

interface IndividualPerformanceContainerProps {
    tickers: string[];
}

const TickerCards = lazy(() => import("./CardContainer/CardContainer"));

export const IndividualPerformanceContainer = ({
    tickers
}: IndividualPerformanceContainerProps) => {
    const endDate = new Date();
    const initialStartDate = new Date();

    initialStartDate.setDate(initialStartDate.getDate() - 30);

    const formattedStartDate = initialStartDate.toISOString().slice(0, 10);

    const [dateRange, setDateRange] = useState<DateRange>({
        endDate: endDate.toISOString().slice(0, 10),
        startDate: formattedStartDate
    });

    const loadingContent = (
        <>
            {tickers.map((index) => (
                <LoadingCard key={index} />
            ))}
        </>
    );

    const retrieveIndividualPerformanceInfo = async () => {
        const response = await fetch(
            `/api/returns?start=${dateRange.startDate}&end=${dateRange.endDate}`
        );

        return response.json();
    };

    const { data, isError, isLoading, isRefetching, refetch } = useQuery({
        queryKey: ["individualInfo", dateRange],
        queryFn: () => retrieveIndividualPerformanceInfo(),
        staleTime: 150000
    });

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
                <ErrorAlert summary={false} />
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

                    <Suspense fallback={loadingContent}>
                        <TickerCards>
                            {isLoading || isRefetching
                                ? loadingContent
                                : data?.data?.map((stock: StockInfo, index: number) => (
                                      <StockCard
                                          key={stock.symbol}
                                          stock={stock}
                                          index={index}
                                          isLoading={isLoading}
                                      />
                                  ))}
                        </TickerCards>
                    </Suspense>
                </div>
            )}
        </>
    );
};

import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { useMemo, useState } from "react";

import { ErrorAlert, SummaryTableBody, SummaryTableHeader, type HeadingName } from "@/components";
import { Card, CardContent, CardHeader, CardTitle, Table } from "@/components/ui";

export interface SortConfig {
    key: HeadingName | null;
    direction: "ASC" | "DESC";
}

export const SummaryTable = () => {
    const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: "ASC" });

    const tickers = ["AAPL", "MSFT", "GOOGL", "AMZN", "TSLA", "META", "NVDA"];

    const retrieveSummaryInfo = async () => {
        const response = await fetch(`http://localhost:8000/summary`);

        return response.json();
    };

    const { data, isError, isLoading } = useQuery({
        queryKey: ["summaryInfo"],
        queryFn: retrieveSummaryInfo
    });

    const handleHeaderSorting = (sortKey: HeadingName) => {
        setSortConfig((previousSortConfig) => ({
            key: sortKey,
            direction:
                previousSortConfig?.key === sortKey && previousSortConfig?.direction === "ASC"
                    ? "DESC"
                    : "ASC"
        }));
    };

    const loadingContainer = (
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    MAG7 Stock Daily Summary
                </CardTitle>
            </CardHeader>

            <CardContent>
                <div className="space-y-4">
                    {tickers.map((ticker: string) => (
                        <div key={ticker} className="animate-pulse flex space-x-4">
                            <div className="rounded-full bg-gray-200 h-10 w-10"></div>
                            <div className="flex-1 space-y-2 py-1">
                                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );

    const sortedData = useMemo(() => {
        const sortedValues = data?.data?.sort((a: any, b: any) => {
            const aValue = a[sortConfig.key as HeadingName];
            const bValue = b[sortConfig.key as HeadingName];

            if (aValue < bValue) {
                return sortConfig.direction === "ASC" ? -1 : 1;
            }

            if (aValue > bValue) {
                return sortConfig.direction === "ASC" ? 1 : -1;
            }

            return 0;
        });

        return sortedValues;
    }, [data?.data, sortConfig]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            {isLoading ? (
                loadingContainer
            ) : isError ? (
                <ErrorAlert />
            ) : (
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg px-[1.4rem]">
                    <CardHeader className="border-b border-gray-100 px-[0.5rem]">
                        <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-blue-600" />
                            MAG7 Stock Daily Summary
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="px-0">
                        <div className="overflow-x-auto">
                            <Table>
                                <SummaryTableHeader
                                    handleHeaderSorting={handleHeaderSorting}
                                    sortConfig={sortConfig as SortConfig}
                                />

                                <SummaryTableBody sortedData={sortedData ?? data?.data} />
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            )}
        </motion.div>
    );
};

import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

import { TableHead } from "@/components/ui";
import type { SortConfig } from "@/components";

interface SummaryTableHeadProps {
    handleHeaderSorting: (key: HeadingName) => void;
    headerInfo: HeaderInfo;
    sortConfig: SortConfig;
}

export type HeadingName = "symbol" | "currentPrice" | "change" | "changePercent" | "marketCap";

export interface HeaderInfo {
    name: HeadingName;
    heading: string;
}

export const SummaryTableHead = ({
    headerInfo,
    handleHeaderSorting,
    sortConfig
}: SummaryTableHeadProps) => {
    const handleOnClick = () => {
        handleHeaderSorting(headerInfo.name);
    };

    return (
        <TableHead
            className="cursor-pointer hover:bg-gray-50 transition-colors font-semibold text-gray-500"
            onClick={handleOnClick}
        >
            <div className="flex items-center gap-2">
                {headerInfo.heading}

                {sortConfig.key === headerInfo.name &&
                    (sortConfig.direction === "ASC" ? (
                        <ArrowUpIcon className="w-4 h-4" />
                    ) : (
                        <ArrowDownIcon className="w-4 h-4" />
                    ))}
            </div>
        </TableHead>
    );
};

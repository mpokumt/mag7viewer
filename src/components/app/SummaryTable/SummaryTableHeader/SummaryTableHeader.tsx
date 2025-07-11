import { SummaryTableHead, type HeaderInfo, type HeadingName, type SortConfig } from "@/components";
import { TableHeader, TableRow } from "@/components/ui";

interface SummaryTableHeaderProps {
    handleHeaderSorting: (key: HeadingName) => void;
    sortConfig: SortConfig;
}

export const SummaryTableHeader = ({
    handleHeaderSorting,
    sortConfig
}: SummaryTableHeaderProps) => {
    const headers: HeaderInfo[] = [
        { name: "symbol", heading: "Stock" },
        { name: "currentPrice", heading: "Price" },
        { name: "change", heading: "Change" },
        { name: "changePercent", heading: "Change %" },
        { name: "marketCap", heading: "Market Cap" }
    ];

    return (
        <TableHeader>
            <TableRow className="hover:bg-gray-50/50">
                {headers.map((header: HeaderInfo) => (
                    <SummaryTableHead
                        key={header.name}
                        sortConfig={sortConfig}
                        handleHeaderSorting={handleHeaderSorting}
                        headerInfo={header}
                    />
                ))}
            </TableRow>
        </TableHeader>
    );
};

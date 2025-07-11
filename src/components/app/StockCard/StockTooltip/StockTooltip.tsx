import { NumberTrend } from "@/components/ui";
import { formatNumber, getChangeColor } from "@/utils";

interface StockTooltipProps {
    active: boolean;
    payload: any[];
    label: string | number;
}

export const StockTooltip = ({ active, payload, label }: StockTooltipProps) => {
    return (
        <>
            {active && payload.length > 0 ? (
                <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg text-center">
                    <p className="text-md font-bold font-medium text-gray-600 mb-[0.5rem]">
                        {label}
                    </p>

                    <p className="text-xs font-bold text-gray-900 mb-[0.3rem]">
                        Price: ${payload[0].value?.toFixed(2)}
                    </p>

                    <div className="ml-[0.5rem]">
                        <NumberTrend
                            color={getChangeColor(payload[0].payload.changePercent)}
                            change={payload[0].payload.changePercent}
                            numberInfo={formatNumber(
                                Math.abs(payload[0].payload.changePercent),
                                true
                            )}
                        />
                    </div>
                </div>
            ) : null}
        </>
    );
};

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { StockTooltip } from "@/components/app";
import type { StockChart } from "@/models";

interface CardChartProps {
    chartColor: string;
    chartData: StockChart[];
}

export const CardChart = ({ chartColor, chartData }: CardChartProps) => {
    return (
        <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                    <XAxis
                        dataKey="date"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: "#9CA3AF" }}
                    />

                    <YAxis hide={true} />

                    <Tooltip content={<StockTooltip />} />

                    <Line
                        type="monotone"
                        dataKey="change"
                        stroke={chartColor}
                        strokeWidth={2}
                        dot={false}
                        activeDot={{
                            r: 4,
                            stroke: chartColor,
                            strokeWidth: 2
                        }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

import { TrendingDown, TrendingUp } from "lucide-react";
import type { ReactNode } from "react";

interface NumberTrendProps {
    color: string;
    change: number;
    numberInfo: ReactNode;
}

export const NumberTrend = ({ change, color, numberInfo }: NumberTrendProps) => {
    return (
        <div className={`flex items-center gap-1 ${color}`}>
            {change > 0 ? (
                <TrendingUp className="w-4 h-4" />
            ) : change < 0 ? (
                <TrendingDown className="w-4 h-4" />
            ) : null}

            {numberInfo}
        </div>
    );
};

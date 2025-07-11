import { motion } from "framer-motion";
import { ChartLine } from "lucide-react";

import { SummaryTable } from "@/components/app";
import { Footer } from "./Footer";
import { IndividualPerformanceContainer } from "./IndividualPerfomanceContainer";

export interface DateRange {
    startDate: string;
    endDate: string;
}

export const Dashboard = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center space-y-2"
                >
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                        Mag7 Interactive Return Viewer
                    </h1>
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                        <ChartLine className="w-4 h-4" />
                        <span>Live MAG7 Stock Dashboard</span>
                    </div>
                </motion.div>

                <SummaryTable />

                <IndividualPerformanceContainer />

                <Footer />
            </div>
        </div>
    );
};

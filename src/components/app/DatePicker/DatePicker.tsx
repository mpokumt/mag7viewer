import { motion } from "framer-motion";
import { RefreshCw } from "lucide-react";
import { useState } from "react";

import type { DateRange } from "@/App/Dashboard";
import { DateField } from "@/components";
import { Button, Card, CardContent } from "@/components/ui";
import { formatDate } from "@/utils";

interface DatePickerProps {
    handeDateChange: (dateRange: DateRange) => void;
    isLoading: boolean;
    dateRange: DateRange;
}

export const DatePicker = ({ handeDateChange, isLoading, dateRange }: DatePickerProps) => {
    const [startDate, setStartDate] = useState<Date>(new Date(dateRange.startDate));
    const [endDate, setEndDate] = useState<Date>(new Date(dateRange.endDate));

    const handleStartDateOnChange = (date: string) => {
        setStartDate(new Date(date));
    };

    const handleEndDateOnChange = (date: string) => {
        setEndDate(new Date(date));
    };

    const handleRefreshOnClick = () => {
        handeDateChange({
            startDate: formatDate(startDate) ?? "",
            endDate: formatDate(endDate) ?? ""
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row gap-4 items-space-between">
                        <DateField
                            handleDateChange={handleStartDateOnChange}
                            id="startDate"
                            label="Start Date"
                            value={formatDate(startDate) ?? ""}
                        />

                        <DateField
                            handleDateChange={handleEndDateOnChange}
                            id="endDate"
                            label="End Date"
                            value={formatDate(endDate) ?? ""}
                        />

                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Button
                                onClick={handleRefreshOnClick}
                                disabled={isLoading}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 h-10 shadow-lg hover:shadow-xl transition-all duration-200 sm: w-[100%] mt-[1.6rem] "
                            >
                                {isLoading ? (
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{
                                            duration: 1,
                                            repeat: Infinity,
                                            ease: "linear"
                                        }}
                                    >
                                        <RefreshCw className="w-4 h-4 mr-2" />
                                    </motion.div>
                                ) : (
                                    <RefreshCw className="w-4 h-4 mr-2" />
                                )}

                                {isLoading ? "Loading..." : "Refresh Data"}
                            </Button>
                        </motion.div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
};

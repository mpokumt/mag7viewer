export const getChangePercentColor = (changePercent: number) => {
    if (changePercent > 0) {
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
    } else if (changePercent < 0) {
        return "bg-red-100 text-red-800 border-red-200";
    }

    return "bg-gray-100 text-gray-800 border-gray-200";
};

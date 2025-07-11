export const getChangeColor = (change: number) => {
    if (change > 0) {
        return "text-emerald-600";
    }

    if (change < 0) {
        return "text-red-500";
    }

    return "text-gray-500";
};

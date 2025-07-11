export const formatNumber = (number: number, usePercentage?: boolean) => {
    const symbol = usePercentage ? "%" : "$";

    if (number >= 1e12) {
        return `${symbol}${(number / 1e12).toFixed(1)}T`;
    }

    if (number >= 1e9) {
        return `${symbol}${(number / 1e9).toFixed(1)}B`;
    }

    if (number >= 1e6) {
        return `${symbol}${(number / 1e6).toFixed(1)}M`;
    }

    return `${symbol}${number?.toFixed(2)}`;
};

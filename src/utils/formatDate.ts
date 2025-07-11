export const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "long",
        year: "numeric"
    });
};

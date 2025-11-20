import { Alert, AlertDescription } from "@/components/ui";
import { AlertCircle } from "lucide-react";

interface ErrorAlertProps {
    summary: boolean;
}

export const ErrorAlert = ({ summary }: ErrorAlertProps) => {
    const errorText = summary
        ? "Failed to fetch summary stock data ☹️. Please try again"
        : "Failed to fetch individual stock info ☹️. Please try again";
    return (
        <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />

            <AlertDescription>{errorText}</AlertDescription>
        </Alert>
    );
};

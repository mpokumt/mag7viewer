import { Alert, AlertDescription } from "@/components/ui";
import { AlertCircle } from "lucide-react";

export const ErrorAlert = () => {
    return (
        <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />

            <AlertDescription>Failed to fetch stock data ☹️. Please try again</AlertDescription>
        </Alert>
    );
};

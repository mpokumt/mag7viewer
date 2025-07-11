import { Calendar as CalendarIcon } from "lucide-react";
import { useState, type ChangeEvent, type KeyboardEvent } from "react";

import {
    Button,
    Calendar,
    Input,
    Label,
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@/components/ui";
import { formatDate } from "@/utils";

interface DateFieldProps {
    id: string;
    label: string;
    value: string;
    handleDateChange: (date: string) => void;
}

export const DateField = ({ id, label, value, handleDateChange }: DateFieldProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const isValidDate = (date: Date) => {
        if (!date) {
            return false;
        }

        return !isNaN(date.getTime());
    };

    const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        const updatedDate = new Date(event.target.value);

        if (isValidDate(updatedDate)) {
            handleDateChange(event.target.value);
        }
    };

    const handleOnKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "ArrowDown") {
            event.preventDefault();

            setIsOpen(true);
        }
    };

    const handleOnSelect = (date?: Date) => {
        handleDateChange(formatDate(date as Date) ?? "");

        setIsOpen(false);
    };

    const handleOnOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="flex-1">
            <Label htmlFor={id} className="text-sm font-medium text-gray-700 mb-2 block">
                {label}
            </Label>

            <div className="relative flex gap-2">
                <Input
                    id={id}
                    value={value}
                    placeholder={label}
                    className="bg-background pr-10"
                    onChange={handleOnChange}
                    onKeyDown={handleOnKeyDown}
                />

                <Popover open={isOpen} onOpenChange={handleOnOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            id="date-picker"
                            variant="ghost"
                            className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
                        >
                            <CalendarIcon className="size-3.5" />
                            <span className="sr-only">Select date</span>
                        </Button>
                    </PopoverTrigger>

                    <PopoverContent
                        className="w-auto overflow-hidden p-0"
                        align="end"
                        alignOffset={-8}
                        sideOffset={10}
                    >
                        <Calendar
                            mode="single"
                            selected={new Date(value)}
                            captionLayout="dropdown"
                            onSelect={handleOnSelect}
                        />
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
};

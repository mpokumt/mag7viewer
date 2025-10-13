import type { ReactNode } from "react";

interface CardContainerProps {
    children: ReactNode;
}

const CardContainer = ({ children }: CardContainerProps) => {
    return (
        <div className="space-y-4 mt-[2rem]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {children}
            </div>
        </div>
    );
};

export default CardContainer;

import { Pagination as HeroPagination, type PaginationProps as HeroPaginationProps } from "@heroui/react";

interface PaginationProps extends Partial<HeroPaginationProps> {
    total: number;
    initialPage?: number;
    onChange?: (page: number) => void;
    className?: string;
}

export const Pagination = ({
    total,
    initialPage = 1,
    onChange,
    className = "",
    ...props
}: PaginationProps) => {
    if (total <= 1) return null;

    return (
        <div className={`flex justify-center w-full py-8 ${className}`}>
            <HeroPagination
                showControls
                total={total}
                initialPage={initialPage}
                onChange={onChange}
                classNames={{
                    wrapper: "gap-2 shadow-none",
                    item: "w-10 h-10 text-small font-bold bg-pfm-card/50 dark:bg-pfm-card/10 border border-pfm-border rounded-xl hover:bg-pfm-primary hover:text-white transition-all shadow-sm",
                    cursor: "bg-pfm-primary text-white font-bold rounded-xl shadow-lg shadow-pfm-primary/30",
                    next: "bg-pfm-card/50 dark:bg-pfm-card/10 border border-pfm-border rounded-xl hover:bg-pfm-primary hover:text-white transition-all shadow-sm",
                    prev: "bg-pfm-card/50 dark:bg-pfm-card/10 border border-pfm-border rounded-xl hover:bg-pfm-primary hover:text-white transition-all shadow-sm",
                }}
                {...props}
            />
        </div>
    );
};

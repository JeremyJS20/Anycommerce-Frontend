import React, { useEffect, useState } from 'react';
import { CheckCircle2, AlertCircle, Info, XCircle, X } from 'lucide-react';
import { motion } from 'framer-motion';

export type ToastType = "success" | "error" | "warning" | "info";

export interface CustomToastProps {
    message: string;
    description?: string;
    type?: ToastType;
    onClose?: () => void;
    timeout?: number;
}

export const CustomToast: React.FC<CustomToastProps> = ({
    message,
    description,
    type = "info",
    onClose,
    timeout = 4000
}) => {
    const [progress, setProgress] = useState(100);

    const icons = {
        success: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
        error: <XCircle className="w-5 h-5 text-rose-500" />,
        warning: <AlertCircle className="w-5 h-5 text-amber-500" />,
        info: <Info className="w-5 h-5 text-pfm-primary" />,
    };

    const variantStyles = {
        success: "shadow-emerald-500/10 border-emerald-500/20",
        error: "shadow-rose-500/10 border-rose-500/20",
        warning: "shadow-amber-500/10 border-amber-500/20",
        info: "shadow-pfm-primary/10 border-pfm-primary/20",
    };

    const progressColors = {
        success: "bg-emerald-500",
        error: "bg-rose-500",
        warning: "bg-amber-500",
        info: "bg-pfm-primary",
    };

    useEffect(() => {
        const startTime = Date.now();
        const intervalId = setInterval(() => {
            const elapsedTime = Date.now() - startTime;
            const remaining = Math.max(0, 100 - (elapsedTime / timeout) * 100);
            setProgress(remaining);
            if (remaining === 0) clearInterval(intervalId);
        }, 10);

        return () => clearInterval(intervalId);
    }, [timeout]);

    return (
        <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className={`
                relative flex items-center w-[340px] p-4 gap-4 
                bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl 
                border ${variantStyles[type]} rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] 
                dark:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)]
                ring-1 ring-black/5 dark:ring-white/5 overflow-hidden
            `}
        >
            {/* Subtle glow */}
            <div className={`absolute -top-10 -right-10 w-24 h-24 opacity-10 blur-3xl rounded-full ${progressColors[type]}`}></div>

            <div className="flex-shrink-0 z-10 flex items-center justify-center w-11 h-11 rounded-full bg-white dark:bg-slate-800 shadow-sm border border-black/5 dark:border-white/5">
                {icons[type]}
            </div>

            <div className="flex-grow z-10 py-0.5 text-left">
                <h4 className="text-[15px] font-bold text-slate-900 dark:text-white leading-tight tracking-tight">
                    {message}
                </h4>
                {description && (
                    <p className="mt-1 text-[13px] text-slate-500 dark:text-slate-400 font-medium leading-normal line-clamp-2">
                        {description}
                    </p>
                )}
            </div>

            {onClose && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onClose();
                    }}
                    className="absolute top-2 right-2 p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all active:scale-90 group z-20"
                >
                    <X className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200" />
                </button>
            )}

            {/* Premium Progress Bar */}
            <div className="absolute bottom-0 left-0 h-0.5 w-full bg-slate-100/50 dark:bg-slate-800/30">
                <motion.div
                    initial={{ width: "100%" }}
                    animate={{ width: `${progress}%` }}
                    transition={{ ease: "linear" }}
                    className={`h-full ${progressColors[type]} opacity-80`}
                />
            </div>
        </motion.div>
    );
};



import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, Info, XCircle } from 'lucide-react';

export interface AlertConfig {
    variant?: "danger" | "success" | "warning" | "info";
    title?: string;
    message: string;
    onClose?: () => void;
    className?: string;
}

interface AlertProps {
    config: AlertConfig;
}

export const Alert = ({ config }: AlertProps) => {
    const { variant = "danger", message, className = "" } = config;

    const icons = {
        danger: <XCircle className="w-5 h-5" />,
        success: <CheckCircle2 className="w-5 h-5" />,
        warning: <AlertCircle className="w-5 h-5" />,
        info: <Info className="w-5 h-5" />,
    };

    const variantStyles = {
        danger: "bg-danger/10 border-danger/20 text-danger",
        success: "bg-success/10 border-success/20 text-success",
        warning: "bg-warning/10 border-warning/20 text-warning",
        info: "bg-primary/10 border-primary/20 text-primary",
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className={`flex items-center gap-3 p-4 rounded-xl border font-medium text-sm transition-all animate-in fade-in slide-in-from-top-1 ${variantStyles[variant]} ${className}`}
        >
            <div className="shrink-0">
                {icons[variant]}
            </div>
            <div className="flex-1">
                {message}
            </div>
            {config.onClose && (
                <button
                    onClick={config.onClose}
                    className="shrink-0 opacity-60 hover:opacity-100 transition-opacity"
                >
                    <XCircle className="w-4 h-4" />
                </button>
            )}
        </motion.div>
    );
};

import React from 'react';
import { motion } from 'framer-motion';

export interface VariantOption {
    key: string;
    value?: string;
}

interface ProductVariantSelectionProps {
    label: string;
    type: 'color' | 'size' | 'default';
    options: VariantOption[];
    selectedOption: string;
    onSelect: (option: string) => void;
}

const ProductVariantSelection: React.FC<ProductVariantSelectionProps> = ({
    label,
    type,
    options,
    selectedOption,
    onSelect
}) => {
    const getColorStyle = (value: string) => {
        if (!value) return 'transparent';
        // If it's a hex code without #, add it
        if (/^[0-9A-F]{3,6}$/i.test(value)) {
            return `#${value}`;
        }
        return value;
    };

    return (
        <div className="flex flex-col gap-3">
            <p className="text-pfm-text dark:text-pfm-text-dark font-bold text-xs uppercase tracking-widest opacity-70">
                {label}
            </p>
            <div className="flex flex-wrap gap-3">
                {options.map((option) => (
                    <button
                        key={option.key}
                        onClick={() => onSelect(option.key)}
                        className={`group relative transition-all duration-300 ${type === 'color'
                            ? 'p-1 rounded-full border-2'
                            : 'px-4 h-10 rounded-xl border-2 font-bold text-sm'
                            } ${selectedOption === option.key
                                ? 'border-pfm-primary'
                                : 'border-pfm-border hover:border-pfm-primary/40'
                            }`}
                    >
                        {type === 'color' ? (
                            <>
                                <div
                                    className="w-6 h-6 rounded-full border border-black/10 shadow-inner"
                                    style={{ backgroundColor: getColorStyle(option.value || option.key) }}
                                />
                                {selectedOption === option.key && (
                                    <motion.div
                                        layoutId={`active-ring-${label}`}
                                        className="absolute -inset-1 border-2 border-pfm-primary rounded-full opacity-30"
                                    />
                                )}
                            </>
                        ) : (
                            <span className={selectedOption === option.key ? 'text-pfm-primary' : 'text-pfm-text-muted'}>
                                {option.value || option.key}
                            </span>
                        )}

                        {type === 'color' && (
                            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-pfm-text-muted opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                {option.key}
                            </span>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ProductVariantSelection;

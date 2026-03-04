import React from 'react';
import { Input as HeroUIInput } from "@heroui/react";
import type { InputProps as HeroUIInputProps } from "@heroui/react";

export interface InputConfig {
    variant?: "flat" | "bordered" | "underlined" | "faded";
    color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
    size?: "sm" | "md" | "lg";
    radius?: "none" | "sm" | "md" | "lg" | "full";
    type?: string;
    label?: string;
    labelPlacement?: "inside" | "outside" | "outside-left";
    placeholder?: string;
    startContent?: React.ReactNode;
    endContent?: React.ReactNode;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    isDisabled?: boolean;
    isInvalid?: boolean;
    errorMessage?: string;
    classNames?: HeroUIInputProps['classNames'];
}

interface InputWrapperProps {
    config: InputConfig;
}

export const Input = ({ config }: InputWrapperProps) => {
    return (
        <HeroUIInput
            variant={config.variant}
            color={config.color}
            size={config.size}
            radius={config.radius}
            type={config.type}
            label={config.label}
            labelPlacement={config.labelPlacement}
            placeholder={config.placeholder}
            startContent={config.startContent}
            endContent={config.endContent}
            value={config.value}
            onChange={config.onChange}
            className={config.className}
            isDisabled={config.isDisabled}
            isInvalid={config.isInvalid}
            errorMessage={config.errorMessage}
            classNames={config.classNames}
        />
    );
};

import { Button as HeroUIButton, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Badge } from '@heroui/react';

export interface ButtonConfig {
    mode?: "button" | "dropdown";
    type?: "button" | "submit" | "reset";
    dropdownItems?: { key: string; label: React.ReactNode }[];
    onDropdownAction?: (key: string) => void;
    variant?: "solid" | "bordered" | "light" | "flat" | "faded" | "shadow" | "ghost";
    color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
    size?: "sm" | "md" | "lg";
    radius?: "none" | "sm" | "md" | "lg" | "full";
    startContent?: React.ReactNode;
    endContent?: React.ReactNode;
    isIconOnly?: boolean;
    isDisabled?: boolean;
    isLoading?: boolean;
    className?: string;
    onPress?: () => void;
    onClick?: () => void;
    title?: string;
    children?: React.ReactNode;
    badge?: {
        content?: React.ReactNode;
        color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
        size?: "sm" | "md" | "lg";
        placement?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
        variant?: "solid" | "flat" | "faded" | "shadow";
        isInvisible?: boolean;
    };
}

interface ButtonProps {
    config: ButtonConfig;
}

export const Button = ({ config }: ButtonProps) => {
    const buttonElement = (
        <HeroUIButton
            variant={config.variant}
            color={config.color}
            size={config.size}
            radius={config.radius}
            startContent={config.startContent}
            endContent={config.endContent}
            isIconOnly={config.isIconOnly}
            isDisabled={config.isDisabled}
            isLoading={config.isLoading}
            className={config.className}
            type={config.type || "button"}
            onPress={config.onPress}
            onClick={config.onClick}
            title={config.title}
        >
            {config.children}
        </HeroUIButton>
    );

    let finalComponent = buttonElement;

    if (config.mode === "dropdown" && config.dropdownItems) {
        finalComponent = (
            <Dropdown
                classNames={{
                    content: "bg-pfm-card border border-pfm-border min-w-[150px] shadow-xl rounded-xl p-1"
                }}
            >
                <DropdownTrigger>
                    {buttonElement}
                </DropdownTrigger>
                <DropdownMenu
                    aria-label="Button Dropdown Menu"
                    onAction={(key) => config.onDropdownAction?.(key.toString())}
                    itemClasses={{
                        base: "data-[hover=true]:bg-pfm-primary/10 data-[hover=true]:text-pfm-primary text-pfm-text rounded-lg py-2 px-3 transition-colors",
                    }}
                >
                    {config.dropdownItems.map((item) => (
                        <DropdownItem key={item.key} className="text-sm font-medium">
                            {item.label}
                        </DropdownItem>
                    ))}
                </DropdownMenu>
            </Dropdown>
        );
    }

    if (config.badge) {
        return (
            <Badge
                content={config.badge.content}
                color={config.badge.color || "danger"}
                size={config.badge.size || "sm"}
                placement={config.badge.placement || "top-right"}
                variant={config.badge.variant || "solid"}
                isInvisible={config.badge.isInvisible}
            >
                {finalComponent}
            </Badge>
        );
    }

    return finalComponent;
};

import { useTheme } from '../Context/ThemeContext';
import { Button } from './Common/Button';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle = () => {
    const { isDark, toggleTheme } = useTheme();

    return (
        <Button
            config={{
                isIconOnly: true,
                variant: "flat",
                color: "primary",
                className: "h-10 w-10 min-w-10 p-0 transition-colors",
                onPress: toggleTheme,
                onClick: toggleTheme,
                title: isDark ? "Switch to light mode" : "Switch to dark mode",
                children: isDark ? <Sun size={20} className="text-pfm-primary" /> : <Moon size={20} className="text-pfm-primary" />
            }}
        />
    );
};

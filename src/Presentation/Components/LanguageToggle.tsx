import { useLanguage } from '../Context/LanguageContext';
import { Button } from './Common/Button';
import { Languages } from 'lucide-react';

export const LanguageToggle = () => {
    const { changeLanguage } = useLanguage();

    return (
        <Button
            config={{
                mode: "dropdown",
                isIconOnly: true,
                variant: "flat",
                color: "primary",
                className: "h-10 w-10 min-w-10 p-0 transition-colors",
                title: "Change language",
                children: <Languages size={20} className="text-pfm-primary" />,
                dropdownItems: [
                    { key: "en", label: "English" },
                    { key: "es", label: "Español" }
                ],
                onDropdownAction: (key) => changeLanguage(key)
            }}
        />
    );
};

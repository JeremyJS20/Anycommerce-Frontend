import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export const Home = () => {
    const { t } = useTranslation();

    return (
        <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col items-center justify-center text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-wider text-pfm-primary uppercase bg-pfm-primary/10 rounded-full">
                    {t("hero.badge")}
                </div>
                <h1 className="text-6xl md:text-8xl font-black text-pfm-text tracking-tight mb-8">
                    {t("hero.title_part1")} <span className="bg-gradient-to-r from-pfm-primary to-pfm-secondary bg-clip-text text-transparent italic">{t("hero.title_part2")}</span>
                </h1>
                <p className="text-pfm-text-muted text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed">
                    {t("hero.description")}
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <button className="pfm-btn-primary px-10 py-4 text-lg">
                        {t("hero.start_shopping")}
                    </button>
                    <button className="pfm-btn-secondary px-10 py-4 text-lg">
                        {t("hero.view_collections")}
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

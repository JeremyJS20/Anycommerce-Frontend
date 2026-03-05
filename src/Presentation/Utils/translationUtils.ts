/**
 * Maps a category name from the backend to a translation key slug.
 * e.g., "Home & Garden" -> "home_garden"
 * e.g., "Electronics" -> "electronics"
 */
export const getCategoryTranslationSlug = (name: string): string => {
    if (!name) return 'all_products';

    // If it's already a key (contains dots), extract the last part before .name
    if (name.includes('.')) {
        const parts = name.split('.');
        // e.g. categories.electronics.name -> electronics
        // e.g. home.categories_data.electronics.name -> electronics (legacy support)
        if (parts.length >= 2) {
            const slugIndex = parts.indexOf('categories');
            const legacySlugIndex = parts.indexOf('categories_data');

            if (slugIndex !== -1 && parts.length > slugIndex + 1) {
                return parts[slugIndex + 1];
            } else if (legacySlugIndex !== -1 && parts.length > legacySlugIndex + 1) {
                return parts[legacySlugIndex + 1];
            }
        }
    }

    return name.toLowerCase()
        .trim()
        .replace(/\s+&\s+/g, '_')   // Replace " & " with "_"
        .replace(/[&\s]+/g, '_')    // Replace any remaining & or spaces with "_"
        .replace(/_+/g, '_');        // Collapse multiple underscores
};

/**
 * Gets the full translation key for a category name.
 */
export const getCategoryTranslationKey = (name: string): string => {
    if (!name) return 'categories.all_products';
    const slug = getCategoryTranslationSlug(name);
    if (!slug || slug === 'all_products') return 'categories.all_products';
    return `categories.${slug}.name`;
};

/**
 * Gets the full translation key for a category description.
 */
export const getCategoryDescriptionKey = (name: string): string => {
    if (!name) return '';
    const slug = getCategoryTranslationSlug(name);
    if (!slug || slug === 'all_products') return '';
    return `categories.${slug}.description`;
};

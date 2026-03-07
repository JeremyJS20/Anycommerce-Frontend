export type Store = {
    id: string;
    stripeStoreId: string;
    name: string;
    slug: string;
    description: string;
    logoUrl: string;
    coverImageUrl: string;
    metrics: {
        rating: number;
        totalReviews: number;
        followerCount: number;
        joinedDate: string;
    };
    verification: {
        isVerified: boolean;
        badgeType: string;
        trustScore: number;
    };
    features: Array<{
        key: string;
        label: string;
        icon: string;
        details: string;
    }>;
    socialLinks: {
        instagram?: string;
        twitter?: string;
        facebook?: string;
    };
    contact: {
        email: string;
        supportHours: string;
        baseCountry: string;
    };
    settings: {
        allowDirectMessage: boolean;
        showFollowerCount: boolean;
        themeColor: string;
    };
};

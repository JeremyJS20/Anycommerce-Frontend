import type { MediaModel } from "./generics";

export type SignUpModel = {
    name: string;
    lastName: string;
    email: {
        value: string;
        verified: boolean;
    };
    password: string;
};

export type UserPreferences = {
    locale: string;
    currency: string;
    country: string;
    theme: string;
};

export type User = {
    id: string;
    stripeId: string;
    name: string;
    lastName: string;
    email: {
        value: string;
        verified: boolean;
    };
    phone: Phone | null;
    role: "customer" | "seller";
    preferences: UserPreferences;
};

export type Phone = {
    countryAlpha2: string;
    prefix: string;
    value: string;
    verified: boolean;
};

export type UserResponse = {
    id: string;
    name: string;
    lastName: string;
    profilePhoto: MediaModel | null;
};

export type Address = {
    id: string | null;
    country: string;
    countryCode: string;
    state: string;
    stateCode: string;
    city: string;
    postalCode: number | string;
    address: string;
    additionalAddress: string | null;
    default: boolean;
};

export type PaymentMethod =
    | {
        id: string;
        default: boolean;
        type: "card";
        methodInfo: PaymentMethodCard;
    }
    | {
        id: string;
        default: boolean;
        type: "service";
        methodInfo: PaymentMethodService;
    };

export type PaymentMethodRequest =
    | {
        userId: string | null;
        default: boolean;
        type: "card";
        methodInfo: PaymentMethodCardRequest;
    }
    | {
        userId: string | null;
        default: boolean;
        type: "service";
        methodInfo: PaymentMethodService;
    };

export type PaymentMethodCardRequest = {
    stripeId: string | null | undefined;
    company: string | null | undefined;
    name: string | null | undefined;
    ending: string | null | undefined;
    expirationDate: string | null | undefined;
};

export type PaymentMethodCard = {
    id: string | null;
    brand: string | null;
    ending: string | null;
    expirationDate: string | null;
    default: boolean | null;
    type: string | null;
};

export type PaymentMethodService = {
    company: string;
    name: string;
    ending: string;
    expirationDate: number;
};

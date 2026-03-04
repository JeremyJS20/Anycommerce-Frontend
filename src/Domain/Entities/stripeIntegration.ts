export type SetupIntentIntegration = {
    setupIntentId: string;
    paymentIntentId: string;
    clientSecret: string;
    userId: string;
    status: string;
    initiationDate: string;
    endDate: string;
};

export type PlacerOrderModel = {
    contactInfo: {
        email: string;
        phone: string;
    };
    shippingAddress: string;
    paymentMethod: string;
};

export type calculateTaxesRequestModel = {
    addressId: string;
};

export type calculateTaxesResponseModel = {
    total: number;
    shipping: number;
    inclusiveTaxes: number;
    exclusiveTaxes: number;
};

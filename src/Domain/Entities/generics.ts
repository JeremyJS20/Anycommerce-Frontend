export type errorResponseType = {
    success: boolean;
    statusCode: number;
    error: {
        errorId: number;
        description: string;
        details: Record<string, unknown> | null;
    };
};

export type DataResponseType<T> = {
    success: boolean;
    statusCode: number;
    data: T;
};

export type DataWithAdditionalResponseType<T, T2> = {
    success: boolean;
    statusCode: number;
    data: T;
    additionalData: T2;
};

export type Pagination = {
    currentPage: number;
    totalPageRecords: number;
    totalRecords: number;
    totalPages: number;
};

export type Message = {
    message: string;
};

export type Token = {
    accessToken: string;
    tokenType: string;
    expiresIn: string;
    refreshToken: string;
};

export type MediaModel = {
    name: string;
    size: number;
    extension: string;
    url: string;
};

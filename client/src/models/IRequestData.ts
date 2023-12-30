export interface IRequestDeviceData {
    page: number;
    limit: number;
    brandId?: number;
    typeId?: number;
    basketId?: number;
}

export interface IBoolRequestData {
    message: boolean;
}
export interface IDevice {
    id: number;
    name: string;
    price: number;
    rating: number;
    typeId: number;
    brandId: number;
    img: string;
}

export interface IDevices {
    count: number;
    rows: IDevice[];
}



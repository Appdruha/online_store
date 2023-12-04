export interface IDevice {
    id: number;
    name: string;
    price: number;
    rating: number;
    typeId: number;
    brandId: number;
    brandName: string;
    typeName: string;
    img: string;
}

export interface IDevices {
    count: number;
    rows: IDevice[];
    types: string[];
    brands: string[];
}



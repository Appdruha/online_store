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
    key?: number;
    info?: IDeviceInfo[];
}

export interface IDeviceInfo {
    title: string;
    description: string;
}

export interface IDevices {
    count: number;
    rows: IDevice[];
}




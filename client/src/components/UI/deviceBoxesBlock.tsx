import DeviceBox from "./deviceBox";
import React from "react";
import {IDevice} from "../../models/IDevice";
import {IBrand, IType} from "../../models/ITypesAndBrands";

const DeviceBoxesBlock = (props: {rows: IDevice[], brands: IBrand[], types: IType[]}) => {
    return  props.rows.map(
        row => <DeviceBox
            key={row.id}
            id={row.id}
            name={row.name}
            price={row.price}
            rating={row.rating}
            brandId={row.brandId}
            typeId={row.typeId}
            img={row.img}
            brandName={props.brands.length !== 0 ? props.brands[row.brandId - 1].name : "no info"}
            typeName={props.types.length !== 0 ? props.types[row.typeId - 1].name : "no info"}
        />
    )
}

export default DeviceBoxesBlock
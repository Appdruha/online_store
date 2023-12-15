import {IBrand, IType} from "../models/ITypesAndBrands";
import {IOption} from "../models/ISelectOptions";

 export const arrayToOptions = (array: IType[] | IBrand[]): IOption[] => {
    return array.map(el => ({value: el.id, label: el.name}))
}
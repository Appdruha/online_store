import React from 'react';
import {Controller, useFormContext} from "react-hook-form";
import Select from "react-select";
import {IOption} from "../../../models/ISelectOptions";
import "./selects.scss";

const ControlledSelect = (props: { name: string, options: IOption[], label: string }) => {

    const {control, formState: {errors}} = useFormContext()

    return (
        <Controller name={props.name}
                    control={control}
                    rules={{required: "Поле не заполнено"}}
                    render={({field}) => {
                        return (<Select placeholder={props.label}
                                        className={`modalSelect ${errors?.[props.name] && "error"}`}
                                        classNamePrefix="modalSelect_parts"
                                        {...field}
                                        options={props.options}/>)
                    }}
        />
    );
};

export default ControlledSelect;
import React from 'react';
import {Controller, useFormContext} from "react-hook-form";
import Select from "react-select";
import {IOption} from "../../models/ISelectOptions";

const ControlledSelect = (props: {name: string, options: IOption[]}) => {

    const {control} = useFormContext()

    return (
        <Controller name={props.name}
                    control={control}
                    rules = {{required: "Поле не заполнено"}}
                    render={({field}) => {
                        return (<Select {...field} options={props.options}/>)
                    }}
        />
    );
};

export default ControlledSelect;
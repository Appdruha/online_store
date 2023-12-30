import React from 'react';
import {Controller, useFormContext} from "react-hook-form";
import Select from "react-select";
import {IOption} from "../../models/ISelectOptions";
import styles from "../modals/modal.module.scss";

const ControlledSelect = (props: { name: string, options: IOption[], error: boolean }) => {

    const {control} = useFormContext()

    return (
        <Controller name={props.name}
                    control={control}
                    rules={{required: "Поле не заполнено"}}
                    render={({field}) => {
                        return (<Select className={`"w-10/12 mt-4" ${props.error && styles.inputError}`} {...field}
                                        options={props.options}/>)
                    }}
        />
    );
};

export default ControlledSelect;
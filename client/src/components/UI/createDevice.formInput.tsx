import React from 'react';
import {useFormContext} from "react-hook-form";
import styles from "../modals/modal.module.scss";

interface InputProps {
    name: string,
    label: string,
    type: string,
    id?: string,
}

const CreateDeviceFileInput = (props: InputProps) => {

    const {register, formState: {errors}} = useFormContext()

    return (
        <input
            className={`${styles.input} ${errors?.[props.name] && styles.inputError}`}
            type={props.type}
            placeholder={props.label} {...register(props.name, {
            required: "Поле не заполнено",
        })}/>
    );
};

export default CreateDeviceFileInput
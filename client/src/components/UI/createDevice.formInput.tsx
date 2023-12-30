import React from 'react';
import {useFormContext} from "react-hook-form";
import styles from "../modals/modal.module.scss";

const CreateDeviceFormInput = (props: { name: string, label: string, type: string, error: boolean }) => {

    const {register, formState} = useFormContext()

    return (
        <>
            <input className={`${styles.input} ${props.error && styles.inputError}`} type={props.type}
                   placeholder={props.label} {...register(props.name, {
                required: "Поле не заполнено",
            })}/>
        </>
    );
};

export default CreateDeviceFormInput
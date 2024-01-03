import React from 'react';
import {useFormContext} from "react-hook-form";
import styles from "../modals/modal.module.scss";

const CreateDeviceTextarea = (props: { name: string, label: string }) => {

    const {register, formState: {errors}} = useFormContext()

    return (
        <>
            <textarea placeholder={props.label}
                      className={`${styles.input} ${styles.textarea} ${errors?.[props.name] && styles.inputError}`}
                      {...register(props.name, {
                required: "Поле не заполнено",
                maxLength: {value: 250, message: "Слишком длинный текст"}
            })}/>
        </>
    );
};

export default CreateDeviceTextarea
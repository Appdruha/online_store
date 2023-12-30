import React from 'react';
import {useFormContext} from "react-hook-form";
import styles from "../modals/modal.module.scss";

const CreateDeviceTextarea = (props: { name: string, label: string, error: boolean }) => {

    const {register} = useFormContext()

    return (
        <>
            <textarea placeholder={props.name}
                      className={`${styles.input} ${styles.textarea} ${props.error && styles.inputError}`}
                      {...register(props.name, {
                required: "Поле не заполнено",
                maxLength: {value: 250, message: "Слишком длинный текст"}
            })}/>
        </>
    );
};

export default CreateDeviceTextarea
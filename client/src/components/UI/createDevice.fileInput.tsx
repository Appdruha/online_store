import React, {useState} from 'react';
import {useFormContext} from "react-hook-form";
import styles from "../modals/modal.module.scss";

interface InputProps {
    id: string,
    name: string,
}

const CreateDeviceFormInput = (props: InputProps) => {

    const {register, formState: {isDirty}, getFieldState} = useFormContext()
    const [isFilled, setIsFilled] = useState<boolean>(false)

    return (
        <>
            <label className={styles.fileLabel} htmlFor={props.id}>
                {isFilled ? "Файл выбран" : "Выберите файл"}</label>
            <input
                id={props.id}
                className="hidden"
                type="file"
                {...register(props.name, {
                required: "Файл не выбран",
                onChange: () => setIsFilled(true)
            })}/>
        </>
    );
};

export default CreateDeviceFormInput
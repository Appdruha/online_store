import React from 'react';
import {useFormContext} from "react-hook-form";

const CreateDeviceTextarea = (props: { name: string, label: string }) => {

    const {register} = useFormContext()

    return (
        <div>
            <label htmlFor={props.name}>{props.label}</label>
            <textarea {...register(props.name, {
                required: "Поле не заполнено",
                maxLength: {value: 250, message: "Слишком длинный текст"}
            })}/>
        </div>
    );
};

export default CreateDeviceTextarea
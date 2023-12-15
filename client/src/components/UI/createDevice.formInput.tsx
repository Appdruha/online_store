import React from 'react';
import {useFormContext} from "react-hook-form";

const CreateDeviceFormInput = (props: {name: string, label: string, type: string}) => {

    const {register} = useFormContext()

    return (
        <div>
            <label htmlFor={props.name}>{props.label}</label>
            <input type={props.type} placeholder=" " {...register(props.name, {
                required: "Поле не заполнено",
            })}/>
        </div>
    );
};

export default CreateDeviceFormInput
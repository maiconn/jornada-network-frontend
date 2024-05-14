import {useField} from "react-final-form";
import * as React from "react";

function FotoField() {
    const {input, meta} = useField<File>('foto');

    return (
        <>
            <label htmlFor="avatar">Escolha uma foto de perfil:</label>
            <input type="file"
                   id="foto"
                   name={input.name}
                   onFocus={input.onFocus}
                   onBlur={input.onBlur}
                   onChange={e => input.onChange(e.target.value)}
                   accept="image/png, image/jpeg"/>
        </>
    );
}

export default FotoField;
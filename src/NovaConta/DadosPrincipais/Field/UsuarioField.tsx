import {useField} from "react-final-form";
import {TextField} from "@mui/material";
import {textRange} from "../../../Generic/functions.ts";

function NomeField() {
    const {input, meta} = useField<string>('usuario');

    return (
        <TextField
            value={input.value}
            name={input.name}
            onChange={e => input.onChange(textRange(e.target.value, 255))}
            onFocus={input.onFocus}
            onBlur={input.onBlur}
            label="Usuário"
            error={meta.touched && meta.invalid}
            helperText={meta.touched && meta.invalid ? meta.error : undefined}
            fullWidth
            required
        />
    );
}

export default NomeField;
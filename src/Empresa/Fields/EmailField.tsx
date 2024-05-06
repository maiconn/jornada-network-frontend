import {useField} from "react-final-form";
import {TextField} from "@mui/material";
import {textRange} from "../../Generic/functions";
import {useContext} from "react";
import {EmpresaContext} from "../context.tsx";

function EmailField() {
    const {input, meta} = useField<string>('email');
    const {empresa} = useContext(EmpresaContext);
    return (
        <TextField
            value={input.value}
            name={input.name}
            onChange={e => input.onChange(textRange(e.target.value, 500))}
            onFocus={input.onFocus}
            onBlur={input.onBlur}
            label="Email"
            error={meta.touched && meta.invalid}
            helperText={meta.touched && meta.invalid ? meta.error : undefined}
            disabled={empresa!.idEmpresa !== 0}
            fullWidth
            required
        />
    );
}

export default EmailField;
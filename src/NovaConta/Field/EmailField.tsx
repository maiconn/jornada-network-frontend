import {useField} from "react-final-form";
import {TextField} from "@mui/material";
import {textRange} from "../../Generic/functions";

function EmailField() {
    const {input, meta} = useField<string>('email');

    return (
        <TextField
            value={input.value}
            name={input.name}
            onChange={e => input.onChange(textRange(e.target.value, 255))}
            onFocus={input.onFocus}
            onBlur={input.onBlur}
            label="E-mail"
            error={meta.touched && meta.invalid}
            helperText={meta.touched && meta.invalid ? meta.error : undefined}
            fullWidth
            required
        />
    );
}

export default EmailField;
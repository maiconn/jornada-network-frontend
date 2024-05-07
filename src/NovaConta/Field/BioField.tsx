import {useField} from "react-final-form";
import {TextField} from "@mui/material";
import {textRange} from "../../Generic/functions";

function BioField() {
    const {input, meta} = useField<string>('bio');

    return (
        <TextField
            value={input.value}
            name={input.name}
            onChange={e => input.onChange(textRange(e.target.value, 160))}
            onFocus={input.onFocus}
            onBlur={input.onBlur}
            label="Bio"
            error={meta.touched && meta.invalid}
            helperText={meta.touched && meta.invalid ? meta.error : undefined}
            fullWidth
            required
            multiline
        />
    );
}

export default BioField;
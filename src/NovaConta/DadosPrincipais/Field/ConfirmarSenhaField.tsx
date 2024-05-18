import {useField} from "react-final-form";
import {FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField} from "@mui/material";
import {textRange} from "../../../Generic/functions.ts";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import * as React from "react";

function ConfirmarSenhaField() {
    const {input, meta} = useField<string>('confirmarSenha');
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    return (
        <FormControl fullWidth>
            <InputLabel htmlFor="confirmarSenha">Confirmar Senha *</InputLabel>
            <OutlinedInput
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
                required
                fullWidth
                value={input.value}
                name={input.name}
                label="Confirmar Senha"
                id="confirmarSenha"
                onChange={e => input.onChange(textRange(e.target.value, 255))}
                onFocus={input.onFocus}
                onBlur={input.onBlur}
                error={meta.touched && meta.invalid}
                helperText={meta.touched && meta.invalid ? meta.error : undefined}
            />
        </FormControl>
    );
}

export default ConfirmarSenhaField;
import {useField, useForm} from "react-final-form";
import {MenuItem, TextField} from "@mui/material";
import React, {useContext} from "react";
import {Estado, LocalidadeContext} from "../context.tsx";

function EstadosField() {
    const {input, meta} = useField<Estado>('estado');
    const form = useForm();
    const {estados, findAllCidadesPorUF} = useContext(LocalidadeContext);

    return (
        <TextField
            label="Estado"
            SelectProps={{
                value: input.value,
                onChange: e => {
                    findAllCidadesPorUF(e.target.value);
                    form.change("cidade", null);
                    input.onChange(e);
                },
                onFocus: input.onFocus,
                onBlur: input.onBlur,
            }}
            value={input.value}
            name={input.name}
            onFocus={input.onFocus}
            onBlur={input.onBlur}
            error={meta.touched && meta.invalid}
            fullWidth
            select
        >
            <MenuItem key={0} value={0} selected={input.value === null || input.value.toString() === ''}>
                <em>SELECIONE</em>
            </MenuItem>
            {estados?.map((estado) => (
                <MenuItem key={estado.id}
                          value={estado}
                          selected={input.value === estado.id}>
                    {estado.nome}
                </MenuItem>
            ))}
        </TextField>
    );
}

export default EstadosField;
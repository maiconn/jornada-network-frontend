import {useField} from "react-final-form";
import {MenuItem, TextField} from "@mui/material";
import React, {useContext} from "react";
import debounce from 'lodash.debounce';
import {Cidade, LocalidadeContext} from "../context.tsx";

function CidadesField() {
    const {input, meta} = useField<Cidade>('uf');
    const {cidades} = useContext(LocalidadeContext);

    const doFilter = debounce(query => {
        // if (!query) return setFiltro({
        //     page: 0,
        //     size: 20,
        // });
        //
        // setFiltro({
        //     page: 0,
        //     size: 20,
        //     nome: query,
        // })
    }, 500);

    return (
        <TextField
            label="Cidade"
            SelectProps={{
                value: input.value,
                onChange: e => {
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
            {cidades?.map((cidade) => (
                <MenuItem key={cidade.id}
                          value={cidade.id}
                          selected={input.value === cidade.id}>
                    {cidade.nome}
                </MenuItem>
            ))}
        </TextField>
    );
}

export default CidadesField;
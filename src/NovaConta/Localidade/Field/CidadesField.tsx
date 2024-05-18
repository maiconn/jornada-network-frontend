import {useField} from "react-final-form";
import {Autocomplete, TextField} from "@mui/material";
import React, {useContext} from "react";
import {Cidade, LocalidadeContext} from "../context.tsx";

function CidadesField() {
    const {input, meta} = useField<Cidade>('cidade');
    const {cidades} = useContext(LocalidadeContext);

    return (
        <>
            <Autocomplete
                disablePortal
                onChange={(event, value) => {
                    input.onChange(value)
                }}
                options={cidades == null || !cidades ? [] : cidades}
                getOptionLabel={(cidade) => cidade ? `${cidade.nome}` : ''}
                noOptionsText={"Nenhuma cidade encontrada"}
                value={input.value}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Cidade"
                        placeholder="Cidade"
                    />
                )}
            />

        </>

    );
}

export default CidadesField;
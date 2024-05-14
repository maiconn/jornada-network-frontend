import {useField} from "react-final-form";
import {Autocomplete, Chip, TextField} from "@mui/material";
import {Habilidade, NovoUsuarioContext} from "../../context.tsx";
import {useContext} from "react";
import debounce from 'lodash.debounce';

function HabilidadesField() {
    const {input, meta} = useField<Habilidade[]>('habilidades');
    const {habilidades} = useContext(NovoUsuarioContext);

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
        <Autocomplete
            freeSolo
            multiple
            id="habilidadesField"
            onChange={(event, value) => {
                let newValue = value.map((valor, index) => {
                    if (typeof valor == 'string') {
                        return {descricao: valor.toUpperCase()};
                    }
                    return valor;
                });
                newValue = [...new Map(newValue.map(item =>
                    [item['descricao'], item])).values()];


                input.onChange(newValue);
            }}
            // onInputChange={(event, value) => {
            //     doFilter(value)
            // }}
            value={input.value ? input.value : []}
            defaultValue={input.value}
            options={habilidades == null || !habilidades ? [] : habilidades}
            getOptionLabel={(habilidade) => habilidade.descricao ?? ''}
            noOptionsText={"Nenhuma habilidade encontrada."}
            renderTags={(value, props) =>
                value.map((option, index) => (
                    <Chip label={option.descricao} {...props({ index })} />
                ))
            }
            renderInput={(params) => <TextField
                label="Habilidades"
                variant="outlined"
                placeholder="Habilidades" {...params}
            />}
        />
    );
}

export default HabilidadesField;
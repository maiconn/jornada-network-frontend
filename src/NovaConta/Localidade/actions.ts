import api from "../../api.ts";
import {Loading, Notify} from "notiflix";
import {tratarErro} from "../../Generic/functions.ts";
import {AppDispatch} from "../../store";
import * as yup from "yup";
import {NavigateFunction} from "react-router-dom";
import {Cidade, Estado} from "./context.tsx";


export interface LocalizacaoForm {
    cidade: Cidade;
    estado: Estado;
}


const schema = yup.object().shape({

});

export const validation = async (values: Partial<LocalizacaoForm>) => {
    return schema
        .validate(values, {abortEarly: false})
        .then(() => undefined)
        .catch((error: yup.ValidationError) => {
            if (Array.isArray(error.inner)) {
                return error.inner.reduce((acc, cur) => {
                    return {
                        ...acc,
                        [cur.path || '']: cur.message,
                    };
                }, {});
            }
        });
};

export const criarLocalizacao = async (dispatch: AppDispatch, values: Partial<LocalizacaoForm>, navigate: NavigateFunction) => {
    Loading.circle();

    try {
        const usuarioSalvo = await api.post('/usuario/localizacao', {
            idEstado: values.estado.id,
            idCidade: values.cidade.id,
        }, {
            headers: {
                'content-type': 'application/json'
            }
        });
        dispatch({type: "SET_USER", user: usuarioSalvo.data});
        Notify.success("Perfil salvo com sucesso!");
        navigate("/home")
    } catch (error) {
        tratarErro(error);
    } finally {
        Loading.remove();
    }
};
import api from "../../api.ts";
import {Loading, Notify} from "notiflix";
import {tratarErro} from "../../Generic/functions.ts";
import {AppDispatch} from "../../store";
import * as yup from "yup";
import {NavigateFunction} from "react-router-dom";
import {Habilidade} from "../context.tsx";


export interface UsuarioDadosPessoaisForm {
    bio: string;
    habilidades: Array<Habilidade>;
}



const schema = yup.object().shape({

});

export const validation = async (values: Partial<UsuarioDadosPessoaisForm>) => {
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

export const criarDadosPessoais = async (dispatch: AppDispatch, values: Partial<UsuarioDadosPessoaisForm>, navigate: NavigateFunction) => {
    Loading.circle();

    try {
        const usuarioSalvo = await api.post('/usuario/dados-pessoais', {
            bio: values.bio,
            habilidades: values.habilidades
        }, {
            headers: {
                'content-type': 'application/json'
            }
        });

        dispatch({type: "SET_USER", user: usuarioSalvo});
        Notify.success("Perfil salvo com sucesso!");
        navigate("/nova-conta-contatos")
    } catch (error) {
        tratarErro(error);
    } finally {
        Loading.remove();
    }
};

export const buscarHabilidades = async () => {
    Loading.circle();

    try {
        const habilidades = await api.get('/habilidade', {
            headers: {
                'content-type': 'application/json'
            }
        });

        return habilidades;
    } catch (error) {
        tratarErro(error);
    } finally {
        Loading.remove();
    }
};
import api from "../api";
import {Loading, Notify} from "notiflix";
import {tratarErro} from "../Generic/functions";
import {AppDispatch} from "../store";
import * as yup from "yup";

export interface UsuarioForm {
    nome: string;
    email: number;
    senha: string;
    senhaConfirm: string;
    files: File[];
}

const schema = yup.object().shape({
    nome: yup.string()
        .required('Campo Obrigatório!'),

    email: yup.string()
        .required('Campo Obrigatório!'),

    senha: yup.string()
        .required('Campo Obrigatório!'),

    senhaConfirm: yup.string()
        .oneOf([yup.ref("senha"), null], "Senhas não conferem!")
});

export const validation = async (values: Partial<UsuarioForm>) => {
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


export const atualizarUsuario = async (dispatch: AppDispatch, values: Partial<UsuarioForm>) => {
    Loading.circle();

    try {
        await api.post('/usuario/profile/update', {
            nome: values.nome,
            email: values.email,
            senha: values.senha,
            confirmarSenha: values.senhaConfirm
        }, {
            headers: {
                'content-type': 'application/json'
            }
        });

        const jsonObj = values.files?.[0] as File;
        const enviar = {
            profilePhoto: jsonObj
        }
        if (jsonObj && jsonObj?.name !== '') {
            await api.post('/usuario/profile/upload-photo', enviar, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }).then(resFoto => {
                dispatch({type: "SET_USER", user: resFoto.data});
            }).catch(error => tratarErro(error))
                .finally(() => {
                    Loading.remove();
                });
        }
        Notify.success("Perfil salvo com sucesso!");
    } catch (error) {
        tratarErro(error);
    } finally {
        Loading.remove();
    }
};
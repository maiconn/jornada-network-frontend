import api from "../../api.ts";
import {Loading, Notify} from "notiflix";
import {tratarErro} from "../../Generic/functions.ts";
import {AppDispatch} from "../../store";
import * as yup from "yup";
import {storageToken} from "../../Login/actions.ts";
import {NavigateFunction} from "react-router-dom";


export interface UsuarioForm {
    nome: string;
    email: string;
    senha: string;
    confirmarSenha: string;
    usuario: string;
    files: File[];
    qtdSeguindo: number;
    qtdSeguidores: number;
    qtdPostagens: number;
}

export interface UsuarioFormResponse extends UsuarioForm{
    idUsuario: number;
    token: string;
}

const schema = yup.object().shape({
    nome: yup.string()
        .required('Campo Obrigatório!'),

    email: yup.string()
        .required('Campo Obrigatório!'),

    senha: yup.string()
        .required('Campo Obrigatório!'),

    usuario: yup.string()
        .required('Campo Obrigatório!'),

    confirmarSenha: yup.string()
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

export const criarUsuario = async (dispatch: AppDispatch, values: Partial<UsuarioForm>, navigate: NavigateFunction) => {
    Loading.circle();

    try {
        const retornoCreate = await api.post('/usuario/create', {
            nome: values.nome,
            email: values.email,
            senha: values.senha,
            confirmarSenha: values.confirmarSenha,
            usuario: values.usuario,
        }, {
            headers: {
                'content-type': 'application/json'
            }
        });

        if (retornoCreate && retornoCreate.data !== '') {
            const usuarioCriado = retornoCreate.data as UsuarioFormResponse;
            storageToken(usuarioCriado.token);

            if (values.files) {
                const jsonObj = values.files?.[0] as File;
                const enviar = {
                    profilePhoto: jsonObj
                }
                await api.post('/usuario/upload-foto', enviar, {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                }).then(resFoto => {
                    dispatch({type: "SET_USER", user: resFoto.data});
                }).catch(error => tratarErro(error))
                    .finally(() => {
                            Loading.remove();
                        }
                    );
            } else {
                dispatch({type: "SET_USER", user: usuarioCriado});
            }
            navigate("/nova-conta-dados-pessoais")
            Notify.success("Perfil salvo com sucesso!");
        }


    } catch (error) {
        tratarErro(error);
    } finally {
        Loading.remove();
    }
};
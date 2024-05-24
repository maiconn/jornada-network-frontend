import api from "../api";
import {Loading, Notify} from "notiflix";
import {tratarErro} from "../Generic/functions";
import {AppDispatch} from "../store";
import * as yup from "yup";
import {ContatoUsuario, Habilidade} from "../NovaConta/context.tsx";
import {Cidade, Estado} from "../NovaConta/Localidade/context.tsx";
import {UsuarioFormResponse} from "../NovaConta/DadosPrincipais/actions.ts";

export interface UsuarioForm {
    nome: string;
    email: number;
    senha: string;
    confirmarSenha: string;
    usuario: string;
    bio: string;
    habilidades: Array<Habilidade>;
    contatos: Array<ContatoUsuario>;
    idCidade: number;
    idEstado: number;
    cidade: Cidade;
    estado: Estado;
    files: File[];
}

const schema = yup.object().shape({
    nome: yup.string()
        .required('Campo Obrigatório!'),

    email: yup.string()
        .required('Campo Obrigatório!'),

    senha: yup.string()
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


export const atualizarUsuario = async (dispatch: AppDispatch, values: Partial<UsuarioForm>) => {
    Loading.circle();

    try {
        const retornoAtualizacao = await api.put('/usuario', {
            nome: values.nome,
            email: values.email,
            senha: values.senha,
            confirmarSenha: values.confirmarSenha,
            usuario: values.usuario,
            bio: values.bio,
            habilidades: values.habilidades,
            contatos: values.contatos,
            idEstado: values.estado.id,
            idCidade: values.cidade.id,
        }, {
            headers: {
                'content-type': 'application/json'
            }
        });

        if (retornoAtualizacao && retornoAtualizacao.data !== '') {
            const usuarioAtualizado = retornoAtualizacao.data as UsuarioFormResponse;
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
            }
            dispatch({type: "SET_USER", user: usuarioAtualizado});
            Notify.success("Perfil salvo com sucesso!");
        }
    } catch (error) {
        tratarErro(error);
    } finally {
        Loading.remove();
    }
};
import * as React from "react";
import api from "../api";
import {Loading, Notify} from "notiflix";
import {NavigateFunction} from "react-router-dom";
import {AppDispatch} from "../store";
import {tratarErro} from "../Generic/functions";
import { jwtDecode } from "jwt-decode";

const TOKEN_KEY = "token";

interface JWT {
    PERMISSOES: string[];
}

export const storageToken = (token: string | null) => {
    if (token == null) {
        delete api.defaults.headers.common["Authorization"];
        localStorage.removeItem(TOKEN_KEY);
    } else {
        api.defaults.headers.common['Authorization'] = token;
        localStorage.setItem(TOKEN_KEY, token);
    }
}

export const completarDadosAluno = async (dispatch: AppDispatch) => {
    if (ehAluno()) {
        let aluno = await api.get("/aluno")
        if (aluno.data.idAluno == null) {
            return false;
        } else {
            dispatch({type: "SET_ALUNO", aluno: aluno.data});
        }
    }
    return true;
}

export const ehAluno = () => {
    let token = getDecodedToken();
    if (token !== null) {
        if (token.PERMISSOES) {
            return token.PERMISSOES.indexOf('ALUNO') >= 0;
        }
    }
    return false;
}


export const getDecodedToken = (): JWT | null => {
    let token = getToken();
    if (token !== null) {
        return jwtDecode(token) as JWT;
    }
    return null;
}

export const resetSession = (dispatch: AppDispatch) => {
    dispatch({type: "RESET"});
    storageToken(null);
}

export const completeData = async (dispatch: AppDispatch) => {
    Loading.circle();
    try {
        completarDadosAluno(dispatch);
        const retorno = await api.get("/usuario/profile", {
            headers: {
                'content-type': 'application/json'
            }
        });
        dispatch({type: "SET_USER", user: retorno.data});
    } catch (error: any) {
        if (error) {
            if (error.response.status === 400) {
                resetSession(dispatch);
            }
        }
        tratarErro(error);
    } finally {
        Loading.remove();
    }
}


export const getToken = (): string | null => {
    return localStorage.getItem(TOKEN_KEY) ?? null;
}

export const login = async (dispatch: AppDispatch, event: React.FormEvent<HTMLFormElement>, navigate: NavigateFunction) => {
    Loading.circle();
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const json = JSON.stringify(Object.fromEntries(formData));

    try {
        const resposta = await api.post('/autenticacao', json, {
            headers: {
                'content-type': 'application/json'
            }
        });
        const data = resposta.data;
        if (data) {
            Notify.success("Login realizado com sucesso!");
            storageToken(data.token)
            dispatch({type: "SET_USER", user: data});
        }
        navigate('/home');
    } catch (error: any) {
        if (error.response && error.response.status === 403) {
            Notify.failure("Usuário ou senha inválidos!");
        } else {
            tratarErro(error);
        }
    } finally {
        Loading.remove();
    }
};
import {createContext, ReactNode, useEffect, useReducer} from "react";
import {INITIAL_STATE_NOVO_USUARIO, novoUsuarioReducer} from "../store/novoUsuarioReducer.ts";
import {Loading} from "notiflix";
import api from "../api.ts";
import {tratarErro} from "../Generic/functions.ts";

export interface Habilidade {
    idHabilidade: number;
    descricao: string;
}

export interface Contato {
    idContato: number;
    descricao: string;
}

export interface ContatoUsuario {
    idContato: number;
    descricaoContato: string;
    descricao: string;
    visivel: boolean;
}

export interface Page {
    elements: Array<Habilidade>;
    totalElements: number;
    totalPages: number;
    page: number;
    size: number;
}

export interface NovoUsuarioContextValue {
    habilidades: Array<Habilidade> | null ;
    contatos: Array<Contato> | null ;
    novosContatos: Array<ContatoUsuario> ;
}

export const NovoUsuarioContext = createContext<NovoUsuarioContextValue>({
    habilidades: null,
    contatos: null,
    novosContatos: [],
});

interface ProviderProps {
    children: ReactNode;
}

export function NovoUsuarioProvider({children}: ProviderProps) {
    const [{habilidades, contatos, novosContatos}, action] = useReducer(novoUsuarioReducer, INITIAL_STATE_NOVO_USUARIO);

    useEffect(() => {
        findAllHabilidades();
        findAllContatos();
    }, []);

    const findAllHabilidades = async () => {
        Loading.circle();

        try {
            const res = await api.get('/habilidade', {
                headers: {
                    'content-type': 'application/json'
                }
            });

            action({type: 'SET_HABILIDADES_LIST', habilidades: res.data});
        } catch (error) {
            tratarErro(error);
        } finally {
            Loading.remove();
        }
    }

    const findAllContatos = async () => {
        Loading.circle();

        try {
            const res = await api.get('/contato', {
                headers: {
                    'content-type': 'application/json'
                }
            });

            const constatosRetorno = res.data;

            const _novosContatos = [];

            constatosRetorno.forEach(contato => {
                _novosContatos.push({
                    "idContato": contato.idContato,
                    'descricaoContato': contato.descricao,
                    'descricao': '',
                    'visivel': true,
                });
            });

            action({type: 'SET_NOVOS_CONTATOS_LIST', novosContatos: _novosContatos});
            action({type: 'SET_CONTATOS_LIST', contatos: constatosRetorno});
        } catch (error) {
            tratarErro(error);
        } finally {
            Loading.remove();
        }
    }

    return (
        <NovoUsuarioContext.Provider
            value={{
                habilidades,
                contatos,
                novosContatos,
            }}>
            {children}
        </NovoUsuarioContext.Provider>
    );
}

interface ConsumerProps {
    children: (value: NovoUsuarioContextValue) => ReactNode;
}


export function NovoUsuarioConsumer({children}: ConsumerProps) {
    return <NovoUsuarioContext.Consumer>{children}</NovoUsuarioContext.Consumer>;
}

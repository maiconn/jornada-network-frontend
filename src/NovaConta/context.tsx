import {createContext, ReactNode, useEffect, useReducer} from "react";
import {INITIAL_STATE_NOVO_USUARIO, novoUsuarioReducer} from "../store/novoUsuarioReducer.ts";
import {Loading} from "notiflix";
import api from "../api.ts";
import {tratarErro} from "../Generic/functions.ts";

export interface Habilidade {
    idHabilidade: number;
    descricao: string;
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
}

export const NovoUsuarioContext = createContext<NovoUsuarioContextValue>({
    habilidades: null,
});

interface ProviderProps {
    children: ReactNode;
}

export function NovoUsuarioProvider({children}: ProviderProps) {
    const [{habilidades}, action] = useReducer(novoUsuarioReducer, INITIAL_STATE_NOVO_USUARIO);

    useEffect(() => {
        findAllHabilidades();
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

    return (
        <NovoUsuarioContext.Provider
            value={{
                habilidades,
            }}>
            {children}
        </NovoUsuarioContext.Provider>
    );
}
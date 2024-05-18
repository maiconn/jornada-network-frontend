import {createContext, ReactNode, useEffect, useReducer} from "react";
import {Loading} from "notiflix";
import {INITIAL_STATE_LOCALIDADE, localidadeReducer} from "../../store/localidadeReducer.ts";
import api from "../../api.ts";
import {tratarErro} from "../../Generic/functions.ts";


export interface Estado {
    id: number;
    nome: string;
    sigla: string;
}

export interface Cidade {
    id: number;
    nome: string;
}

export interface LocalidadeContextValue {
    cidades: Array<Cidade> | null ;
    estados: Array<Estado> | null ;
    findAllCidadesPorUF: (uf: Estado) => void;
}

export const LocalidadeContext = createContext<LocalidadeContextValue>({
    cidades: [],
    estados: [],
    findAllCidadesPorUF: async (uf: Estado) => {
    },
});

interface ProviderProps {
    children: ReactNode;
}

export function LocalidadeProvider({children}: ProviderProps) {
    const [{estados, cidades}, action] = useReducer(localidadeReducer, INITIAL_STATE_LOCALIDADE);

    useEffect(() => {
        findAllEstados();
    }, []);

    const findAllEstados = async () => {
        Loading.circle();

        try {
            const res = await api.get('/ibge/uf', {
                headers: {
                    'content-type': 'application/json'
                }
            });

            action({type: 'SET_ESTADOS', estados: res.data});
        } catch (error) {
            tratarErro(error);
        } finally {
            Loading.remove();
        }
    }

    const findAllCidadesPorUF = async (uf: Estado) => {
        Loading.circle();

        try {
            const res = await api.get(`/ibge/${uf.id}/cidades`, {
                headers: {
                    'content-type': 'application/json'
                }
            });

            action({type: 'SET_CIDADES', cidades: res.data});
        } catch (error) {
            tratarErro(error);
        } finally {
            Loading.remove();
        }
    }

    return (
        <LocalidadeContext.Provider
            value={{
                cidades,
                estados,
                findAllCidadesPorUF,
            }}>
            {children}
        </LocalidadeContext.Provider>
    );
}

interface ConsumerProps {
    children: (value: LocalidadeContextValue) => ReactNode;
}


export function LocalidadeConsumer({children}: ConsumerProps) {
    return <LocalidadeContext.Consumer>{children}</LocalidadeContext.Consumer>;
}

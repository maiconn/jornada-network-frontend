import {createContext, ReactNode, useEffect, useReducer} from "react";
import {EmpresaForm} from "./actions.ts";
import {EmpresaActions, empresaReducer, INITIAL_STATE_EMPRESAS} from "../store/empresaReducer.ts";
import {Loading, Notify} from "notiflix";
import api from "../api.ts";
import {tratarErro} from "../Generic/functions.ts";

export interface EmpresaContextValue {
    findAll: () => void;
    salvar: (values: Partial<EmpresaForm>) => void;
    remover: (idEmpresa: number) => void;
    setEmpresa: (value: any) => void;
    empresas: Array<EmpresaForm>;
    empresa: EmpresaForm | null;
}

export const EmpresaContext = createContext<EmpresaContextValue>({
    findAll: async () => {
    },
    salvar: async () => {
    },
    remover: async () => {
    },
    setEmpresa: () => {
    },
    empresas: [],
    empresa: null,
});
interface ProviderProps {
    children: ReactNode;
}

export function EmpresaProvider({children}: ProviderProps) {
    const [{empresa, empresas}, action] = useReducer(empresaReducer, INITIAL_STATE_EMPRESAS);


    const setEmpresa = (value: any) => {
        if(value.idEmpresa === 0){
            value = {
                ...value,
            }
        } else {
            value = {
                ...value,
                email: value.usuario.email
            }
        }
        action({type: EmpresaActions.SET_EMPRESA, empresa: value});
    }


    useEffect(() => {
        findAll();
    }, []);


    const findAll = async () => {
        Loading.circle();

        try {
            const res = await api.get('/empresa', {
                headers: {
                    'content-type': 'application/json'
                }
            });

            action({type: EmpresaActions.SET_EMPRESAS, empresas: res.data});
        } catch (error) {
            tratarErro(error);
        } finally {
            Loading.remove();
        }
    }

    const salvar = async (values: Partial<EmpresaForm>) => {
        Loading.circle();

        try {
            const ehEdicao = values.idEmpresa !== 0;
            const method = ehEdicao ? api.put : api.post;
            const res = await method(`/empresa${ehEdicao ? `/${values.idEmpresa}` : ''}`, {
                ...values,
            }, {
                headers: {
                    'content-type': 'application/json'
                }
            });

            if (res.data.idEmpresa) {
                Notify.success("Salvo com sucesso!");
                setEmpresa({ idEmpresa: 0 });
                await findAll();
            }
        } catch (error) {
            tratarErro(error);
        } finally {
            Loading.remove();
        }
    };

    const remover = async (idmEpresa: number) => {
        Loading.circle();

        try {
            const res = await api.delete(`/empresa/${idmEpresa}`, {
                headers: {
                    'content-type': 'application/json'
                }
            });

            if (res.status === 200) {
                Notify.success("Removido com sucesso!");
                await findAll();
            }
        } catch (error) {
            tratarErro(error);
        } finally {
            Loading.remove();
        }
    };

    return (
        <EmpresaContext.Provider
            value={{
                findAll,
                salvar,
                remover,
                setEmpresa,
                empresas,
                empresa,
            }}>
            {children}
        </EmpresaContext.Provider>
    );
}

interface ConsumerProps {
    children: (value: EmpresaContextValue) => ReactNode;
}

export function EmpresaConsumer({children}: ConsumerProps) {
    return <EmpresaContext.Consumer>{children}</EmpresaContext.Consumer>;
}

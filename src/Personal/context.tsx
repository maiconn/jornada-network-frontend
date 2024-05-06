import {createContext, ReactNode, useEffect, useReducer} from "react";
import {PersonalForm} from "./actions.ts";
import {Loading, Notify} from "notiflix";
import api from "../api.ts";
import {tratarErro} from "../Generic/functions.ts";
import {INITIAL_STATE_PERSONALS, PersonalActions, personalReducer} from "../store/personalReducer.ts";

export interface PersonalContextValue {
    findAll: () => void;
    salvar: (values: Partial<PersonalForm>) => void;
    remover: (idEmpresa: number) => void;
    setPersonal: (value: any) => void;
    personals: Array<PersonalForm>;
    personal: PersonalForm | null;
}

export const PersonalContext = createContext<PersonalContextValue>({
    findAll: async () => {
    },
    salvar: async () => {
    },
    remover: async () => {
    },
    setPersonal: () => {
    },
    personals: [],
    personal: null,
});
interface ProviderProps {
    children: ReactNode;
}

export function PersonalProvider({children}: ProviderProps) {
    const [{personal, personals}, action] = useReducer(personalReducer, INITIAL_STATE_PERSONALS);


    const setPersonal = (value: any) => {
        if(value.idPersonal === 0){
            value = {
                ...value,
            }
        } else {
            value = {
                ...value,
                email: value.usuario.email
            }
        }
        action({type: PersonalActions.SET_PERSONAL, personal: value});
    }


    useEffect(() => {
        findAll();
    }, []);


    const findAll = async () => {
        Loading.circle();

        try {
            const res = await api.get('/personal', {
                headers: {
                    'content-type': 'application/json'
                }
            });

            action({type: PersonalActions.SET_PERSONALS, personals: res.data});
        } catch (error) {
            tratarErro(error);
        } finally {
            Loading.remove();
        }
    }

    const salvar = async (values: Partial<PersonalForm>) => {
        Loading.circle();

        try {
            const ehEdicao = values.idPersonal !== 0;
            const method = ehEdicao ? api.put : api.post;
            const res = await method(`/personal${ehEdicao ? `/${values.idPersonal}` : ''}`, {
                ...values,
            }, {
                headers: {
                    'content-type': 'application/json'
                }
            });

            if (res.data.idPersonal) {
                Notify.success("Salvo com sucesso!");
                setPersonal({ idPersonal: 0 });
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
            const res = await api.delete(`/personal/${idmEpresa}`, {
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
        <PersonalContext.Provider
            value={{
                findAll,
                salvar,
                remover,
                setPersonal,
                personal,
                personals,
            }}>
            {children}
        </PersonalContext.Provider>
    );
}

interface ConsumerProps {
    children: (value: PersonalContextValue) => ReactNode;
}

export function PersonalConsumer({children}: ConsumerProps) {
    return <PersonalContext.Consumer>{children}</PersonalContext.Consumer>;
}

import {createContext, ReactNode, useReducer} from "react";
import {Loading} from "notiflix";
import api from "../api.ts";
import {tratarErro} from "../Generic/functions.ts";
import {INITIAL_STATE_PERFIL, perfilReducer} from "../store/perfilReducer.ts";
import {UsuarioForm} from "../NovaConta/DadosPrincipais/actions.ts";

export interface PerfilContextValue {
    usuario: UsuarioForm | null;
    findUsuario: (_usuario: string) => void;
}

export const PerfilContext = createContext<PerfilContextValue>({
    usuario: null,
    findUsuario: async (_usuario: string) => {
    },
});

interface ProviderProps {
    children: ReactNode;
}

export function PerfilProvider({children}: ProviderProps) {
    const [{usuario}, action] = useReducer(perfilReducer, INITIAL_STATE_PERFIL);

    const findUsuario = async (_usuario: string) => {
        Loading.circle();

        try {
            const res = await api.get(`/usuario/perfil/${_usuario}`, {
                headers: {
                    'content-type': 'application/json'
                }
            });

            action({type: 'SET_USUARIO_PERFIL', usuario: res.data});
        } catch (error) {
            tratarErro(error);
        } finally {
            Loading.remove();
        }
    }

    return (
        <PerfilContext.Provider
            value={{
                usuario,
                findUsuario
            }}>
            {children}
        </PerfilContext.Provider>
    );
}

interface ConsumerProps {
    children: (value: PerfilContextValue) => ReactNode;
}


export function PerfilConsumer({children}: ConsumerProps) {
    return <PerfilContext.Consumer>{children}</PerfilContext.Consumer>;
}

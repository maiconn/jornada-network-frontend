import {AnyAction} from '@reduxjs/toolkit'

export const INITIAL_STATE_PERFIL = {
    usuario: null,
}

export const perfilReducer = (state = INITIAL_STATE_PERFIL, action: AnyAction) => {
    switch (action.type) {
        case 'SET_USUARIO_PERFIL':
            return {
                ...state,
                usuario: action.usuario
            }
        default:
            return state;
    }
}
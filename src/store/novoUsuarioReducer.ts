import {AnyAction} from '@reduxjs/toolkit'

export const INITIAL_STATE_NOVO_USUARIO = {
    habilidades: null
}

export const novoUsuarioReducer = (state = INITIAL_STATE_NOVO_USUARIO, action: AnyAction) => {
    switch (action.type) {
        case 'SET_HABILIDADES_LIST':
            return {
                ...state,
                habilidades: action.habilidades
            }
        default:
            return state;
    }
}
import {AnyAction} from '@reduxjs/toolkit'

export const INITIAL_STATE_LOCALIDADE = {
    cidades: null,
    estados: null,
}

export const localidadeReducer = (state = INITIAL_STATE_LOCALIDADE, action: AnyAction) => {
    switch (action.type) {
        case 'SET_CIDADES':
            return {
                ...state,
                cidades: action.cidades
            }
        case 'SET_ESTADOS':
            return {
                ...state,
                estados: action.estados
            }
        default:
            return state;
    }
}
import {AnyAction} from '@reduxjs/toolkit'

export const INITIAL_STATE_NOVO_USUARIO = {
    habilidades: null,
    contatos: null,
    novosContatos: null,
}

export const novoUsuarioReducer = (state = INITIAL_STATE_NOVO_USUARIO, action: AnyAction) => {
    switch (action.type) {
        case 'SET_HABILIDADES_LIST':
            return {
                ...state,
                habilidades: action.habilidades
            }
        case 'SET_CONTATOS_LIST':
            return {
                ...state,
                contatos: action.contatos
            }
        case 'SET_NOVOS_CONTATOS_LIST':
            return {
                ...state,
                novosContatos: action.novosContatos
            }
        default:
            return state;
    }
}
import {AnyAction} from '@reduxjs/toolkit'

export const INITIAL_STATE = {
    user: {
        nome: '',
        fotoPerfil: '',
        email: '',
        permissoes: [],
        habilidades: [],
    },
    aluno: {
        stack: '',
        semestre: 0,
        git: '',
        curso: '',
        sistemaOperacional: '',
        processador: '',
        memoriaRam: 0,
        cidadeEstado: '',
        idEdicao: 0,
        idAluno: 0
    }
}

export const userReducer = (state = INITIAL_STATE, action: AnyAction) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.user
            }
        case 'RESET':
            state = INITIAL_STATE;
            return {
                ...state
            }
        default:
            return state;
    }
}
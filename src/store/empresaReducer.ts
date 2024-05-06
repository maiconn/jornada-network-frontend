import {AnyAction} from "@reduxjs/toolkit";

export const INITIAL_STATE_EMPRESAS = {
    empresas: [],
    empresa: {
        idEmpresa: 0,
        nome: '',
        cnpj: ''
    }
}

export class EmpresaActions {
    static readonly SET_EMPRESAS = 'SET_EMPRESAS';
    static readonly SET_EMPRESA = 'SET_EMPRESA';
}

export const empresaReducer = (state = INITIAL_STATE_EMPRESAS, action: AnyAction) => {
    switch (action.type) {
        case EmpresaActions.SET_EMPRESAS:
            return {
                ...state,
                empresas: action.empresas
            }
        case EmpresaActions.SET_EMPRESA:
            return {
                ...state,
                empresa: action.empresa
            }
        default:
            return state;
    }
}
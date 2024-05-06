import {AnyAction} from "@reduxjs/toolkit";

export const INITIAL_STATE_PERSONALS = {
    personals: [],
    personal: {
        idPersonal: 0,
        nome: '',
        cpfCnpj: ''
    }
}

export class PersonalActions {
    static readonly SET_PERSONALS = 'SET_PERSONALS';
    static readonly SET_PERSONAL = 'SET_PERSONAL';
}

export const personalReducer = (state = INITIAL_STATE_PERSONALS, action: AnyAction) => {
    switch (action.type) {
        case PersonalActions.SET_PERSONALS:
            return {
                ...state,
                personals: action.personals
            }
        case PersonalActions.SET_PERSONAL:
            return {
                ...state,
                personal: action.personal
            }
        default:
            return state;
    }
}
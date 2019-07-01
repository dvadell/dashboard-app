import { SET_LANGUAGE } from './constants';

export const LanguageReducer = (state={ lang: 'en' }, action={}) => {
    switch(action.type) {
        case SET_LANGUAGE:
            return Object.assign({}, state, {lang: action.payload})
        default:
            return state;
    }
}
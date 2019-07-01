import { SET_LANGUAGE } from './constants';

export const setLanguageAction = (lang) => ({
    type: SET_LANGUAGE,
    payload: lang
})
import {
  SET_LANGUAGE,
  GET_PAGE_PENDING,
  GET_PAGE_SUCCESS,
  GET_PAGE_FAILURE,
  SAVE_PAGE_PENDING,
  SAVE_PAGE_SUCCESS,
  SAVE_PAGE_FAILURE,
  SET_VIEW
} from "./constants";

/**
 * @function SettingsReducer
 * @param {object} state - The old state
 * @param {object} action  - The new language to set to
 */
export const SettingsReducer = (state = { lang: "en" }, action = {}) => {
  switch (action.type) {
    case SET_LANGUAGE:
      return Object.assign({}, state, { lang: action.payload });
    default:
      return state;
  }
};

const initialState = {
  title: ""
};

export const PagesReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_PAGE_PENDING:
      return Object.assign({}, state, { isPending: true });
    case GET_PAGE_SUCCESS:
      return Object.assign({}, state, { ...action.payload, isPending: false });
    case GET_PAGE_FAILURE:
      return Object.assign({}, state, {
        error: action.payload,
        isPending: false
      });
    case SAVE_PAGE_PENDING:
      return Object.assign({}, state, { isPending: true });
    case SAVE_PAGE_SUCCESS:
      return Object.assign({}, state, { ...action.payload, isPending: false });
    case SAVE_PAGE_FAILURE:
      return Object.assign({}, state, {
        error: action.payload,
        isPending: false
      });
    default:
      return state;
  }
};

export const ViewReducer = (state = { viewHandler: "ag" }, action = {}) => {
  switch (action.type) {
    case SET_VIEW:
      return Object.assign({}, state, { viewHandler: action.payload });
    default:
      return state;
  }
};

import {
  SET_LANGUAGE,
  GET_PAGE_PENDING,
  GET_PAGE_SUCCESS,
  GET_PAGE_FAILURE,
  SAVE_PAGE_PENDING,
  SAVE_PAGE_SUCCESS,
  // SAVE_PAGE_FAILURE,
  SET_VIEW
} from "./constants";
import { loadPage, savePage, loadRandomPage } from "./fetchlib";

/**
 * @function setViewAction
 * @returns {object} - Action object with type SET_VIEW
 */
export const setViewAction = viewHandler => ({
  type: SET_VIEW,
  payload: viewHandler
});

/**
 * @function setLanguageAction
 * @returns {object} - Action object with type SET_LANGUAGE
 */
export const setLanguageAction = lang => ({
  type: SET_LANGUAGE,
  payload: lang
});

/**
 * @function getPageAction
 * @param {string} title - The title of the page to get
 * @returns {function(dispatch)}  - Action (function) that gets the page and dipatches it's status
 */
export const getPageAction = title => dispatch => {
  dispatch({
    type: GET_PAGE_PENDING
  });
  loadPage(title)
    .then(json => {
      if (json.error) {
        dispatch({ type: GET_PAGE_FAILURE, payload: json });
      } else {
        window.history.pushState({}, json.title, json.title);
        dispatch({ type: GET_PAGE_SUCCESS, payload: json });
      }
    })
    .catch(error => dispatch({ type: GET_PAGE_FAILURE, payload: error }));
};

/**
 * @function getPageAction
 * @param {string} title - The title of the page to get
 * @returns {function(dispatch)}  - Action (function) that gets the page and dipatches it's status
 */
export const getRandomPageAction = () => dispatch => {
  dispatch({
    type: GET_PAGE_PENDING
  });
  loadRandomPage()
    .then(json => {
      if (json.error) {
        dispatch({ type: GET_PAGE_FAILURE, payload: json });
      } else {
        window.history.pushState({}, json.title, json.title);
        dispatch({ type: GET_PAGE_SUCCESS, payload: json });
      }
    })
    .catch(error => dispatch({ type: GET_PAGE_FAILURE, payload: error }));
};

export const savePageAction = page => dispatch => {
  dispatch({
    type: SAVE_PAGE_PENDING
  });
  dispatch({ type: SAVE_PAGE_SUCCESS, payload: page });
};

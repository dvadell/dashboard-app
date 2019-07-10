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
const API_URL = "http://localhost:9000/api/v1/";

export const setViewAction = viewHandler => ({
  type: SET_VIEW,
  payload: viewHandler
});

export const setLanguageAction = lang => ({
  type: SET_LANGUAGE,
  payload: lang
});

export const getPageAction = title => dispatch => {
  dispatch({
    type: GET_PAGE_PENDING
  });
  fetch(API_URL + "quieros/" + title)
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      throw new Error(res.status + " " + res.statusText);
    })
    .then(json => {
      if (json.error) {
        dispatch({ type: GET_PAGE_FAILURE, payload: json });
      } else {
        dispatch({ type: GET_PAGE_SUCCESS, payload: json });
      }
    })
    .catch(error => dispatch({ type: GET_PAGE_FAILURE, payload: error }));
  window.history.pushState({}, title, title);
};

export const savePageAction = page => dispatch => {
  dispatch({
    type: SAVE_PAGE_PENDING
  });
  dispatch({ type: SAVE_PAGE_SUCCESS, payload: page });
  // fetch(API_URL + "quieros/" + title)
  // .then(res => {
  //     if (res.ok) {
  //         return res.json()
  //     }
  //     throw new Error(res.status + ' ' + res.statusText)
  // })
  // .then(json => {
  //     if (json.error) {
  //         dispatch({ type: SAVE_PAGE_FAILURE,  payload: json })
  //     } else {
  //         dispatch({ type: SAVE_PAGE_SUCCESS, payload: json })
  //     }
  // })
  // .catch(error => dispatch({ type: SAVE_PAGE_SUCCESS, payload: error }));
};

/* eslint-disable no-unused-vars */
export const loginSuccess = data => async dispatch => {
  dispatch({type: 'LOGIN_SUCCESS', payload: data});
};
export const loginFailure = data => async dispatch => {
  dispatch({type: 'LOGIN_FAILURE', payload: data});
};
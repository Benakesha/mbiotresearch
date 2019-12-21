import axios from "../../axiosInterceptor";
// import axios from "axios";

import * as actionTypes from "./actionTypes";

export const loginRequest = () => {
  return {
    type: actionTypes.LOGIN_REQUEST
  };
};
export const loginSuccess = (token, username, role) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    token: token,
    username: username,
    role: role
  };
};
export const loginFailure = error => {
  return {
    type: actionTypes.LOGIN_FAILURE,
    error: error
  };
};

export const logout = () => {
  localStorage.clear();
  return {
    type: actionTypes.LOGOUT
  };
};
export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};
export const setAuthRedirectPath = path => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  };
};

export const loginAction = userdata => {
  return dispatch => {
    dispatch(loginRequest());
    console.log("userdata----", userdata);
    axios
      .post("/login", userdata)
      .then(response => {
        console.log("response-----", response);
        if (response.data.success) {
          const expirationDate = new Date(
            new Date().getTime() + response.data.expiresIn * 1000
          );
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("expirationDate", expirationDate);
          localStorage.setItem("username", response.data.username);
          localStorage.setItem("role", response.data.role);
          dispatch(
            loginSuccess(
              response.data.token,
              response.data.username,
              response.data.role
            )
          );
          dispatch(checkAuthTimeout(response.data.expiresIn));
        } else {
          dispatch(loginFailure(response.data.message));
        }
      })
      .catch(error => {
        dispatch(loginFailure(error));
      });
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const username = localStorage.getItem("username");
        const role = localStorage.getItem("role");
        dispatch(loginSuccess(token, username, role));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};

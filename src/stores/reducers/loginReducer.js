import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../updateObject";
const initialState = {
  token: null,
  username: null,
  error: null,
  loading: false,
  role: null,
  authRedirectPath: "/"
};

const loginRequest = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};
const loginSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false,
    token: action.token,
    role: action.role,
    username: action.username
  });
};

const loginFailure = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const logout = (state, action) => {
  return updateObject(state, {
    token: null,
    username: null,
    role: null,
    authRedirectPath: "/"
  });
};

const setAuthRedirectPath = (state, action) => {
  return updateObject(state, { authRedirectPath: action.path });
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_REQUEST:
      return loginRequest(state, action);
    case actionTypes.LOGIN_SUCCESS:
      return loginSuccess(state, action);
    case actionTypes.LOGIN_FAILURE:
      return loginFailure(state, action);
    case actionTypes.LOGOUT:
      return logout(state, action);
    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return setAuthRedirectPath(state, action);
    default:
      return state;
  }
};
export default loginReducer;

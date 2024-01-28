import actionTypes from "./actionTypes";
import {
  getAllCodeService,
  handleGetAllUsers,
  handleGetAllUserJWT,
} from "../../services/userService";
export const addUserSuccess = () => ({
  type: actionTypes.ADD_USER_SUCCESS,
});

export const userLoginSuccess = (data) => ({
  type: actionTypes.USER_LOGIN_SUCCESS,
  userInfo: data,
});

export const userLoginFail = () => ({
  type: actionTypes.ADMIN_LOGIN_FAIL,
});

export const processLogout = () => ({
  type: actionTypes.PROCESS_LOGOUT,
});

export const fetchUserStart = (accessToken) => {
  return async (dispatch, getState) => {
    try {
      let res = await handleGetAllUserJWT(accessToken);
      if (res && res.errCode === 0) {
        dispatch(fetchUserSuccess(res.users, accessToken));
      } else if (res && res.errCode !== 0) {
        dispatch(fetchUserFailed(res.Message));
      }
    } catch (e) {
      dispatch(fetchUserFailed());
      console.log("Fetch Genderr Failed", e);
    }
  };
};

export const fetchUserSuccess = (users, accessToken) => ({
  type: actionTypes.FETCH_USER_SUCCESS,
  users: users,
  accessToken: accessToken,
});

export const fetchUserFailed = () => ({
  type: actionTypes.FETCH_USER_FAILED,
});

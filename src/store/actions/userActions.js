import actionTypes from "./actionTypes";
import { handleGetAllUsers, handleGetMe } from "../../services/userService";
export const addUserSuccess = () => ({
  type: actionTypes.ADD_USER_SUCCESS,
});

export const userLoginStart = (data) => {
  return async (dispatch, getState) => {
    try {
      let userInfo = await handleGetMe(data.access_token);
      if (userInfo) {
        dispatch(userLoginSuccess(data.access_token, data.user_id, userInfo));
      } else if (userInfo && userInfo.code !== 0) {
        dispatch(fetchUserFailed(userInfo.Message));
      }
    } catch (e) {
      dispatch(fetchUserFailed());
      console.log("Fetch Genderr Failed", e);
    }
  };
};

export const userLoginSuccess = (access_token, id, userInfo) => ({
  type: actionTypes.USER_LOGIN_SUCCESS,
  access_token: access_token,
  id: id,
  userInfo: userInfo,
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
      let res = await handleGetAllUsers(accessToken);
      if (res && res.code ===200) {
        dispatch(fetchUserSuccess(res.users, accessToken));
        console.log("Check res User",res);
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

export const updateToken = () => ({
  type: actionTypes.UPDATE_TOKEN,
});

export const updateTokenByButton = (access_token) => ({
  type: actionTypes.UPDATE_TOKEN_BY_BUTTON,
  access_token: access_token,
});

export const UpdateIsLogin = () => ({
  type: actionTypes.UPDATE_IS_LOGIN,
});

export const handleActive = (data) => ({
  type: actionTypes.HANDLE_ACTIVE,
  data: data,
});

export const fetchUserInfo = (userInfo) => ({
  type: actionTypes.FETCH_USER_INFO,
  userInfo: userInfo,
});

export const updateLoadingPage = () => ({
  type: actionTypes.UPDATE_LOADING_PAGE,
});

export const getViewByPost = (view) => ({
  type: actionTypes.GET_VIEW_BY_POST,
  view: view,
});


export const processLockScreen = () => ({
  type:actionTypes.UPDATE_LOCKSCREEN
})
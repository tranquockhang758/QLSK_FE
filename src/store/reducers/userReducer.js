import actionTypes from "../actions/actionTypes";

const initialState = {
  isLoggedIn: false,
  userInfo: null,
  accessToken: null,
  users: [],
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_LOGIN_SUCCESS:
      // console.log();
      return {
        ...state,
        isLoggedIn: true,
        userInfo: action.userInfo.userInfo,
        accessToken: action.userInfo.accessToken,
      };
    case actionTypes.USER_LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        userInfo: null,
      };
    case actionTypes.PROCESS_LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        userInfo: null,
      };

    //=====================================User
    case actionTypes.FETCH_USER_START:
      return {
        ...state,
      };
    case actionTypes.FETCH_USER_SUCCESS:
      let copyState_user = { ...state };
      copyState_user.users = action.users;
      copyState_user.accessToken = action.accessToken;
      return {
        ...copyState_user,
      };
    case actionTypes.FETCH_USER_FAILED:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default appReducer;

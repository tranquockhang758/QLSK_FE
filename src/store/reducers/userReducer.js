import actionTypes from "../actions/actionTypes";

const initialState = {
  isLoggedIn: false,
  userInfo: {},
  access_token: "",
  users: [],
  user_id: null,
  isLoadingPage: false,
  view: 0,
  isLockScreen:false
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_LOGIN_SUCCESS:
      let copyState_user = { ...state };
      copyState_user.access_token = action.access_token;
      copyState_user.user_id = action.id;
      copyState_user.userInfo = action.userInfo;
      copyState_user.isLoggedIn = true;
      copyState_user.isLoadingPage = true;
      copyState_user.isLockScreen = false;
  
      return {
        ...copyState_user,
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
        user_id: 0,
      };

    //=====================================User
    case actionTypes.FETCH_USER_START:
      return {
        ...state,
      };
    case actionTypes.FETCH_USER_SUCCESS:
      return {
        ...state,
      };
    case actionTypes.FETCH_USER_FAILED:
      return {
        ...state,
      };

    case actionTypes.UPDATE_TOKEN:
      return {
        ...state,
        isLoggedIn: false,
        userInfo: null,
      };

    case actionTypes.UPDATE_TOKEN_BY_BUTTON:
      return {
        ...state,
        access_token: action.access_token,
        userInfo: null,
      };
    case actionTypes.UPDATE_IS_LOGIN:
      return {
        ...state,
        isLoggedIn: false,
      };

    case actionTypes.FETCH_USER_INFO:
      let copyState = { ...state };
      copyState.userInfo = action.userInfo;
      return {
        ...copyState,
      };

    case actionTypes.UPDATE_LOADING_PAGE:
      let copyState_page = { ...state };
      copyState_page.isLoadingPage = false;
      return {
        ...copyState_page,
      };
    case actionTypes.GET_VIEW_BY_POST:
      let copyState_view = { ...state };
      copyState_view.view = action.view;
      return {
        ...copyState_view,
      };
    case actionTypes.UPDATE_LOCKSCREEN:
      return {
        ...state,
        isLockScreen: true,
      };
      default:
      return state;
  }
};

export default appReducer;

const actionTypes = Object.freeze({
  //app
  APP_START_UP_COMPLETE: "APP_START_UP_COMPLETE",
  SET_CONTENT_OF_CONFIRM_MODAL: "SET_CONTENT_OF_CONFIRM_MODAL",

  //admin
  ADMIN_LOGIN_SUCCESS: "ADMIN_LOGIN_SUCCESS",
  ADMIN_LOGIN_FAIL: "ADMIN_LOGIN_FAIL",
  // PROCESS_LOGOUT: 'PROCESS_LOGOUT',

  //user
  ADD_USER_SUCCESS: "ADD_USER_SUCCESS",
  USER_LOGIN_SUCCESS: "USER_LOGIN_SUCCESS",
  USER_LOGIN_FAIL: "USER_LOGIN_FAIL",
  PROCESS_LOGOUT: "PROCESS_LOGOUT",

  CHANGE_LANGUAGE: "CHANGE_LANGUAGE",

  ///Admin Action
  FETCH_GENDER_START: "FETCH_GENDER_START",
  FETCH_GENDER_SUCCESS: "FETCH_GENDER_SUCCESS",
  FETCH_GENDER_FAILED: "FETCH_GENDER_FAILED",

  FETCH_USER_START: "FETCH_USER_START",
  FETCH_USER_SUCCESS: "FETCH_USER_SUCCESS",
  FETCH_USER_FAILED: "FETCH_USER_FAILED",

  FETCH_POSITION_START: "FETCH_POSITION_START",
  FETCH_POSITION_SUCCESS: "FETCH_POSITION_SUCCESS",
  FETCH_POSITION_FAILED: "FETCH_POSITION_FAILED",

  FETCH_DEPARTMENT_START: "FETCH_DEPARTMENT_START",
  FETCH_DEPARTMENT_SUCCESS: "FETCH_DEPARTMENT_SUCCESS",
  FETCH_DEPARTMENT_FAILED: "FETCH_DEPARTMENT_FAILED",

  FETCH_MOTHERCOMPANY_START: "FETCH_MOTHERCOMPANY_START",
  FETCH_MOTHERCOMPANY_SUCCESS: "FETCH_MOTHERCOMPANY_SUCCESS",
  FETCH_MOTHERCOMPANY_FAILED: "FETCH_MOTHERCOMPANY_FAILED",

  FETCH_CERTIFICATE_START: "FETCH_CERTIFICATE_START",
  FETCH_CERTIFICATE_SUCCESS: "FETCH_CERTIFICATE_SUCCESS",
  FETCH_CERTIFICATE_FAILED: "FETCH_CERTIFICATE_FAILED",

  FETCH_ROLE_START: "FETCH_ROLE_START",
  FETCH_ROLE_SUCCESS: "FETCH_ROLE_SUCCESS",
  FETCH_ROLE_FAILED: "FETCH_ROLE_FAILED",
});

export default actionTypes;

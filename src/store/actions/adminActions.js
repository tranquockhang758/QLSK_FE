import actionTypes from "./actionTypes";
import {
  getAllCodeService,
  handleGetAllUsers,
  handleGetAllUserJWT,
} from "../../services/userService";
export const adminLoginSuccess = (adminInfo) => ({
  type: actionTypes.ADMIN_LOGIN_SUCCESS,
  adminInfo: adminInfo,
});

//========================================Fetch Gender FROM API
export const fetchGenderStart = () => {
  // type: actionTypes.FETCH_GENDER_START,
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("gender");
      if (res && res.errCode === 0) {
        dispatch(fetchGenderSuccess(res.allCode));
      } else {
        dispatch(fetchGenderFailed(res.Message));
      }
    } catch (e) {
      dispatch(fetchGenderFailed());
      console.log("Fetch Genderr Failed", e);
    }
  };
};

export const fetchGenderSuccess = (data) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: data,
});

export const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILED,
});
//========================================Fetch Position FROM API

export const fetchPositionStart = () => {
  // type: actionTypes.FETCH_GENDER_START,
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("position");
      if (res && res.errCode === 0) {
        dispatch(fetchPositionSuccess(res.allCode));
      } else {
        dispatch(fetchPositionFailed(res.Message));
      }
    } catch (e) {
      dispatch(fetchPositionFailed());
      console.log("Fetch Position Failed", e);
    }
  };
};

export const fetchPositionSuccess = (data) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: data,
});

export const fetchPositionFailed = () => ({
  type: actionTypes.FETCH_POSITION_FAILED,
});

//========================================Fetch DEPARTMENT FROM API

export const fetchDepartmentStart = () => {
  // type: actionTypes.FETCH_GENDER_START,
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("department");
      if (res && res.errCode === 0) {
        dispatch(fetchDepartmentSuccess(res.allCode));
      } else {
        dispatch(fetchDepartmentFailed(res.Message));
      }
    } catch (e) {
      dispatch(fetchDepartmentFailed());
      console.log("Fetch Department Failed", e);
    }
  };
};

export const fetchDepartmentSuccess = (data) => ({
  type: actionTypes.FETCH_DEPARTMENT_SUCCESS,
  data: data,
});

export const fetchDepartmentFailed = () => ({
  type: actionTypes.FETCH_DEPARTMENT_FAILED,
});

//========================================Fetch MOTHER COMPANY FROM API

export const fetchMotherCompanyStart = () => {
  // type: actionTypes.FETCH_GENDER_START,
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("motherCompany");
      if (res && res.errCode === 0) {
        dispatch(fetchMotherCompanySuccess(res.allCode));
      } else {
        dispatch(fetchMotherCompanyFailed(res.Message));
      }
    } catch (e) {
      dispatch(fetchMotherCompanyFailed());
      console.log("Fetch Mother Company Failed", e);
    }
  };
};

export const fetchMotherCompanySuccess = (data) => ({
  type: actionTypes.FETCH_MOTHERCOMPANY_SUCCESS,
  data: data,
});

export const fetchMotherCompanyFailed = () => ({
  type: actionTypes.FETCH_MOTHERCOMPANY_FAILED,
});

//========================================Fetch Certificate FROM API

export const fetchCertificateStart = () => {
  // type: actionTypes.FETCH_GENDER_START,
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("certificate");
      if (res && res.errCode === 0) {
        dispatch(fetchCertificateSuccess(res.allCode));
      } else {
        dispatch(fetchCertificateFailed(res.Message));
      }
    } catch (e) {
      dispatch(fetchCertificateFailed());
      console.log("Fetch Certificate Failed", e);
    }
  };
};

export const fetchCertificateSuccess = (data) => ({
  type: actionTypes.FETCH_CERTIFICATE_SUCCESS,
  data: data,
});

export const fetchCertificateFailed = () => ({
  type: actionTypes.FETCH_CERTIFICATE_FAILED,
});

//========================================Fetch Roe FROM API

export const fetchRoleStart = () => {
  // type: actionTypes.FETCH_GENDER_START,
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("role");
      if (res && res.errCode === 0) {
        dispatch(fetchRoleSuccess(res.allCode));
      } else {
        dispatch(fetchRoleFailed(res.Message));
      }
    } catch (e) {
      dispatch(fetchRoleFailed());
      console.log("Fetch Role Failed", e);
    }
  };
};

export const fetchRoleSuccess = (data) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: data,
});

export const fetchRoleFailed = () => ({
  type: actionTypes.FETCH_ROLE_FAILED,
});

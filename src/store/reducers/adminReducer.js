import actionTypes from "../actions/actionTypes";

const initialState = {
  isLoggedIn: false,
  adminInfo: null,
  gender: {},
  fetchGenderSuccess: false,
  users: [],
  position: [],
  department: [],
  certificate: [],
  motherCompany: [],
  role: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    //=========================================GENDER
    case actionTypes.FETCH_GENDER_START:
      return {
        ...state,
      };

    case actionTypes.FETCH_GENDER_SUCCESS:
      let copyState = { ...state };
      copyState.gender = action.data;
      return {
        ...copyState,
        fetchGenderSuccess: true,
      };
    case actionTypes.FETCH_GENDER_FAILED:
      return {
        ...state,
      };

    //=========================================POSITION
    case actionTypes.FETCH_POSITION_START:
      return {
        ...state,
      };

    case actionTypes.FETCH_POSITION_SUCCESS:
      let copyState_position = { ...state };
      copyState_position.position = action.data;
      return {
        ...copyState_position,
      };
    case actionTypes.FETCH_POSITION_FAILED:
      return {
        ...state,
      };
    //=========================================DEPARTMENT
    case actionTypes.FETCH_DEPARTMENT_START:
      return {
        ...state,
      };

    case actionTypes.FETCH_DEPARTMENT_SUCCESS:
      let copyState_department = { ...state };
      copyState_department.department = action.data;
      return {
        ...copyState_department,
      };
    case actionTypes.FETCH_DEPARTMENT_FAILED:
      return {
        ...state,
      };

    //=========================================DEPARTMENT
    case actionTypes.FETCH_MOTHERCOMPANY_START:
      return {
        ...state,
      };

    case actionTypes.FETCH_MOTHERCOMPANY_SUCCESS:
      let copyState_mother = { ...state };
      copyState_mother.motherCompany = action.data;
      return {
        ...copyState_mother,
      };
    case actionTypes.FETCH_MOTHERCOMPANY_FAILED:
      return {
        ...state,
      };

    //=========================================Certificate
    case actionTypes.FETCH_CERTIFICATE_START:
      return {
        ...state,
      };

    case actionTypes.FETCH_CERTIFICATE_SUCCESS:
      let copyState_certificate = { ...state };
      copyState_certificate.certificate = action.data;
      return {
        ...copyState_certificate,
      };
    case actionTypes.FETCH_CERTIFICATE_FAILED:
      return {
        ...state,
      };

    //=========================================Certificate
    case actionTypes.FETCH_ROLE_START:
      return {
        ...state,
      };

    case actionTypes.FETCH_ROLE_SUCCESS:
      let copyState_role = { ...state };
      copyState_role.role = action.data;
      return {
        ...copyState_role,
      };
    case actionTypes.FETCH_ROLE_FAILED:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default adminReducer;

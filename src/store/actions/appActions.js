import actionTypes from "./actionTypes";

export const ChangeLanguage = (language) => ({
  type: actionTypes.CHANGE_LANGUAGE,
  language: language,
});
export const setContentOfConfirmModal = (contentOfConfirmModal) => ({
  type: actionTypes.SET_CONTENT_OF_CONFIRM_MODAL,
  contentOfConfirmModal: contentOfConfirmModal,
});

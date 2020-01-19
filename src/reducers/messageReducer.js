import actionType from "../config/actionType";

const initialMessageState = {
  toastMessages: [],
  error_flg: false
};

const reducer = (state = initialMessageState, action) => {
  switch (action.type) {
    case actionType.ADD_TOAST_MESSAGE:
      let toastMessages = state.toastMessages.concat(action.payload);
      return { ...state, toastMessages, error_flg: false };
    case actionType.REMOVE_TOAST_MESSAGE:
      state.toastMessages.splice(action.payload, 1);
      return { ...state };
    case actionType.HANDLE_INVALID_PARAMETER:
      state.toastMessages = state.toastMessages.concat(
        "パラメーターが不正です。"
      );
      return { ...state, error_flg: true };
    case actionType.HANDLE_NOT_FOUND:
      state.toastMessages = state.toastMessages.concat(
        "対象のデータが見つかりませんでした。"
      );
      return { ...state, error_flg: true };
    case actionType.HANDLE_SERVER_ERROR:
      state.toastMessages = state.toastMessages.concat(
        "サーバーエラーが発生しました。"
      );
      return { ...state, error_flg: true };
    default:
      return state;
  }
};

export default reducer;

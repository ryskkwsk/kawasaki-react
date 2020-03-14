import actionType from '../config/actionType';

/**
 * トーストメッセージを追加する
 * @param message メッセージ
 */
export const addToastMessage = (message) => {
  return {
    type: actionType.ADD_TOAST_MESSAGE,
    payload: message,
  };
};

/**
 * トーストメッッセージを削除する
 * @param index 削除対象のメッセージが入っている配列のインデックス
 */
export const removeToastMessage = (index) => {
  return {
    type: actionType.REMOVE_TOAST_MESSAGE,
    payload: index,
  };
};

import { push } from 'connected-react-router';
import actionType from '../config/actionType';

/**
 * ログイン処理
 * @param token アクセストークン
 */
export const login = (token) => {
  return {
    type: actionType.LOGIN,
    payload: token,
  };
};

/**
 * ログアウト処理
 */
export const logout = () => (dispatch) => {
  dispatch({ type: actionType.LOGOUT });
  dispatch(push('/login'));
};

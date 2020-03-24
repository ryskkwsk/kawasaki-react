import { push } from "connected-react-router";
import actionType from "./actionType";
import axios from '../config/Interceptors';

const API_BASE_PATH = process.env.REACT_APP_API_ROUTE;

const INITIAL_ITEM_FORM = {
  id: undefined,
  title: "",
  description: "",
  price: "",
  image: undefined
};

/**
 * 商品IDに基づいて商品画像を取得する
 * @param {*} token アクセストークン
 * @param {*} id 商品ID
 * @return 商品画像の情報を返す
 */
const searchImage = (token, id) => {
  return fetch(`${API_BASE_PATH}/items/image/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

/**
 * 商品のタイトルを検索する
 * @param {*} keyword 検索ワード
 * @return 検索結果を返す
 */
const searchResult = (keyword) => {
  const params = new URLSearchParams();
  params.set('title', keyword);
  return axios.get(`${API_BASE_PATH}/items/search/?` + params)
};

/**
 * 商品フォームにセットされた情報をDBに登録する
 * @param {*} formItem 商品フォームにセットされた情報
 */
const saveItemForm = (formItem) => {
  return axios.post(`${API_BASE_PATH}/items`, formItem);
};

/**
 * 画像をDBに登録する
 * @param {*} imageFile 画像ファイル
 * @param {*} id 商品ID
 */
const saveItemImage = (imageFile, id) => {
  const params = new FormData();
  params.append("image", imageFile);
  return axios.post(`${API_BASE_PATH}/items/image/${id}`, params);
};

/**
 * 商品一覧の検索を行う
 * @param token アクセストークン
 * @param keyword 検索キーワード
 */
export const fetchItems = token => async dispatch => {
  dispatch({ type: actionType.LOADING_SHOW });
  dispatch(push(`/items/search`));
  try {
    await axios
      .get(`${API_BASE_PATH}/items`)
      .then(responseSearchResult => {
        dispatch({
          type: actionType.FETCH_ITEM_FULFILLED,
          payload: responseSearchResult.data
        });
        for (const item of responseSearchResult.data) {
          if (item.imagePath) {
            searchImage(token, item.id).then(response => {
              response.blob().then(image => {
                const imageUrl = URL.createObjectURL(image);
                dispatch({
                  type: actionType.ADD_ITEM_IMAGE,
                  payload: {
                    imageUrl: imageUrl,
                    id: item.id
                  }
                });
              });
            });
          }
        }
        dispatch({ type: actionType.LOADING_HIDE });
      });
  } catch (error) {
    const actions = handleItemActionError(error);
    for (const action of actions) {
      dispatch(action);
    }
  }
};

/**
 * 登録値のバリデーションチェックを行う
 * @param item
 */
const validateItem = item => {
  let result = {};
  const itemPricepattern = new RegExp(/^[^0-9]+$/);

  if (!item.title) {
    result.title = "商品名を入力してください。";
  } else if (item.title.length > 100) {
    result.title = "商品名は100文字以内で入力してください。";
  }

  if (!item.description) {
    result.description = "商品説明を入力してください。";
  } else if (item.description.length > 500) {
    result.description = "商品説明は500文字以内で入力してください。";
  }

  if (!item.price) {
    result.price = "商品価格を入力してください。";
  } else if (itemPricepattern.test(item.price)) {
    result.price = "商品価格は半角数字で入力してください。";
  } else if (item.price.length > 9) {
    result.price = "商品価格の上限は9,999,999です";
  }

  return result;
};

/**
 * 登録値のバリデーションチェックを行う
 * @param keyword
 */
const validateSearchKeyWord = keyword => {
  let result = {};
  if (!keyword) {
    result.title = "検索ワードを入力してください";
  }

  return result;
};

/**
 * 検索ワードに伴う商品一覧の検索を行う
 * @param token アクセストークン
 * @param keyword 検索キーワード
 */
export const searchItems = (token, keyword) => dispatch => {
  const validateResults = validateSearchKeyWord(keyword);

  if (Object.keys(validateResults).length) {
    dispatch({
      type: actionType.ADD_TOAST_MESSAGE,
      payload: validateResults.title
    });
  }
  dispatch({ type: actionType.LOADING_SHOW });
  dispatch(push(`/items/search/${encodeURI(keyword)}`));
  if (keyword) {
    // API通信を行う
    searchResult(keyword).then(response => {
        dispatch({
          type: actionType.FETCH_ITEM_FULFILLED,
          payload: response.data
        });
        dispatch({
          type: actionType.ADD_TOAST_MESSAGE,
          payload: `${response.data.length}件の商品が見つかりました`
        });
        for (const item of response.data) {
          if (item.imagePath) {
            searchImage(token, item.id).then(response => {
              response.blob().then(image => {
                const imageUrl = URL.createObjectURL(image);
                dispatch({
                  type: actionType.ADD_ITEM_IMAGE,
                  payload: {
                    imageUrl: imageUrl,
                    id: item.id
                  }
                });
              });
            });
          }
        }
        dispatch({ type: actionType.LOADING_HIDE });
      })
      .catch(error => {
        const actions = handleItemActionError(error);
        for (const action of actions) {
          dispatch(action);
        }
      });
  }
  else {
    // 検索ワードが空だったら空の配列を返す
    dispatch({ type: actionType.LOADING_SHOW });
    dispatch({
      type: actionType.FETCH_ITEM_FULFILLED,
      payload: []
    });
  }
};

/**
 * 検索キーワードをセットする
 * @param keyword
 */
export const setSearchKeyword = keyword => {
  return {
    type: actionType.SET_ITEM_SEARCH_KEYWORD,
    payload: keyword
  };
};

/**
 * 入力された商品項目(タイトル、価格、説明、画像)をitemFormにセットする
 * @param itemForm 商品
 */
export const setItemForm = itemForm => {
  return {
    type: actionType.SET_ITEM_FORM,
    payload: itemForm
  };
};

/**
 * 商品登録フォームを表示する
 * @param title フォームのタイトル
 */
export const showCreateForm = title => dispatch => {
  dispatch({ type: actionType.SET_FORM_TITLE, payload: title });
  dispatch({ type: actionType.TOGGLE_ITEM_FORM });
};

/**
 * 商品情報をセットしてフォームを表示する
 * @param item 商品情報
 * @param title フォームのタイトル
 */
export const showUpdateForm = (item, title) => dispatch => {
  dispatch({ type: actionType.SET_FORM_TITLE, payload: title });
  dispatch({
    type: actionType.SET_ITEM_FORM,
    payload: {
      ...item,
      price: Number(item.price).toLocaleString()
    }
  });
  dispatch({ type: actionType.HIDE_ITEM_MENU });
  dispatch({ type: actionType.TOGGLE_ITEM_FORM });
};

/**
 * itemFormの値を初期化して非表示にする
 */
export const hideItemForm = () => dispatch => {

  for(const key in INITIAL_ITEM_FORM){
    if(INITIAL_ITEM_FORM.hasOwnProperty(key)){
      INITIAL_ITEM_FORM[key] = "";
    }
  }
  dispatch({
    type: actionType.SET_ITEM_FORM,
    payload: INITIAL_ITEM_FORM
  });
  dispatch({
    type: actionType.SET_ITEM_FORM_ERRORS,
    payload: {}
  });
  dispatch({ type: actionType.TOGGLE_ITEM_FORM });
};

/**
 * itemFormの値に応じて、(POST|PATCH)リクエストを送信する
 * @param token アクセストークン
 * @param item 商品フォームに入力された商品情報
 */
export const submitItemForm = (token, item) => async dispatch => {
  const result = validateItem(item);
  if (Object.keys(result).length) {
    dispatch({
      type: actionType.SET_ITEM_FORM_ERRORS,
      payload: result
    });
    return;
  }
  // フォームを初期化して閉じる処理
  const closeSubmitForm = () => {
    for(const key in INITIAL_ITEM_FORM){
      if(INITIAL_ITEM_FORM.hasOwnProperty(key)){
        INITIAL_ITEM_FORM[key] = "";
      }
    }
    dispatch({
      type: actionType.SET_ITEM_FORM,
      payload: INITIAL_ITEM_FORM
    });
    dispatch({ type: actionType.TOGGLE_ITEM_FORM });
  };

  // 金額のカンマを外す
  const formItem = {
    ...item,
    price: item.price.replace(/,/g, "")
  };

  dispatch({ type: actionType.LOADING_SHOW });
  // IDが存在する場合は更新処理
  if (item.id) {
    try {
      // API通信を行う(PUT /items/:id)
      await axios
        .put(`${API_BASE_PATH}/items/${item.id}`, formItem)
        .then(() => {
          dispatch({ type: actionType.SUBMIT_ITEM_FULFILLED });
          dispatch({
            type: actionType.ADD_TOAST_MESSAGE,
            payload: "更新に成功しました。"
          });
        });
      // 画像が選択されていた場合、画像を更新
      if (item.imageFile) {
        await saveItemImage(item.imageFile, item.id);
        dispatch({ type: actionType.SUBMIT_ITEM_FULFILLED });
        dispatch({
          type: actionType.ADD_TOAST_MESSAGE,
          payload: "商品画像の更新に成功しました。"
        });
      }
      // 一覧を再検索
      await axios
        .get(`${API_BASE_PATH}/items/`)
        .then(responseSearchResult => {
          dispatch({
            type: actionType.FETCH_ITEM_FULFILLED,
            payload: responseSearchResult.data
          });
          for (const item of responseSearchResult.data) {
            if (item.imagePath) {
              searchImage(token, item.id).then(response => {
                response.blob().then(image => {
                  const imageUrl = URL.createObjectURL(image);
                  dispatch({
                    type: actionType.ADD_ITEM_IMAGE,
                    payload: {
                      imageUrl: imageUrl,
                      id: item.id
                    }
                  });
                });
              });
            }
          }
          dispatch({ type: actionType.LOADING_HIDE });
        });
      // フォームを初期化して閉じる
      closeSubmitForm();
      dispatch({ type: actionType.LOADING_HIDE });
    } catch (error) {
      const actions = handleItemActionError(error);
      for (const action of actions) {
        dispatch(action);
      }
    }
  } else {
    // IDが存在しない場合は新規登録処理
    // API通信を行う(POST /items)
    try {
      const responseItemForm = await saveItemForm(formItem);
      dispatch({
        type: actionType.ADD_TOAST_MESSAGE,
        payload: "商品フォームの登録に成功しました。"
      });
      // 画像が選択されていた場合、画像をDBに登録する
      if (item.imageFile) {
        await saveItemImage(item.imageFile, responseItemForm.data.id);
        dispatch({ type: actionType.SUBMIT_ITEM_FULFILLED });
        dispatch({
          type: actionType.ADD_TOAST_MESSAGE,
          payload: "商品画像の登録に成功しました。"
        });
      }

      await axios
        .get(`${API_BASE_PATH}/items`)
        .then(responseSearchResult => {
          dispatch({
            type: actionType.FETCH_ITEM_FULFILLED,
            payload: responseSearchResult.data
          });
          for (const item of responseSearchResult.data) {
            if (item.imagePath) {
              searchImage(token, item.id).then(response => {
                response.blob().then(image => {
                  const imageUrl = URL.createObjectURL(image);
                  dispatch({
                    type: actionType.ADD_ITEM_IMAGE,
                    payload: {
                      imageUrl: imageUrl,
                      id: item.id
                    }
                  });
                });
              });
            }
          }
        });
      // フォームを初期化して閉じる
      closeSubmitForm();
      dispatch({ type: actionType.LOADING_HIDE });
    } catch (error) {
      const actions = handleItemActionError(error);
      for (const action of actions) {
        dispatch(action);
      }
    }
  }
};

/**
 * 削除確認ダイアログを表示する
 * @param id 削除対象商品のID
 */
export const showDeleteDialog = id => dispatch => {
  dispatch({
    type: actionType.SET_DELETE_ITEM_ID,
    payload: id
  });
  dispatch({ type: actionType.HIDE_ITEM_MENU });
  dispatch({ type: actionType.TOGGLE_DELETE_DIALOG });
};

/**
 * 削除確認ダイアログを非表示にする
 */
export const hideDeleteDialog = () => dispatch => {
  dispatch({
    type: actionType.SET_DELETE_ITEM_ID,
    payload: null
  });
  dispatch({ type: actionType.TOGGLE_DELETE_DIALOG });
};

/**
 * 商品を削除する
 * @param token
 * @param id 削除対象商品のID
 */
export const deleteItem = (token, id) => dispatch => {
  dispatch({ type: actionType.LOADING_SHOW });
  dispatch({ type: actionType.DELETE_ITEM });
  // API通信を行う (DELETE /items/:id)
  axios
    .delete(`${API_BASE_PATH}/items/${id}`)
    .then(() => {
      dispatch({ type: actionType.DELETE_ITEM_FULFILLED });
      dispatch({
        type: actionType.ADD_TOAST_MESSAGE,
        payload: `削除に成功しました。(ID: ${id})`
      });

      // 一覧を再検索
      axios
        .get(`${API_BASE_PATH}/items`)
        .then(responseSearchResult => {
          dispatch({
            type: actionType.FETCH_ITEM_FULFILLED,
            payload: responseSearchResult.data
          });
          dispatch({ type: actionType.LOADING_HIDE });
          for (const item of responseSearchResult.data) {
            if (item.imagePath) {
              searchImage(token, item.id).then(response => {
                response.blob().then(image => {
                  const imageUrl = URL.createObjectURL(image);
                  dispatch({
                    type: actionType.ADD_ITEM_IMAGE,
                    payload: {
                      imageUrl: imageUrl,
                      id: item.id
                    }
                  });
                  dispatch({ type: actionType.LOADING_HIDE });
                });
              });
            }
          }
        })
        .catch(error => {
          const actions = handleItemActionError(error);
          for (const action of actions) {
            dispatch(action);
          }
        });
      dispatch({
        type: actionType.SET_DELETE_ITEM_ID,
        payload: null
      });
      dispatch({ type: actionType.TOGGLE_DELETE_DIALOG });
    });
};

/**
 * 商品画像を削除する
 * @param id 削除対象商品のID
 */
export const deleteItemImage = (id) => dispatch => {
  dispatch({ type: actionType.LOADING_SHOW });
  dispatch({ type: actionType.DELETE_ITEM_IMAGE });
  // API通信を行う (DELETE /item/image/:id)
  axios
    .delete(`${API_BASE_PATH}/items/image/${id}`)
    .then(() => {
      dispatch({
        type: actionType.DELETE_ITEM_IMAGE_FULFILLED,
        payload: id
      });
      dispatch({ type: actionType.LOADING_HIDE });
      dispatch({
        type: actionType.ADD_TOAST_MESSAGE,
        payload: `商品画像の削除に成功しました。(ID: ${id})`
      });
      // フォームの画像を削除
      dispatch({
        type: actionType.SET_ITEM_IMAGE_URL,
        payload: null
      });
    })
    .catch(error => {
      const actions = handleItemActionError(error);
      for (const action of actions) {
        dispatch(action);
      }
    });
};

/**
 * 商品のメニューを表示
 * @param id 商品ID
 */
export const showItemMenu = (target, id) => dispatch => {
  dispatch({
    type: actionType.SHOW_ITEM_MENU,
    payload: {
      id: id,
      menuAnchor: target
    }
  });
};

/**
 * 商品のメニューを非表示
 * @param id 商品ID
 */
export const hideItemMenu = id => dispatch => {
  dispatch({
    type: actionType.HIDE_ITEM_MENU,
    payload: id
  });
};

/**
 * APIエラー発生時のハンドリング処理
 * @param error
 */
const handleItemActionError = error => {
  console.error(error);
  const status = error.response.status;
  if (status === 400) {
    return [{ type: actionType.HANDLE_INVALID_PARAMETER }];
  } else if (status === 401) {
    // 認証エラーの場合はログアウトする
    return [{ type: actionType.LOGOUT }];
  } else if (status === 404) {
    // リソースが存在しない場合
    return [{ type: actionType.HANDLE_NOT_FOUND }];
  } else {
    // サーバーエラーの場合
    return [
      { type: actionType.HANDLE_SERVER_ERROR },
      { type: actionType.LOADING_HIDE }
    ];
  }
};

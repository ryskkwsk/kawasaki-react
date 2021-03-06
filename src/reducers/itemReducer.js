import actionType from '../actions/actionType';

const initialItemState = {
  items: [],
  itemForm: {
    id: undefined,
    title: '',
    description: '',
    price: '',
    image: undefined,
    imageFile: undefined,
  },
  itemFormErrors: {},
  formTitle: '',
  showForm: false,
  deleteItemId: undefined,
  showDeleteDialog: false,
  searchKeyword: '',
  loading: false,
  error: undefined,
  showItemMenuId: undefined,
  menuAnchor: undefined,
};

const reducer = (state = initialItemState, action) => {
  switch (action.type) {
    case actionType.LOADING_SHOW:
      return { ...state, loading: true };
    case actionType.LOADING_HIDE:
      return { ...state, loading: false };
    case actionType.FETCH_ITEM_FULFILLED:
      return {
        ...state, items: action.payload
      };
    case actionType.ADD_ITEM_IMAGE:
      for (const item of state.items) {
        if (item.id === action.payload.id) {
          item.image_url = action.payload.imageUrl;
        }
      }
      return {...state };
    case actionType.SUBMIT_ITEM_FULFILLED:
      return { ...state };
    case actionType.DELETE_ITEM:
      return { ...state };
    case actionType.DELETE_ITEM_FULFILLED:
      return { ...state };
    case actionType.DELETE_ITEM_IMAGE:
      return { ...state };
    case actionType.DELETE_ITEM_IMAGE_FULFILLED:
      for (const item of state.items) {
        if (item.id === action.payload){
          item.image_url = undefined;
        }
      }
      return { ...state };
    case actionType.SET_ITEM_SEARCH_KEYWORD:
      return { ...state, searchKeyword: action.payload };
    case actionType.SET_FORM_TITLE:
      return { ...state, formTitle: action.payload };
    case actionType.SET_ITEM_FORM:
      return { ...state, itemForm: action.payload };
    case actionType.SET_ITEM_FORM_ERRORS:
      return { ...state, itemFormErrors: action.payload };
    case actionType.SET_ITEM_IMAGE_URL:
      state.itemForm.image_url = action.payload;
      return { ...state };
    case actionType.SET_DELETE_ITEM_ID:
      return { ...state, deleteItemId: action.payload };
    case actionType.TOGGLE_ITEM_FORM:
      state.showForm = !state.showForm;
      return { ...state };
    case actionType.TOGGLE_DELETE_DIALOG:
      state.showDeleteDialog = !state.showDeleteDialog;
      return { ...state };
    case actionType.SHOW_ITEM_MENU:
      state.showItemMenuId = action.payload.id;
      return { ...state };
    case actionType.HIDE_ITEM_MENU:
      return { ...state, showItemMenuId: undefined, menuAnchor: undefined };
    default:
      return state;
  }
};

export default reducer;
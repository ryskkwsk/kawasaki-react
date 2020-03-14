import actionType from '../actions/actionType';

const initialItemState = {
  items: [],
  itemForm: {
    id: null,
    title: '',
    description: '',
    price: '',
    image: null,
    imageFile: null,
  },
  itemFormErrors: {},
  formTitle: '',
  showForm: false,
  deleteITEMId: null,
  showDeleteDialog: false,
  searchKeyword: '',
  loading: false,
  error: null,
  showITEMMenuId: null,
  menuAnchor: null,
};

const reducer = (state = initialItemState, action) => {
  switch (action.type) {
    case actionType.FETCH_ITEM:
      return { ...state, loading: true };
    case actionType.FETCH_ITEM_FULFILLED:
      return {
        ...state, items: action.payload, loading: false,
      };
    case actionType.ADD_ITEM_IMAGE:
      for (const item of state.items) {
        if (item.id === action.payload.id) {
          item.image_url = action.payload.imageUrl;
        }
      }
      return {...state };
    case actionType.SUBMIT_ITEM:
      return { ...state, loading: true };
    case actionType.SUBMIT_ITEM_FULFILLED:
      return { ...state, loading: false };
    case actionType.DELETE_ITEM:
      return { ...state, loading: true };
    case actionType.DELETE_ITEM_FULFILLED:
      return { ...state, loading: false };
    case actionType.DELETE_ITEM_IMAGE:
      return { ...state, loading: true };
    case actionType.DELETE_ITEM_IMAGE_FULFILLED:
      for (const item of state.items) {
        if (item.id === action.payload){
          item.image_url = null;
        }
      }
      return { ...state, loading: false };
    case actionType.SET_ITEM_SEARCH_KEYWORD:
      return { ...state, searchKeyword: action.payload };
    case actionType.SET_FORM_TITLE:
      return { ...state, formTitle: action.payload };
    case actionType.SET_ITEM_FORM:
      return { ...state, itemForm: action.payload };
    case actionType.SET_ITEM_FORM_ERRORS:
      return { ...state, itemFormErrors: action.payload };
    case actionType.SET_ITEM_TITLE:
      state.itemForm.title = action.payload;
      return { ...state };
    case actionType.SET_ITEM_DESCRIPTION:
      state.itemForm.description = action.payload;
      return { ...state };
    case actionType.SET_ITEM_PRICE:
      state.itemForm.price = action.payload;
      return { ...state };
    case actionType.SET_ITEM_IMAGE:
      state.itemForm.image = action.payload.image;
      state.itemForm.imageFile = action.payload.imageFile
      return { ...state };
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
      state.showITEMMenuId = action.payload.id;
      return { ...state };
    case actionType.HIDE_ITEM_MENU:
      return { ...state, showITEMMenuId: null, menuAnchor: null };
    case actionType.DISABLED_LOADING:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default reducer;
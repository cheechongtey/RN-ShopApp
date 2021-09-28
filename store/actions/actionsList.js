export const UPDATE_WISHLIST = "UPDATE_WISHLIST";
export const UPDATE_CART = "UPDATE_CART";
export const SUBMIT_ORDER = "SUBMIT_ORDER";
export const ADD_USER_PRODUCT = "ADD_USER_PRODUCT";
export const EDIT_USER_PRODUCT = "EDIT_USER_PRODUCT";
export const DELETE_USER_PRODUCT = "DELETE_USER_PRODUCT";

export const updateWishlistAction = (payload) => {
  return {
    type: UPDATE_WISHLIST,
    payload,
  };
};

export const updateCartAction = (payload) => {
  return {
    type: UPDATE_CART,
    payload,
  };
};

export const submitOrderAction = () => {
  return {
    type: SUBMIT_ORDER,
  };
};

export const editUserProducts = (payload) => {
  return {
    type: EDIT_USER_PRODUCT,
    payload,
  };
};

export const addUserProducts = (payload) => {
  return {
    type: ADD_USER_PRODUCT,
    payload,
  };
};

export const deleteUserProducts = (payload) => {
  return {
    type: DELETE_USER_PRODUCT,
    payload,
  };
};

import Product from "../../data/dummy-data";
import ProductModel from "../../models/product";

const initiateState = {
  productObj: Product,
  filteredProductObj: [],
  wishListObj: [],
  userProducts: [
    new ProductModel(
      "test1",
      "cc",
      "Mug mug",
      "https://images.pexels.com/photos/160834/coffee-cup-and-saucer-black-coffee-loose-coffee-beans-160834.jpeg?cs=srgb&dl=bean-beans-black-coffee-160834.jpg&fm=jpg",
      "Can also be used for tea!",
      18.99
    ),
  ],
};

const productReducer = (state = initiateState, action) => {
  switch (action.type) {
    case "UPDATE_WISHLIST":
      return updateWishlistAction(state, action.payload);
    case "ADD_USER_PRODUCT":
      return addUserProduct(state, action.payload);
    case "EDIT_USER_PRODUCT":
      return editUserProduct(state, action.payload);
    case "DELETE_USER_PRODUCT":
      return deleteUserProduct(state, action.payload);
    default:
      return state;
  }
};

const deleteUserProduct = (state, payload) => {
  let prodId = payload.id;
  let userProducts = state.userProducts.filter((x) => x.id !== prodId);
  let productObj = state.productObj.filter((x) => x.id !== prodId);

  return {
    ...state,
    userProducts,
    productObj,
  };
};

const updateWishlistAction = (state, payload) => {
  let filtered = state.wishListObj.filter((x) => x.id === payload.id);

  if (filtered.length !== 0) {
    return {
      ...state,
      wishListObj: state.wishListObj.filter((x) => x.id !== payload.id),
    };
  } else {
    let product = state.productObj.find((x) => x.id === payload.id);

    return {
      ...state,
      wishListObj: [...state.wishListObj, product],
    };
  }
};

const addUserProduct = (state, payload) => {
  let { title, imageUrl, description, price } = payload.product;
  let newObj = new ProductModel(
    new Date().toString(),
    "u1",
    title,
    imageUrl,
    description,
    price
  );

  return {
    ...state,
    productObj: [...state.productObj, newObj],
    userProducts: [...state.userProducts, newObj],
  };
};

const editUserProduct = (state, payload) => {
  const { prodId, title, imageUrl, description } = payload.product;
  const selected = state.userProducts.findIndex((prod) => prod.id === prodId);
  const newObj = new ProductModel(
    prodId,
    state.userProducts[selected].ownerId,
    title,
    imageUrl,
    description,
    state.userProducts[selected].price
  );

  const updatedUserProducts = state.userProducts
    .filter((x) => x.id !== prodId)
    .concat(newObj);
  const updatedAvailableProducts = state.productObj
    .filter((x) => x.id !== prodId)
    .concat(newObj);

  return {
    ...state,
    userProducts: updatedUserProducts,
    productObj: updatedAvailableProducts,
  };
};

export default productReducer;

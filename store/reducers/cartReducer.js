import CartItem from "../../models/cart-item";
import Order from "../../models/order";

const initiateState = {
  cartObj: {},
  orderObj: [],
};

const cartReducer = (state = initiateState, action) => {
  switch (action.type) {
    case "UPDATE_CART":
      return updateCartAction(state, action.payload);
    case "SUBMIT_ORDER":
      return submitOrderAction(state, action.payload);
    default:
      return state;
  }
};

const submitOrderAction = (state, payload) => {
  let startInvoiceNum = (state.orderObj.length + 1).toString();
  let id = `INV${startInvoiceNum.padStart(5, "0")}`;
  let items = Object.entries(state.cartObj).map(([key, value]) => value);
  let totalAmount = items.reduce((current, item) => (current += item.sum), 0);
  let newOrder = new Order(id, items, totalAmount, new Date());

  return {
    ...state,
    cartObj: {},
    orderObj: [...state.orderObj, newOrder],
  };
};

const updateCartAction = (state, payload) => {
  let quantity, id, sum, current;

  switch (payload.type) {
    case "ADD":
      let newObj;
      let params = payload.product;

      quantity = params.quantity;
      id = params.id;
      sum = params.sum;
      current = state.cartObj[id];

      if (current) {
        newObj = new CartItem(
          current.quantity + quantity,
          Math.floor((current.sum + sum) * 100) / 100,
          id
        );
      } else {
        newObj = new CartItem(quantity, sum, id);
      }

      return {
        ...state,
        cartObj: { ...state.cartObj, [id]: newObj },
      };
    case "REMOVE":
      let removeId = payload.product.id;
      let removeQty = payload.product.quantity;
      let removeSum = payload.product.sum;
      let { [removeId]: current, ...rest } = state.cartObj;

      if (current.quantity > 1) {
        let newQty = current.quantity - removeQty;
        let newSum = current.sum - removeSum;

        return {
          ...state,
          cartObj: {
            ...state.cartObj,
            [removeId]: {
              ...current,
              quantity: newQty,
              sum: newSum,
            },
          },
        };
      } else {
        return {
          ...state,
          cartObj: rest,
        };
      }
    default:
      return state;
  }
};

export default cartReducer;

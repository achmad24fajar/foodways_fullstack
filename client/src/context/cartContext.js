import { createContext, useReducer } from "react";

export const CartContext = createContext();

const initialState = {
  isLogin: true,
  carts: [],
  currentRestaurant: '',
  order: [],
  restaurant: '',
  ongkir: 20000,
  addOrRemove: true
};

const reducer = (state, action) => {
  const { type, payload, resto, addOrRemove, newResto } = action;

  switch (type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isLogin: true,
      };
    case "ADD_CART":
      const findProductById = state.carts.find(
        (cart) => cart.id === payload.id
      );

      
      if (addOrRemove) {
        if(findProductById){
          const updatedCarts = state.carts.map((cart) =>
            cart.id === payload.id
              ? {
                  ...cart,
                  qty: cart.qty + 1,
                }
              : cart
          );
          return {
            ...state,
            carts: updatedCarts,
          };
        }
      }else{
        if(findProductById){
          const updatedCarts = state.carts.map((cart) =>
            cart.id === payload.id
              ? {
                  ...cart,
                  qty: cart.qty - 1,
                }
              : cart
          );

          return {
            ...state,
            carts: updatedCarts,
          };
        }
      }

      return {
        ...state,
        carts: [
          ...state.carts,
          {
            ...payload,
            qty: 1,
          },
        ],
        currentRestaurant: resto
      };
    case "REMOVE_CART":
      const filteredCarts = state.carts.filter(
        (cart) => cart.id !== payload.id
      );

      return {
        ...state,
        carts: filteredCarts,
      };
    case "ORDER":
      return {
        ...state,
        order: [payload],
        restaurant: newResto,
        carts: null,
        currentRestaurant: ''
      };
    default:
      throw new Error();
  }
};

export const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CartContext.Provider value={[state, dispatch]}>
      {children}
    </CartContext.Provider>
  );
};
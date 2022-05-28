import axios from 'axios';
import actions from './actions';

const initState = {
  products: [],
  wishes: [],
  shopping: [],
  searching: '',
  categ: '',
  loading: true,
  novas: [],
  sales: [],
  ordered: [],
  orders: [],
  currentProducts: [],
  currentPageNumber: 1,
  startPage: 0,
  endPage: 5,
};

export default (state = initState, action) => {
  switch (action.type) {
    case actions.GET_PRODUCTS: {
      return {
        ...state,
        products: action.products,
      };
    }
    case actions.GET_WISHES: {
      return {
        ...state,
        wishes: [...state.wishes, action.wishes],
      };
    }
    case actions.GET_CATEG: {
      return {
        ...state,
        categ: action.categ,
      };
    }
    case actions.REMOVE_WISH: {
      return {
        ...state,
        wishes: action.wishes,
      };
    }
    case actions.GET_SHOPPING: {
      return {
        ...state,
        shopping: [...state.shopping, action.shopping],
      };
    }
    case actions.REMOVE_SHOPPING: {
      return {
        ...state,
        shopping: action.shopping,
      };
    }
    case actions.UPDATE__COUNT: {
      return {
        ...state,
        shopping: action.shopping,
      };
    }
    case actions.GET_SEARCHING: {
      return {
        ...state,
        searching: action.searching,
      };
    }
    case actions.GET_WISHES_LOCALSTORAGE: {
      return {
        ...state,
        wishes: action.wishes,
      };
    }
    case actions.GET_SHOPPING_LOCALSTORAGE: {
      return {
        ...state,
        shopping: action.shopping,
      };
    }
    case actions.GET_SEARCHING_LOCALSTORAGE: {
      return {
        ...state,
        searching: action.searching,
      };
    }
    case actions.CHANGE_LOADING: {
      return {
        ...state,
        loading: action.loading,
      };
    }
    case actions.GET_NOVAS_PRODUCTS: {
      return {
        ...state,
        novas: action.novas,
      };
    }
    case actions.GET_SALES_PRODUCTS: {
      return {
        ...state,
        sales: action.sales,
      };
    }
    case actions.CLEAR__ALL__SHOPPING: {
      return {
        ...state,
        shopping: [],
      };
    }
    case actions.CLEAR__ALL__WISHES: {
      return {
        ...state,
        wishes: [],
      };
    }
    case actions.GET_ORDERED: {
      return {
        ...state,
        ordered: [...state.ordered, action.ordered],
      };
    }
    case actions.GET_ORDERED_LOCALSTORAGE: {
      return {
        ...state,
        ordered: action.ordered,
      };
    }
    case actions.GET__ALL__ORDERS: {
      return {
        ...state,
        orders: action.orders,
      };
    }
    case actions.GET_CURRENT_PRODUCTS: {
      return {
        ...state,
        currentProducts: action.currentProducts,
      };
    }
    case actions.CLEAR_CURRENT_PRODUCTS: {
      return {
        ...state,
        currentProducts: [],
      };
    }
    case actions.GET_CURRENT_PAGE: {
      return {
        ...state,
        currentPageNumber: action.currentPageNumber,
      };
    }
    case actions.REMOVE_SEARCHING: {
      return {
        ...state,
        searching: '',
      };
    }
    case actions.SET_START_PAGE: {
      return {
        ...state,
        startPage: action.startPage,
      };
    }
    case actions.SET_END_PAGE: {
      return {
        ...state,
        endPage: action.endPage,
      };
    }
    default:
      return state;
  }
};

export const getProducts = () => (dispatch) => {
  axios('https://allianceplusserver.herokuapp.com/products')
    .then(({ data }) => {
      dispatch({ type: actions.GET_PRODUCTS, products: data });
      return dispatch({ type: actions.CHANGE_LOADING, loading: false });
    });
};

export const getWishes = (product) => ({
  type: actions.GET_WISHES,
  wishes: product,
});

export const getShopping = (product) => ({
  type: actions.GET_SHOPPING,
  shopping: product,
});

export const removeShopping = (prodsArr) => ({
  type: actions.REMOVE_SHOPPING,
  shopping: prodsArr,
});

export const getCateg = (productCateg) => ({
  type: actions.GET_CATEG,
  categ: productCateg,
});

export const removeWish = (prodsArr) => ({
  type: actions.REMOVE_WISH,
  wishes: prodsArr,
});

export const updateCount = (value) => ({
  type: actions.UPDATE__COUNT,
  shopping: value,
});

export const getSearching = (value) => ({
  type: actions.GET_SEARCHING,
  searching: value,
});

export const getWishesLocalStorage = (prod) => ({
  type: actions.GET_WISHES_LOCALSTORAGE,
  wishes: prod,
});

export const getShoppingLocalStorage = (prod) => ({
  type: actions.GET_SHOPPING_LOCALSTORAGE,
  shopping: prod,
});

export const getSearchingLocalStorage = (val) => ({
  type: actions.GET_SEARCHING_LOCALSTORAGE,
  searching: val,
});

export const getNovasProducts = () => (dispatch) => {
  axios('https://allianceplusserver.herokuapp.com/nova')
    .then(({ data }) => {
      dispatch({
        type: actions.GET_NOVAS_PRODUCTS,
        novas: data,
      });
    });
};

export const getSalesProducts = () => (dispatch) => {
  axios('https://allianceplusserver.herokuapp.com/sale')
    .then(({ data }) => {
      dispatch({ type: actions.GET_SALES_PRODUCTS, sales: data });
    });
};

export const clearAllShopping = () => ({
  type: actions.CLEAR__ALL__SHOPPING,
});

export const clearAllWishes = () => ({
  type: actions.CLEAR__ALL__WISHES,
});

export const getOrdered = (shoppingArray, currentDate, orderNum) => ({
  type: actions.GET_ORDERED,
  ordered: {
    shopping: shoppingArray,
    orderDate: currentDate,
    orderNum,
  },
});

export const getOrderedLocalStorage = (prod) => ({
  type: actions.GET_ORDERED_LOCALSTORAGE,
  ordered: prod,
});

export const getAllOrders = () => (dispatch) => {
  axios('https://allianceplusserver.herokuapp.com/orders')
    .then(({ data }) => {
      dispatch({ type: actions.GET__ALL__ORDERS, orders: data });
    });
};

export const getCurrentProducts = (array) => ({
  type: actions.GET_CURRENT_PRODUCTS,
  currentProducts: array,
});

export const clearCurrentProducts = () => ({
  type: actions.CLEAR_CURRENT_PRODUCTS,
});

export const getCurrentPage = (pageNumber) => ({
  type: actions.GET_CURRENT_PAGE,
  currentPageNumber: pageNumber,
});

export const removeSearching = () => ({
  type: actions.REMOVE_SEARCHING,
});

export const setStartPage = (page) => ({
  type: actions.SET_START_PAGE,
  startPage: page,
});

export const setEndPage = (page) => ({
  type: actions.SET_END_PAGE,
  endPage: page,
});

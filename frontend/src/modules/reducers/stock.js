import produce from "immer";

const initialState = {
  state: {
    addWatchListLoading: false, // watchList 추가 시도중
    addWatchListDone: false,
    addWatchListError: null,

    removeWatchListLoading: false, // watchList 삭제 시도중
    removeWatchListDone: false,
    removeWatchListError: null,

    searchStockLoading: false, // 종목명 검색 시도중
    searchStockDone: false,
    searchStockError: null,

    loadStockLoading: false, // 종목 상세정보 불러오기 시도중
    loadStockDone: false,
    loadStockError: null,
  },
  my_watchlist: [],
  search_stock: [],
  detail_stock: [],
};

/* 액션 타입 만들기 */

export const ADD_WATCHLIST_REQUEST = "ADD_WATCHLIST_REQUEST";
export const ADD_WATCHLIST_SUCCESS = "ADD_WATCHLIST_SUCCESS";
export const ADD_WATCHLIST_FAILURE = "ADD_WATCHLIST_FAILURE";

export const REMOVE_WATCHLIST_REQUEST = "REMOVE_WATCHLIST_REQUEST";
export const REMOVE_WATCHLIST_SUCCESS = "REMOVE_WATCHLIST_SUCCESS";
export const REMOVE_WATCHLIST_FAILURE = "REMOVE_WATCHLIST_FAILURE";

export const SEARCH_STOCK_REQUEST = "SEARCH_STOCK_REQUEST";
export const SEARCH_STOCK_SUCCESS = "SEARCH_STOCK_SUCCESS";
export const SEARCH_STOCK_FAILURE = "SEARCH_STOCK_FAILURE";

export const LOAD_STOCK_REQUEST = "LOAD_STOCK_REQUEST";
export const LOAD_STOCK_SUCCESS = "LOAD_STOCK_SUCCESS";
export const LOAD_STOCK_FAILURE = "LOAD_STOCK_FAILURE";

/* 리듀서 선언 */

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ADD_WATCHLIST_REQUEST:
        draft.state.addWatchListLoading = true;
        draft.state.addWatchListDone = false;
        draft.state.addWatchListError = null;
        break;
      case ADD_WATCHLIST_SUCCESS:
        draft.state.addWatchListLoading = false;
        draft.state.addWatchListDone = true;
        draft.state.addWatchListError = null;
        draft.my_watchlist.push(action.data);
        break;
      case ADD_WATCHLIST_FAILURE:
        draft.state.addWatchListError = action.error;
        break;

      case REMOVE_WATCHLIST_REQUEST:
        draft.state.removeWatchListLoading = true;
        draft.state.removeWatchListDone = false;
        draft.state.removeWatchListError = null;
        break;
      case REMOVE_WATCHLIST_SUCCESS:
        draft.state.removeWatchListLoading = false;
        draft.state.removeWatchListDone = true;
        draft.state.removeWatchListError = null;
        draft.my_watchlist = draft.my_watchlist.filter(
          (v) => v.stock_code !== action.data
        );
        break;
      case REMOVE_WATCHLIST_FAILURE:
        draft.state.removeWatchListError = action.error;
        break;

      case SEARCH_STOCK_REQUEST:
        draft.state.searchStockLoading = true;
        draft.state.searchStockDone = false;
        draft.state.searchStockError = null;
        break;
      case SEARCH_STOCK_SUCCESS:
        draft.state.searchStockLoading = false;
        draft.state.searchStockDone = true;
        draft.state.searchStockError = null;
        draft.search_stock = action.data;
        break;
      case SEARCH_STOCK_FAILURE:
        draft.state.searchStockError = action.error;
        break;

      case LOAD_STOCK_REQUEST:
        draft.state.loadStockLoading = true;
        draft.state.loadStockDone = false;
        draft.state.loadStockError = null;
        break;
      case LOAD_STOCK_SUCCESS:
        draft.state.loadStockLoading = false;
        draft.state.loadStockDone = true;
        draft.state.loadStockError = null;
        draft.detail_stock = action.data;
        break;
      case LOAD_STOCK_FAILURE:
        draft.state.loadStockError = action.error;
        break;

      default:
        break;
    }
  });
};

export default reducer;

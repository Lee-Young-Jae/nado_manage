import produce from "immer";

const initialState = {
  state: {
    loadMeLoading: false, // 내정보 불러오기 시도중
    loadMeDone: false,
    loadMeError: null,

    signUpLoading: false, // 회원가입 시도중
    signUpDone: false,
    signUpError: null,

    logInLoading: false, // 로그인 시도중
    logInDone: false,
    logInError: null,

    logOutLoading: false, // 회원가입 시도중
    logOutDone: false,
    logOutError: null,
  },
  me: {
    id: 0,
    email: "",
    nickname: "",
  },
};

/* 액션 타입 만들기 */
export const INIT = "INIT";

export const LOAD_ME_REQUEST = "LOAD_ME_REQUEST";
export const LOAD_ME_SUCCESS = "LOAD_ME_SUCCESS";
export const LOAD_ME_FAILURE = "LOAD_ME_FAILURE";

export const USER_SIGNUP_REQUEST = "USER_SIGNUP_REQUEST";
export const USER_SIGNUP_SUCCESS = "USER_SIGNUP_SUCCESS";
export const USER_SIGNUP_FAILURE = "USER_SIGNUP_FAILURE";

export const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAILURE = "USER_LOGIN_FAILURE";

export const USER_LOGOUT_REQUEST = "USER_LOGOUT_REQUEST";
export const USER_LOGOUT_SUCCESS = "USER_LOGOUT_SUCCESS";
export const USER_LOGOUT_FAILURE = "USER_LOGOUT_FAILURE";

/* 리듀서 선언 */

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case INIT:
        draft.user = action.data;
        break;

      case LOAD_ME_REQUEST:
        draft.state.loadMeLoading = true;
        draft.state.loadMeDone = false;
        draft.state.loadMeError = null;
        draft.state.signUpDone = false; //signUp 초기화
        draft.state.logOutDone = false; // 로그아웃 Done 초기화
        break;
      case LOAD_ME_SUCCESS:
        draft.state.loadMeLoading = false;
        draft.state.loadMeDone = true;
        draft.state.loadMeError = null;
        draft.me = action.data;
        break;
      case LOAD_ME_FAILURE:
        draft.state.loadMeError = action.error;
        break;

      case USER_SIGNUP_REQUEST:
        draft.state.signUpLoading = true;
        draft.state.signUpDone = false;
        draft.state.signUpError = null;
        break;
      case USER_SIGNUP_SUCCESS:
        draft.state.signUpLoading = false;
        draft.state.signUpDone = true;
        draft.state.signUpError = null;
        draft.me = action.data;
        break;
      case USER_SIGNUP_FAILURE:
        draft.state.signUpError = action.error;
        break;

      case USER_LOGIN_REQUEST:
        draft.state.logInLoading = true;
        draft.state.logInDone = false;
        draft.state.logInError = null;
        break;
      case USER_LOGIN_SUCCESS:
        draft.state.logInLoading = false;
        draft.state.logInDone = true;
        draft.state.logInError = null;
        draft.state.signUpDone = false; // 회원가입 초기화
        draft.state.signUpError = null; // 회원가입 초기화
        draft.me = action.data;
        break;
      case USER_LOGIN_FAILURE:
        draft.state.logInError = action.error;
        break;

      case USER_LOGOUT_REQUEST:
        draft.state.logOutLoading = true;
        draft.state.logOutDone = false;
        draft.state.logOutError = null;
        break;
      case USER_LOGOUT_SUCCESS:
        draft.state.logOutLoading = false;
        draft.state.logOutDone = true;
        draft.state.logOutError = null;
        draft.state.logInDone = false; // 로그인 초기화

        draft.me = {};
        break;
      case USER_LOGOUT_FAILURE:
        draft.state.logOutError = action.error;
        break;

      default:
        return state;
    }
  });
};

export default reducer;

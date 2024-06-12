const initialState = {
  data: {},
  isLogin: false
  
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_FAILURE':
      return {
        ...state,
        data: {},
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload,
        },
      };

    default:
      return state;
  }
};
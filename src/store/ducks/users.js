/**
 * Types
 */
export const Types = {
  ADD_REQUEST: 'favorites/ADD_REQUEST',
  ADD_SUCCESS: 'favorites/ADD_SUCCESS',
  ADD_FAILURE: 'favorites/ADD_FAILURE',
  REMOVE: 'favorites/REMOVE',
};

/**
 * Reducer
 */
const INITIAL_STATE = {
  loading: false,
  data: [],
  error: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Types.ADD_REQUEST:
      return { ...state, loading: true };
    case Types.ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: [...state.data, action.payload.data],
      };
    case Types.ADD_FAILURE:
      return { ...state, loading: false };
    case Types.REMOVE:
      return { ...state, data: [...state.data.filter(item => item.id !== action.payload.id)] };
    default:
      return state;
  }
};

/**
 * Actions
 */
export const Creators = {
  addUserRequest: payload => ({
    type: Types.ADD_REQUEST,
    payload,
  }),
  addUserSuccess: data => ({
    type: Types.ADD_SUCCESS,
    payload: { data },
  }),
  addUserFailure: error => ({
    type: Types.ADD_FAILURE,
    payload: { error },
  }),
  removeUser: id => ({
    type: Types.REMOVE,
    payload: { id },
  }),
};

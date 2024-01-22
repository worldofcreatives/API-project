import { csrfFetch } from './csrf';

// Define action types
const SET_GROUPS = 'groups/setGroups';

// Define action creator for setting groups
const setGroups = (groups) => ({
  type: SET_GROUPS,
  payload: groups,
});

// Define thunk action for fetching groups
export const fetchGroups = () => async (dispatch) => {
  const response = await csrfFetch('/api/groups');
  const data = await response.json();
  dispatch(setGroups(data.Groups));
};

// Initial state
const initialState = {
  list: [],
};

// Define reducer
const groupsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_GROUPS:
      return { ...state, list: action.payload };
    default:
      return state;
  }
};

export default groupsReducer;

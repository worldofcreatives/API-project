import { csrfFetch } from './csrf';

// actions
const SET_GROUPS = 'groups/setGroups';
const SET_GROUP_DETAILS = 'groups/setGroupDetails';
const SET_GROUP_EVENTS = 'groups/setGroupEvents';


// action creators
const setGroups = (groups) => ({
  type: SET_GROUPS,
  payload: groups,
});

const setGroupDetails = (groupDetails) => ({
  type: SET_GROUP_DETAILS,
  payload: groupDetails,
});

const setGroupEvents = (events) => ({
  type: SET_GROUP_EVENTS,
  payload: events,
});


// thunk to fetch all groups
export const fetchGroups = () => async (dispatch) => {
  const response = await csrfFetch('/api/groups');
  const data = await response.json();
  dispatch(setGroups(data.Groups));
};

// Thunk Action to fetch a single group's details
export const fetchGroupDetails = (groupId) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/groups/${groupId}`);
    if (response.ok) {
      const groupDetails = await response.json();
      console.log("🚀 ~ fetchGroupDetails ~ groupDetails:", groupDetails)
      dispatch(setGroupDetails(groupDetails));
    } else {
      throw new Error('Group details fetch failed');
    }
  } catch (error) {
    console.error('Error fetching group details:', error);
    // Optionally, you can dispatch an error action here if you have error handling in your state
  }
};

// Thunk Action to fetch a group's events
export const fetchGroupEvents = (groupId) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/groups/${groupId}/events`);
    if (response.ok) {
      const { Events } = await response.json();
      dispatch(setGroupEvents(Events));
    } else {
      throw new Error('Group events fetch failed');
    }
  } catch (error) {
    console.error('Error fetching group events:', error);
    // Optionally, you can dispatch an error action here if you have error handling in your state
  }
};


const initialState = {
  list: [],
  groupDetails: null,
  groupEvents: [],
};

const groupsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_GROUPS:
      return { ...state, list: action.payload };
    case SET_GROUP_DETAILS:
      return { ...state, groupDetails: action.payload };
    case SET_GROUP_EVENTS:
      return { ...state, groupEvents: action.payload };
    default:
      return state;
  }
};

export default groupsReducer;

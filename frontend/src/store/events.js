import { csrfFetch } from './csrf';

// Action types
const SET_EVENTS = 'events/setEvents';

// Action creator for setting events
const setEvents = (events) => ({
  type: SET_EVENTS,
  payload: events,
});

// Thunk action for fetching events
export const fetchEvents = () => async (dispatch) => {
  const response = await csrfFetch('/api/events');
  const data = await response.json();
  dispatch(setEvents(data.Events));
};

// Initial state
const initialState = {
  list: [],
};

// Reducer
const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_EVENTS:
      return { ...state, list: action.payload };
    default:
      return state;
  }
};

export default eventsReducer;

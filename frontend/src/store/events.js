import { csrfFetch } from './csrf';

// Action types
const SET_EVENTS = 'events/setEvents';
const SET_EVENT_DETAILS = 'events/setEventDetails';


// Action creator for setting events
const setEvents = (events) => ({
  type: SET_EVENTS,
  payload: events,
});

const setEventDetails = (eventDetails) => ({
  type: SET_EVENT_DETAILS,
  payload: eventDetails,
});

// Thunk action for fetching events
export const fetchEvents = () => async (dispatch) => {
  const response = await csrfFetch('/api/events');
  const data = await response.json();
  dispatch(setEvents(data.Events));
};

export const fetchEventDetails = (eventId) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/events/${eventId}`);
    if (response.ok) {
      const eventDetails = await response.json();
      dispatch(setEventDetails(eventDetails));
    } else {
      throw new Error('Event details fetch failed');
    }
  } catch (error) {
    console.error('Error fetching event details:', error);
    // Optionally, you can dispatch an error action here if you have error handling in your state
  }
};

// Initial state
const initialState = {
  list: [],
  eventDetails: {},
};

// Reducer
const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_EVENTS:
      return { ...state, list: action.payload };
    case SET_EVENT_DETAILS:
      return { ...state, eventDetails: action.payload };
    default:
      return state;
  }
};

export default eventsReducer;

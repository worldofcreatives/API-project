import { csrfFetch } from './csrf';

// Action types
const SET_EVENTS = 'events/setEvents';
const SET_EVENT_DETAILS = 'events/setEventDetails';
const CREATE_EVENT = 'events/CREATE_EVENT';
const ADD_EVENT_IMAGE = 'events/ADD_EVENT_IMAGE';

// Action creator for setting events
const setEvents = (events) => ({
  type: SET_EVENTS,
  payload: events,
});

const setEventDetails = (eventDetails) => ({
  type: SET_EVENT_DETAILS,
  payload: eventDetails,
});

const createEvent = (event) => ({
  type: CREATE_EVENT,
  event,
});

const addEventImage = (eventId, image) => ({
  type: ADD_EVENT_IMAGE,
  eventId,
  image,
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

export const thunkCreateEvent = (groupId, event) => async (dispatch) => {
  const response = await csrfFetch(`/api/groups/${groupId}/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  });

  if (response.ok) {
    const event = await response.json();
    dispatch(createEvent(event));
    return event;
  } else {
    const error = await response.json();
    return error;
  }
};

export const thunkAddEventImage = (eventId, image) => async (dispatch) => {
  const response = await csrfFetch(`/api/events/${eventId}/images`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(image),
  });

  if (response.ok) {
    const imageData = await response.json();
    dispatch(addEventImage(eventId, imageData));
    return imageData;
  } else {
    const error = await response.json();
    return error;
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
    case CREATE_EVENT: {
      const eventsState = { ...state };
      eventsState.list.push(action.event);
      return eventsState;
    }
    case ADD_EVENT_IMAGE: {
      const eventsState = { ...state };
      const event = eventsState.list.find(e => e.id === action.eventId);
      if (event) {
        if ('EventImages' in event) {
          event.EventImages.push(action.image);
        } else {
          event.EventImages = [action.image];
        }
      }
      return eventsState;
    }
    default:
      return state;
  }
};

export default eventsReducer;

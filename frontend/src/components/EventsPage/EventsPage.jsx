import { Link } from 'react-router-dom';
import './EventsPage.css';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchEvents } from '../../store/events';

const EventsPage = () => {
    const dispatch = useDispatch();

    const events = useSelector((state) => state.events.list);
    console.log("🚀 ~ EventsPage ~ events:", events)


  useEffect(() => {
    dispatch(fetchEvents())
  }, [dispatch]);

  // formatting my dates
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
    return new Date(dateString).toLocaleString('en-US', options).replace(',', ' ·');
  };

  return (
    <div className="events-page">
      <nav>
         <Link to="/events">Events</Link>
         <Link to="/groups" className="active">Groups</Link>
       </nav>
        <p>Events in Meetup</p>
      <div className="event-list">
        {events.map(event => (
          console.log("🚀 ~ EventsPage ~ event:", event),
            <a href={`/events/${event.id}`} key={event.id} className="event-container">
          <div>
              {/* Check if event.previewImage is not the specific string */}
            <img src={event.previewImage !== "No preview image found." ? event.previewImage : "https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg"} alt={event.name} />
              <div>
                <h2>{event.name}</h2>
                {/* Check if event.Venue exists before trying to access its properties */}
                {event.Venue ? <p>{event.Venue.city}, {event.Venue.state}</p> : <p>There is not a venue</p>}
                {/* <p>{new Date(event.startDate).toLocaleString()}</p> */}
                <p>{formatDate(event.startDate)}</p>
                <p>{event.numAttending} attending</p>
              </div>
          </div>
            </a>
        ))}
      </div>
    </div>
  );
}
export default EventsPage;

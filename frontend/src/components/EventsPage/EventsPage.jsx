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

  // Sort events by date
  const sortedEvents = events.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

  const now = new Date();

  // Separate upcoming and past events
  const upcomingEvents = sortedEvents.filter(event => new Date(event.startDate) >= now);
  const pastEvents = sortedEvents.filter(event => new Date(event.startDate) < now);

  // Sort past events by most recent
  const sortedPastEvents = pastEvents.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

  // Combine the events
  const sortedAndFilteredEvents = [...upcomingEvents, ...sortedPastEvents];

  // formatting my dates
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
    return new Date(dateString).toLocaleString('en-US', options).replace(',', ' ·');
  };

  return (
    <div className="events-page">
      <nav>
         <Link to="/events" className="active">Events</Link>
         <Link to="/groups" className="nonactive">Groups</Link>
       </nav>
        <h1 className='head-text'>Events in World of Creatives</h1>
      <div className="event-list">
        {sortedAndFilteredEvents.map(event => (
          console.log("🚀 ~ EventsPage ~ event:", event),
            <a href={`/events/${event.id}`} key={event.id} className="event-container">
          <div>
            <img src={event.previewImage !== "No preview image found." ? event.previewImage : "https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg"} alt={event.name} />
          </div>
              <div>
                <h2>{event.name}</h2>
                {event.Venue ? <p>{event.Venue.city}, {event.Venue.state}</p> : <p>There is not a venue</p>}
                <p>{formatDate(event.startDate)}</p>
                <p>{event.numAttending} attending</p>
              </div>
            </a>
        ))}
      </div>
    </div>
  );
}
export default EventsPage;

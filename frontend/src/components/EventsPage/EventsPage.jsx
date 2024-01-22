import { Link } from 'react-router-dom';
import './EventsPage.css';

const EventsPage = () => {
  // Mock data or fetch from an API
  const events = [
    // ... list of events
  ];

  return (
    <div className="events-page">
      <nav>
        <Link to="/events" className="active">Events</Link>
        <Link to="/groups">Groups</Link>
      </nav>
      <div className="event-list">
        {events.map(event => (
          <Link to={`/events/${event.id}`} key={event.id} className="event-container">
            <img src={event.imageUrl} alt={event.title} />
            <div>
              <time dateTime={event.dateTime}>{event.dateTime}</time>
              <h2>{event.title}</h2>
              <p>{event.location}</p>
              <p>{event.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default EventsPage;

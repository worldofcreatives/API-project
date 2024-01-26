import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEventDetails, thunkRemoveEvent } from '../../store/events';
import { fetchGroupDetails } from '../../store/groups';
import './EventDetailPage.css';



const EventDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const eventDetails = useSelector(state => state.events.eventDetails);
  console.log("🚀 ~ EventDetailPage ~ eventDetails:", eventDetails)
  const groupDetails = useSelector(state => state.groups.groupDetails);
  console.log("🚀 ~ EventDetailPage ~ groupDetails:", groupDetails)
  const currentUser = useSelector(state => state.session.user); // Add this line to get the current user
  console.log("🚀 ~ EventDetailPage ~ currentUser:", currentUser)



  const [isEventDetailsLoaded, setIsEventDetailsLoaded] = useState(false);
  const [isGroupDetailsLoaded, setIsGroupDetailsLoaded] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);


  useEffect(() => {
    const fetchDetails = async () => {
      await dispatch(fetchEventDetails(id));
      setIsEventDetailsLoaded(true);
    };

    fetchDetails();
  }, [dispatch, id]);

  useEffect(() => {
    const fetchGroup = async () => {
      if (isEventDetailsLoaded && eventDetails.Group?.id) {
        await dispatch(fetchGroupDetails(eventDetails.Group.id));
        setIsGroupDetailsLoaded(true);
      }
    };

    fetchGroup();
  }, [dispatch, isEventDetailsLoaded, eventDetails.Group?.id]);


  // get event image url`
  let eventImageWithPreview;
if (eventDetails && eventDetails.EventImages) {
  eventImageWithPreview = eventDetails.EventImages.find(image => image.preview === true);
}

// // get group image url
let groupImageWithPreview;
if (groupDetails && groupDetails.GroupImages) {
  groupImageWithPreview = groupDetails.GroupImages.find(image => image.preview === true);
}
console.log("🚀 ~ EventDetailPage ~ groupImageWithPreview:", groupImageWithPreview)

// Check if the user is logged in and is the event creator
const isEventCreator = currentUser && groupDetails?.Organizer?.id === currentUser.id; // Modify this line as per your data structure
console.log("🚀 ~ EventDetailPage ~ isEventCreator:", isEventCreator)

  // Handlers for the buttons
  const handleUpdateEvent = () => {
    // Logic to handle event update
  };

  const handleDeleteEvent = () => {
    setShowDeleteConfirmation(true);
  };

  // const handleDeleteClick = () => {
  //   setShowDeleteConfirmation(true);
  // };

  const handleConfirmDelete = async () => {
    const result = await dispatch(thunkRemoveEvent(eventDetails.id));
    if (result.message === "Successfully deleted") {
      navigate(`/groups/${groupDetails.id}`);
    } else {
      // how should i handle error
    }
  };

  // formatting my dates
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
    return new Date(dateString).toLocaleString('en-US', options).replace(',', ' ·');
  };

  // format price
  const formatPrice = (price) => {
    return price === 0 ? 'FREE' : `$${price.toFixed(2)}`;
  };


  if (!eventDetails || Object.keys(eventDetails).length === 0) {
    return <div>Loading...</div>;
  }

  //🚨 added this code, but may not need it
  if (!isEventDetailsLoaded || !isGroupDetailsLoaded) {
    return <div>Loading group and event details...</div>;
  }

  return (
    <div className="event-detail-page">
        <nav>
            <Link to="/events">Events</Link>
        </nav>
        <div>
          <h1>{eventDetails.name}</h1>
          {groupDetails && groupDetails.Organizer &&
            <p>Hosted by {groupDetails.Organizer.firstName} {groupDetails.Organizer.lastName}</p>
          }
                {isEventCreator && (
                  <div className="event-management-buttons">
                    <button onClick={handleUpdateEvent} className="update-event-button">
                      Update
                    </button>
                    <button onClick={handleDeleteEvent} className="delete-event-button">
                      Delete
                    </button>
                    {showDeleteConfirmation && (<div className='modal-backdrop'>
                      <div className='confirmation-modal'>
                        <p>Are you sure you want to delete this event?</p>
                        <button onClick={handleConfirmDelete}  className='warning-button'>Yes, delete this event</button>
                        <button onClick={() => setShowDeleteConfirmation(false)} className='main-button-2'>No, keep this event.</button>
                      </div>
                      </div>
                    )}
                  </div>
                )}
        </div>
        <div>
          <div>
            <div>
              <img src={eventImageWithPreview !== undefined ? eventImageWithPreview.url : "https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg"} alt={eventDetails.name} />
            </div>
            <div>
              <div>
              {<img src={groupImageWithPreview !== undefined ? groupImageWithPreview.url : "https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg"} alt={groupDetails?.name} />
              }
                <h3>{eventDetails.Group.name}</h3>
                <p>{eventDetails.Group.private ? 'Private' : 'Public'}</p>
              </div>
              <div>
                <div>
                  <img src="" alt="icon" />
                  <p>START {formatDate(eventDetails.startDate)}</p>
                  <p>END {formatDate(eventDetails.endDate)}</p>
                </div>
                <div>
                  <img src="" alt="icon" />
                  <p>Price: {formatPrice(eventDetails.price)}</p>
                </div>
                <div>
                  <img src="" alt="icon" />
                  <p>{eventDetails.type}</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h1>Details</h1>
            <p>{eventDetails.description}</p>
          </div>
        </div>
    </div>
  );
};

export default EventDetailPage;

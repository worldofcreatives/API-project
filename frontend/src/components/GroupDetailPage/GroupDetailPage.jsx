import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGroupDetails } from '../../store/groups';
import GroupEventList from '../GroupEventsList/GroupEventList';
import './GroupDetailPage.css';


const GroupDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(state => state.session.user); // Assuming the user info is stored here
  console.log("🚀 ~ GroupDetailPage ~ currentUser:", currentUser)

  const groupDetails = useSelector(state => state.groups.groupDetails);
  console.log("🚀 ~ GroupDetailPage ~ groupDetails:", groupDetails)

  useEffect(() => {
    dispatch(fetchGroupDetails(id));
  }, [dispatch, id]);

  if (!groupDetails) {
    return <div>Loading...</div>;
  }

  const events = groupDetails.events || [];

  const upcomingEvents = events.filter(event => new Date(event.startDate) > new Date());
  console.log("🚀 ~ GroupDetailPage ~ upcomingEvents:", upcomingEvents)
  const pastEvents = events.filter(event => new Date(event.startDate) <= new Date());
  console.log("🚀 ~ GroupDetailPage ~ pastEvents:", pastEvents)

  // get image url
  let imageWithPreview = groupDetails.GroupImages.find(image => image.preview === true);
  console.log("🚀 ~ GroupDetailPage ~ imageWithPreview:", imageWithPreview)

  // Check if the user is logged in and is not the group creator
  const showJoinButton = currentUser && groupDetails.Organizer.id !== currentUser.id;

  // Check if the user is the group creator
  const isGroupCreator = currentUser && groupDetails.Organizer.id === currentUser.id;

  // Handlers for the buttons
  const handleCreateEvent = () => {
    navigate('/create-event', { state: { groupId: id, groupName: groupDetails.name } });
  };

  const handleUpdateGroup = () => {
    // Logic to handle group update
  };

  const handleDeleteGroup = () => {
    // Logic to handle group deletion
  };

  return (
    <div className="group-detail-page">
      <nav>
        <Link to="/groups">Groups</Link>
      </nav>
      <div>
        {/* Check if event.previewImage is not the specific string */}
        <img src={imageWithPreview !== undefined ? imageWithPreview.url : "https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg"} alt={groupDetails.name} />
        <div>
          <h1>{groupDetails.name}</h1>
          <p>{groupDetails.city}, {groupDetails.state}</p>
          <p>{groupDetails.numEvents} events · {groupDetails.private ? 'Private' : 'Public'}</p>
          <p>Organized by {groupDetails.Organizer.firstName} {groupDetails.Organizer.lastName}</p>
          {showJoinButton && (
        <button
            onClick={() => alert('Feature coming soon')}
            className="join-group-button"
          >
            Join this group
          </button>
        )}
        {isGroupCreator && (
          <div className="group-management-buttons">
              <button onClick={handleCreateEvent} className="create-event-button">
                Create event
              </button>
              <button onClick={handleUpdateGroup} className="update-group-button">
                Update
              </button>
              <button onClick={handleDeleteGroup} className="delete-group-button">
                Delete
              </button>
            </div>
          )}
        </div>
        <div>
          <h1>Organizer</h1>
          <p>{groupDetails.Organizer.firstName} {groupDetails.Organizer.lastName}</p>
          <h1>What we&apos;re about</h1>
          <p>{groupDetails.about}</p>
          <h1>Events ({groupDetails.numEvents})</h1>
          {<GroupEventList />}
        </div>
      </div>
    </div>
  );
};

export default GroupDetailPage;

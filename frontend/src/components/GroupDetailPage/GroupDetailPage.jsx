import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGroupDetails, thunkRemoveGroup } from '../../store/groups';
import GroupEventList from '../GroupEventsList/GroupEventList';
import './GroupDetailPage.css';


const GroupDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(state => state.session.user);
  console.log("🚀 ~ GroupDetailPage ~ currentUser:", currentUser)

  const groupDetails = useSelector(state => state.groups.groupDetails);
  console.log("🚀 ~ GroupDetailPage ~ groupDetails:", groupDetails)

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

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
  // let imageWithPreview = groupDetails.GroupImages.find(image => image.preview === true);
  let imageWithPreview;
  if (groupDetails.GroupImages && groupDetails.GroupImages.length > 0) {
    imageWithPreview = groupDetails.GroupImages.find(image => image.preview === true);
  }

  console.log("🚀 ~ GroupDetailPage ~ imageWithPreview:", imageWithPreview)

  // Check if the user is logged in and is not the group creator
  const showJoinButton = currentUser && groupDetails.Organizer?.id !== currentUser.id;

  // Check if the user is the group creator
  const isGroupCreator = currentUser && groupDetails.Organizer?.id === currentUser.id;

  // Handlers for the buttons
  const handleCreateEvent = () => {
    navigate('/create-event', { state: { groupId: id, groupName: groupDetails.name } });
  };

  const handleUpdateGroup = () => {
    navigate(`/edit-group`, { state: {
      groupId: id,
      userId: groupDetails.organizerId,
      groupName: groupDetails.name,
      groupCity: groupDetails.city,
      groupState: groupDetails.state,
      groupAbout: groupDetails.about,
      groupType: groupDetails.type,
      groupPrivate: groupDetails.private
     } });
  };

  const handleDeleteGroup = () => {
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    const result = await dispatch(thunkRemoveGroup(groupDetails.id));
    if (result.message === "Successfully deleted") {
      navigate(`/groups`);
    } else {
      // Handle errors here
    }
  };

  return (
    <div className="group-detail-page">
      <nav>
        <Link to="/groups">Groups</Link>
      </nav>
      <div className='top-section'>
        <div className='top-design-1'>
        <div className='image-container'>
        <img src={imageWithPreview !== undefined ? imageWithPreview.url : "https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg"} alt={groupDetails.name} className='top-img' />
        </div>
        <div className='head-right'>
        <div className='head-container'>
          <h1>{groupDetails.name}</h1>
          <p>{groupDetails.city}, {groupDetails.state}</p>
          <p>{groupDetails.numEvents} events · {groupDetails.private ? 'Private' : 'Public'}</p>
          <p>Organized by {groupDetails.Organizer?.firstName} {groupDetails.Organizer?.lastName}</p>
          </div>
          <div>
          {showJoinButton && (
        <button
            onClick={() => alert('Feature coming soon')}
            className="main-button-1"
          >
            Join this group
          </button>
        )}
        {isGroupCreator && (
          <div className="group-management-buttons">
              <button onClick={handleCreateEvent} className="main-button-4">
                Create event
              </button>
              <button onClick={handleUpdateGroup} className="main-button-2">
                Update
              </button>
              <button onClick={handleDeleteGroup} className="warning-button">
                Delete
              </button>
              {showDeleteConfirmation && (<div className='modal-backdrop'>
                  <div className='confirmation-modal'>
                    <p>Are you sure you want to delete this group?</p>
                    <button onClick={handleConfirmDelete}  className='warning-button'>Yes, delete this group</button>
                    <button onClick={() => setShowDeleteConfirmation(false)} className='main-button-2'>No, keep this event.</button>
                  </div>
                  </div>
                )}
            </div>
          )}
        </div>
        </div>
        </div>
        <div className='bottom-bg'>
        <div className='bottom-section'>
          <h1>Organizer</h1>
          <p>{groupDetails.Organizer?.firstName} {groupDetails.Organizer?.lastName}</p>
          <h1>What we&apos;re about</h1>
          <p>{groupDetails.about}</p>
          <h1>Events ({groupDetails.numEvents})</h1>
          {<GroupEventList />}
        </div>
        </div>
      </div>
    </div>
  );
};

export default GroupDetailPage;

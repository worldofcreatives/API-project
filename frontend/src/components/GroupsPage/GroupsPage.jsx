import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchGroups } from '../../store/groups';
import './GroupsPage.css';

const GroupsPage = () => {

    const dispatch = useDispatch();

    const groups = useSelector((state) => state.groups.list)

  useEffect(() => {
    dispatch(fetchGroups());
  }, [dispatch]);

return (
    <div className="groups-page">
      <nav>
         <Link to="/events">Events</Link>
         <Link to="/groups" className="active">Groups</Link>
       </nav>
        <p>Groups in Meetup</p>
      <div className="group-list">
        {groups.map(group => (
          <a href={`/groups/${group.id}`} key={group.id} className="group-container">
          <div>
            {/* Check if event.previewImage is not the specific string */}
            <img src={group.previewImage !== "No preview image found." ? group.previewImage : "https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg"} alt={group.name} />
              <div>
                <h2>{group.name}</h2>
                <p>{group.city}, {group.state}</p>
                <p>{group.about}</p>
                <p>{group.numEvents} events · {group.private ? 'Private' : 'Public'}</p>
              </div>
          </div>
            </a>
        ))}
      </div>
    </div>
  );

};

export default GroupsPage;

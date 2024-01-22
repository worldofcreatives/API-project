import { Link } from 'react-router-dom';
import './GroupsPage.css';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchGroups } from '../../store/groups';

const GroupsPage = () => {

    const dispatch = useDispatch();
  // Mock data or fetch from an API
  const groups = useSelector((state) => state.groups.list)

  useEffect(() => {
    dispatch(fetchGroups()); // Fetch groups when component mounts
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
              <img src={group.previewImage} alt={group.name} />
              <div>
                <h2>{group.name}</h2>
                <p>{group.city}, {group.state}</p>
                <p>{group.about}</p>
                <p>{group.numMembers} members · {group.private ? 'Private' : 'Public'}</p>
              </div>
          </div>
            </a>
        ))}
      </div>
    </div>
  );

};

export default GroupsPage;

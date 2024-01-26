import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton-bonus';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className="navigation-container">
      <ul className="nav-list">
        <li>
          <NavLink to="/">
            <img src="https://uploads-ssl.webflow.com/5d6dde2cb8496e3f669a4b75/65b416a2a783ad3ff1674de7_woc-logo.png" alt="Offline" />
          </NavLink>
        </li>
      </ul>
      <ul className="nav-list">
        {sessionUser && (
          <li className='space-r'>
            <NavLink to="/groups/new">
              <button className="start-group-button main-button-1">Start a New Group</button>
            </NavLink>
          </li>
        )}
      {isLoaded && (
        <li>
          <ProfileButton user={sessionUser} />
        </li>)}
      </ul>
    </div>
  );
}

export default Navigation;

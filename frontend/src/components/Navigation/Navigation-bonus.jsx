import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton-bonus';
import './Navigation.css';
import logo from '../../../public/woc-logo.png'

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className="navigation-container">
      <ul className="nav-list">
        <li>
          <NavLink to="/">
            <img src={logo} alt="Offline" />
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

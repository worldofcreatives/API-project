import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, createBrowserRouter, RouterProvider } from 'react-router-dom';
// import LoginFormPage from './components/LoginFormPage';
// import SignupFormPage from './components/SignupFormPage';
import Navigation from './components/Navigation/Navigation-bonus';
import * as sessionActions from './store/session';
import LandingPage from './components/Home';
import GroupsPage from './components/GroupsPage/GroupsPage';
import EventsPage from './components/EventsPage/EventsPage';
import GroupDetailPage from './components/GroupDetailPage';
import EventDetailPage from './components/EventDetailPage';
import CreateGroupPage from './components/CreateGroupPage';
import CreateEventPage from './components/CreateEventPage/CreateEventPage';

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <LandingPage />
      },
      {
        path: '/groups',
        element: <GroupsPage />
      },
      {
        path: '/events',
        element: <EventsPage />
      },
      {
        path: 'groups/:id',
        element: <GroupDetailPage />
      },
      {
        path: 'events/:id',
        element: <EventDetailPage />
      },
      {
        path: 'groups/new',
        element: <CreateGroupPage />
      },
      {
        path: 'create-event',
        element: <CreateEventPage />
      }
      // {
      //   path: 'login',
      //   element: <LoginFormPage />
      // },
      // {
      //   path: 'signup',
      //   element: <SignupFormPage />
      // }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

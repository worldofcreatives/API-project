import { useSelector } from 'react-redux';
import './LandingPage.css';

const LandingPage = () => {

  const isLoggedIn = useSelector(state => state.session.user !== null);
  console.log("🚀 ~ LandingPage ~ isLoggedIn:", isLoggedIn)

  return (
    <div className="landing-page">
      <section className="section section-1">
        <div className="content">
          <h1>The people platform—Where interests become friendships</h1>
          <p>Introductory text...</p>
        </div>
        <div className="infographic">
          <img src="../../../public/images/header.png" alt="Infographic" />
        </div>
      </section>

      <section className="section section-2">
        <h2>How Offline Works</h2>
        <p>This is all about how Offline works! What do you think?</p>
      </section>

      <section className="section section-3">
        <div className="column">
          <img src="../../../public/images/thumb-1.png" alt="See All Groups Image" className="section section-3 thumbnail"/>
          <a href="/groups" className="link">See all groups</a>
          <p>Caption for groups...</p>
        </div>
        <div className="column">
          <img src="../../../public/images/thumb-2.png" alt="Find an Event Image" className="section section-3 thumbnail"/>
          <a href="/events" className="link">Find an event</a>
          <p>Caption for events...</p>
        </div>
        <div className="column">
          <img src="../../../public/images/thumb-3.png" alt="Start a Group Image" className="section section-3 thumbnail"/>
          <a href="/start" className={`link ${!isLoggedIn ? 'disabled' : ''}`}>Start a group</a>
          <p>Caption for starting a group...</p>
        </div>
      </section>

      <section className="section section-4">
        <button className="join-meetup-button">Join Offline</button>
      </section>
    </div>
  );
}

export default LandingPage;

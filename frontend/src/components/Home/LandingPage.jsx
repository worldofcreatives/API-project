import { useSelector } from 'react-redux';
import './LandingPage.css';

const LandingPage = () => {

  const isLoggedIn = useSelector(state => state.session.user !== null);
  console.log("🚀 ~ LandingPage ~ isLoggedIn:", isLoggedIn)

  return (
    <div className="landing-page">
      <section className="section section-1">
        <div className="content">
          <h1>Unleash your creativity with other creators near you</h1>
          <p>Dive into a world where art meets community. Connect, create, and collaborate!</p>
        </div>
        <div className="landing-img">
          <img src="../../../public/images/landing-img.jpg" alt="Infographic" className="landing-img"/>
        </div>
      </section>

      <section className="section section-2">
        <h1>Discover & Participate</h1>
        <p>Explore a variety of art groups ranging from painting, music, dance and poetry. Join workshops, collaborate on projects, or attend exhibitions. Whether you&apos;re a beginner or a seasoned artist, there&apos;s a place for you.</p>
      </section>

      <section className="section section-3">
        <div className="column">
          <img src="../../../public/images/thumbnail-1.jpg" alt="See All Groups Image" className="section section-3 thumbnail"/>
          <a href="/groups" className="link">See all groups</a>
          <p>Find your niche in our diverse artistic collectives.</p>
        </div>
        <div className="column">
          <img src="../../../public/images/thumbnail-2.jpg" alt="Find an Event Image" className="section section-3 thumbnail"/>
          <a href="/events" className="link">Find an event</a>
          <p>From workshops to gallery nights, discover events that spark your creativity.</p>
        </div>
        <div className="column">
          <img src="../../../public/images/thumbnail-3.jpg" alt="Start a Group Image" className="section section-3 thumbnail"/>
          <a href="/groups/new" className={`link ${!isLoggedIn ? 'disabled' : ''}`}>Start a group</a>
          <p>Lead your own creative journey and inspire others by starting a group.</p>
        </div>
      </section>

      <section className="section section-4">
        <button className="main-button-1">Join World of Creatives Today</button>
      </section>
    </div>
  );
}

export default LandingPage;

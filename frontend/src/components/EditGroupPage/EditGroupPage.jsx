import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { thunkUpdateGroup } from "../../store/groups";
import './EditGroupPage.css';
import { useSelector } from "react-redux";


const EditGroupPage = () => {

    const location = useLocation();

    const { groupId, groupName, groupCity, groupState, groupAbout, groupType, groupPrivate, userId } = location.state;
    console.log("🚀 ~ EditGroupPage ~ location.state:", location.state)



    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user);
    console.log("🚀 ~ EditGroupPage ~ user:", user)

    if (user === null || userId !== user.id) {
        navigate("/");
      }

    const [city, setCity] = useState(groupCity);
    const [state, setState] = useState(groupState);
    const [name, setName] = useState(groupName);
    const [about, setAbout] = useState(groupAbout);
    const [type, setType] = useState(groupType);
    const [privacy, setPrivacy] = useState(groupPrivate ? 'true' : 'false');
    const [validationErrors, setValidationErrors] = useState({});


    useEffect(() => {
      if (user === null) {
          // Redirect or clear form fields
          navigate("/");
          // Clearing form fields if necessary
          setCity('');
          setState('');
          setName('');
          setAbout('');
          setType('');
          setPrivacy('');
      }
  }, [user, navigate]);


    const handleSubmit = async (e) => {
      e.preventDefault();

      const errors = {};

      if (!city)
        errors.city =
          "City is required";
      if (!state)
        errors.state =
          "State initials is required";
      if (state.length < 2 || state.length > 2)
        errors.state = "State initials must be 2 characters long";
      if (!name) errors.name = "A group name is required.";
      if (about.length < 30)
        errors.about =
          "Must be more than 30 characters long";
      if (type == "placeholder" || !type)
        errors.type = "Type is required";
      if (privacy == "placeholder" || !privacy)
        errors.privacy = "This is required.";

      if (Object.values(errors).length) {
        setValidationErrors(errors);
      } else {
        const newGroupReqBody = {
          name,
          about,
          type,
          private: privacy,
          city,
          state: state.toUpperCase(),
        };

        const createdGroup = await dispatch(thunkUpdateGroup(groupId, newGroupReqBody));

        if (createdGroup.errors) {
          setValidationErrors(createdGroup.errors);
        } else {
          navigate(`/groups/${createdGroup.id}`);
        }
      }
    };

  return (
      <section className="group-section">
        <h1>Start a New Group</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <h2>Set your group&apos;s location</h2>
            <p>
            Meetup groups meet locally, in person, and online. We&apos;ll connect you with people in your area.
            </p>
            <label htmlFor="city">
              <input
                type="text"
                name="city"
                id="group-city"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </label>
            <span id="comma-span">,</span>
            <label htmlFor="state">
              <input
                type="text"
                id="group-state"
                placeholder="STATE"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </label>
            <div className="errors-div">
              {"city" in validationErrors && (
                <span className="errors" id="group-error-city">
                  {validationErrors.city}
                </span>
              )}
              {"state" in validationErrors && (
                <span className="errors" id="group-error-state">
                  {validationErrors.state}
                </span>
              )}
            </div>
          </div>
          <div>
            <h2>
              What will your group name be?
            </h2>
            <p>
            Choose a name that will give people a clear idea of what the group is about. Feel free to get creative! You can edit this later if you change your mind.", and a text input with a placeholder of "What is your group name?
            </p>
            <label>
              <input
                type="text"
                id="group-name"
                placeholder="What is your group name?"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <div className="errors-div">
              {"name" in validationErrors && (
                <span className="errors">{validationErrors.name}</span>
              )}
            </div>
          </div>
          <div>
            <h2>Describe the purpose of your group.</h2>
            <label>
              <p>
              People will see this when we promote your group, but you'll be able to add to it later, too. 1. What's the purpose of the group? 2. Who should join? 3. What will you do at your events?
              </p>
            </label>
            <textarea
              name=""
              id="group-about"
              cols="30"
              rows="10"
              placeholder="Please write at least 30 characters"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            ></textarea>
            <div className="errors-div">
              {"about" in validationErrors && (
                <span className="errors">{validationErrors.about}</span>
              )}
            </div>
          </div>
          <div id="final-steps-div">
            <h2>Additional Information.</h2>
            <label htmlFor="type">
              <p>Is this an in-person or online group?</p>
              <select
                name="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option
                  className="placeholder-select"
                  disabled
                  value="placeholder"
                >
                  (select one)
                </option>
                <option value="In person">In person</option>
                <option value="Online">Online</option>
              </select>
            </label>
            <div className="errors-div">
              {"type" in validationErrors && (
                <span className="errors">{validationErrors.type}</span>
              )}
            </div>
            <label htmlFor="privacy">
              <p>
              Is this group private or public?
              </p>
              <select
                value={privacy}
                onChange={(e) => setPrivacy(e.target.value)}
                >
                <option value="false">Public</option>
                <option value="true">Private</option>
                </select>
            </label>
            <div className="errors-div">
              {"privacy" in validationErrors && (
                <span className="errors">{validationErrors.privacy}</span>
              )}
            </div>
          </div>
          <div>
            <button onSubmit={handleSubmit}>Update Group</button>
          </div>
        </form>
      </section>
    );
  };


export default EditGroupPage;

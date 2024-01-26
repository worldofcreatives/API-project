import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { thunkAddImage, thunkCreateGroup } from "../../store/groups";
import './CreateGroupPage.css';

const CreateGroupPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [type, setType] = useState("placeholder");
  const [privacy, setPrivacy] = useState("placeholder");
  const [imageUrl, setImageUrl] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {}, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};
    const urlEndings = [".png", ".jpg", ".jpeg"];
    const urlEnding3 = imageUrl.slice(-4);
    const urlEnding4 = imageUrl.slice(-5);

    if (!city)
      errors.city =
        "City is required";
    if (!state)
      errors.state =
        "State initials is required";
    if (state.length < 2 || state.length > 2)
      errors.state = "State initials must be 2 characters long";
    if (!name) errors.name = "A group name is required.";
    if (!imageUrl) errors.imageUrl = "A image url is required.";
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

      const newImageReqBody = {
        url: imageUrl,
        preview: true,
      };

      const createdGroup = await dispatch(thunkCreateGroup(newGroupReqBody));

      if (createdGroup.errors) {
        setValidationErrors(createdGroup.errors);
      } else {
        await dispatch(thunkAddImage(createdGroup.id, newImageReqBody));
        navigate(`/groups/${createdGroup.id}`);
      }
    }
  };

return (
    <section className="group-section">
      <h1 className="large">Start a New Group</h1>
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
          <span id="comma-span"> , </span>
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
              <option
                className="placeholder-select"
                disabled
                value="placeholder"
              >
                (select one)
              </option>
              <option value={false}>Public</option>
              <option value={true}>Private</option>
            </select>
          </label>
          <div className="errors-div">
            {"privacy" in validationErrors && (
              <span className="errors">{validationErrors.privacy}</span>
            )}
          </div>
          <label htmlFor="imageUrl">
            <p>
            Please add an image URL for your group below:
            </p>
            <input
              id="group-imageUrl"
              type="url"
              name="imageUrl"
              placeholder="Image Url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </label>
          <div className="errors-div">
            {"imageUrl" in validationErrors && (
              <span className="errors">{validationErrors.imageUrl}</span>
            )}
          </div>
        </div>
        <div>
          <button onSubmit={handleSubmit} className="main-button-1">Create Group</button>
        </div>
      </form>
    </section>
  );
};

export default CreateGroupPage;

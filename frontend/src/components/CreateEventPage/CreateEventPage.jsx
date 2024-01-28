import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { thunkCreateEvent, thunkAddEventImage } from '../../store/events'; // Adjust path as needed

const CreateEventPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { groupId, groupName } = location.state;
  const dispatch = useDispatch();

  const [eventName, setEventName] = useState('');
  const [eventType, setEventType] = useState('In person');
  const [eventPrice, setEventPrice] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {}, []);

  const validateForm = () => {
    const errors = {};
    if (!eventName) errors.eventName = 'Event name is required';
    if (!startDate) errors.startDate = 'Start date is required';
    if (!endDate) errors.endDate = 'End date is required';
    if (!imageUrl) errors.imageUrl = 'Image URL is required';
    if (!description || description.length < 30) errors.description = 'Please include at least 30 characters in the description.';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    setValidationErrors(errors);

    if (Object.keys(errors).length === 0) {

        const newEvent = {
        name: eventName,
        type: eventType,
        price: eventPrice,
        startDate,
        endDate,
        description,
      };

      const createdEvent = await dispatch(thunkCreateEvent(groupId, newEvent));
      console.log("🚀 ~ handleSubmit ~ createdEvent:", createdEvent)
      if (createdEvent.errors) {
        setValidationErrors(createdEvent.errors);
      } else {
        await dispatch(thunkAddEventImage(createdEvent.id, { url: imageUrl, preview: true }));
        navigate(`/events/${createdEvent.id}`);
      }
    }
  };

  return (
    <div>
      <h1 className="head-edit">Create a new event for {groupName}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            <p>
            What is the name of your event?</p>
            <input type="text" placeholder="Event Name" value={eventName} onChange={(e) => setEventName(e.target.value)} />
          </label>
          {validationErrors.eventName && <p className='errors'>{validationErrors.eventName}</p>}
        </div>

        <div>
          <label>
            <p>Is this an in-person or online group?</p>
            <select value={eventType} onChange={(e) => setEventType(e.target.value)}>
              <option value="In person">In person</option>
              <option value="Online">Online</option>
            </select>
          </label>
        </div>

        <div>
          <label>
          <p>What is the price for your event?</p>
            <input type="number" placeholder="0" value={eventPrice} onChange={(e) => setEventPrice(e.target.value)} />
          </label>
        </div>

        <div>
          <label>
            <p>When does your event start?</p>
            <input type="datetime-local" placeholder="MM/DD/YYYY, HH:mm AM" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </label>
          {validationErrors.startDate && <p className='errors'>{validationErrors.startDate}</p>}
        </div>

        <div>
          <label>
            <p>When does your event end?</p>
            <input type="datetime-local" placeholder="MM/DD/YYYY, HH:mm PM" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </label>
          {validationErrors.endDate && <p className='errors'>{validationErrors.endDate}</p>}
        </div>

        <div>
          <label>
            <p>Please add an image url for your event below:</p>
            <input type="text" placeholder="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
          </label>
          {validationErrors.imageUrl && <p className='errors'>{validationErrors.imageUrl}</p>}
        </div>

        <div>
          <label>
            <p>Please describe your event:</p>
            <textarea placeholder="Please include at least 30 characters." value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
          </label>
          {validationErrors.description && <p className='errors'>{validationErrors.description}</p>}
        </div>

        <button type="submit" className='main-button-1'>Create Event</button>
      </form>
    </div>
  );
};



export default CreateEventPage;

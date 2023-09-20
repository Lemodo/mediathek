import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Add = () => {
  const [media, setMedia] = useState({
    media_type: "film", // Default to "film"
    title: "",
    release_date: "",
    length: "",
    staffeln: "", // Add staffeln field for series
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setMedia((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/", media);
      navigate("/");
      // Reset the 'media' state to clear the form fields
      setMedia({
        media_type: "film", // Reset to "film"
        title: "",
        release_date: "",
        length: "",
        staffeln: "", // Reset staffeln
      });
    } catch (error) {
      // Handle errors
      console.error("Error adding media:", error);
    }
  };

  // Conditional rendering based on the selected media type
  const renderFields = () => {
    if (media.media_type === "film") {
      return (
        <>
          <input type="text" placeholder="Titel" name="title" onChange={handleChange} />
          <label>
            <input type="date" placeholder="Erscheinungsdatum" name="release_date" onChange={handleChange} />
          </label>
          <input type="number" placeholder="Länge" name="length" onChange={handleChange} />
        </>
      );
    } else if (media.media_type === "serie") {
      return (
        <>
          <input type="text" placeholder="Titel" name="title" onChange={handleChange} />
          <label>
            <input type="date" placeholder="Erscheinungsdatum" name="release_date" onChange={handleChange} />
          </label>
          <input type="number" placeholder="Staffeln" name="staffeln" onChange={handleChange} />
          <input type="number" placeholder="Länge" name="length" onChange={handleChange} />
        </>
      );
    }
  };

  return (
    <div className="add-container">
      <div className="form">
        <h1>Add new</h1>
        <p>
          Media type:
          <label>
            <input type="radio" onChange={handleChange} name="media_type" value="film" checked={media.media_type === "film"} />
            Film
          </label>
          <label>
            <input type="radio" onChange={handleChange} name="media_type" value="serie" checked={media.media_type === "serie"} />
            Serie
          </label>
        </p>
        {renderFields()} {/* Conditionally render input fields */}
        <div className="button-container">
          <button className='add-button' onClick={handleClick}>Add</button>
        </div>
      </div>
    </div>
  );
};

export default Add;

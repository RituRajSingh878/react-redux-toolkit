import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createTutorial } from "../slices/tutorials";

const AddTutorial = () => {
  const initialTutorialState = {
    id: null,
    title: "",
    description: "",
    jiraLink: "",
    targetedBranch: "",
    published: false
  };
  const [tutorial, setTutorial] = useState(initialTutorialState);
  const [submitted, setSubmitted] = useState(false);

  const dispatch = useDispatch();

  const handleInputChange = event => {
    const { name, value } = event.target;
    setTutorial({ ...tutorial, [name]: value });
  };

  const saveTutorial = () => {
    const { title, description, jiraLink, targetedBranch } = tutorial;

    dispatch(createTutorial({ title, description, jiraLink, targetedBranch }))
      .unwrap()
      .then(data => {
        console.log(data);
        setTutorial({
          id: data.id,
          title: data.title,
          description: data.description,
          jiraLink: data.jiraLink,
          targetedBranch: data.targetedBranch,
          published: data.published
        });
        setSubmitted(true);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newTutorial = () => {
    setTutorial(initialTutorialState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newTutorial}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={tutorial.title || ''}
              onChange={handleInputChange}
              name="title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={tutorial.description || ''}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <div className="form-group">
            <label htmlFor="jiraLink">Jira Link</label>
            <input
              type="text"
              className="form-control"
              id="jiraLink"
              required
              value={tutorial.jiraLink || ''}
              onChange={handleInputChange}
              name="jiraLink"
            />
          </div>

          <div className="form-group">
            <label htmlFor="targetedBranch">Target Branch</label>
            <input
              type="text"
              className="form-control"
              id="targetedBranch"
              required
              value={tutorial.targetedBranch || ''}
              onChange={handleInputChange}
              name="targetedBranch"
            />
          </div>

          <button onClick={saveTutorial} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddTutorial;

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateTutorial, deleteTutorial } from "../slices/tutorials";
import TutorialDataService from "../services/TutorialService";
import DefaultComponent from "./Comments";

const EngineerView = (props) => {
  const initialTutorialState = {
    id: null,
    title: "",
    jiraLink: "",
    targetedBranch: "",
    description: "",
    published: false,
    message: []
  };
  const [currentTutorial, setCurrentTutorial] = useState(initialTutorialState);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const getTutorial = id => {
    TutorialDataService.get(id)
      .then(response => {
        setCurrentTutorial(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getTutorial(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentTutorial({ ...currentTutorial, [name]: value });
  };

  const updateContent = () => {
    dispatch(updateTutorial({ id: currentTutorial.id, data: currentTutorial }))
      .unwrap()
      .then(response => {
        console.log(response);
        setMessage("The tutorial was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const removeTutorial = () => {
    dispatch(deleteTutorial({ id: currentTutorial.id }))
      .unwrap()
      .then(() => {
        props.history.push("/engineer");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentTutorial ? (
       <div className="row">

        <div className="col-xl-6 col-md-6">
        <div className="edit-form">
          <h4>{currentTutorial.title}</h4>
          <form>
          
            <div className="form-group">
              <label htmlFor="jiraLink">Jira Link</label>
              <input
                type="text"
                className="form-control"
                id="jiraLink"
                name="jiraLink"
                value={currentTutorial.jiraLink}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="targetedBranch">Targeted Branch</label>
              <input
                type="text"
                className="form-control"
                id="targetedBranch"
                name="TargetedBranch"
                value={currentTutorial.targetedBranch}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentTutorial.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentTutorial.published ? "Published" : "Pending"}
            </div>
          </form>
         
          
          
          {currentTutorial.published ? (
            ""
          ) : (
            <button
            type="submit"
            className="badge badge-success"
            onClick={updateContent}
          >
            Update
          </button>
          )}

            

        <button className="badge badge-danger mr-2" onClick={removeTutorial}>
            Delete
          </button>
          
          <p>{message}</p>
        </div>
        </div>

        <div className="col-xl-6 col-md-6">
        <DefaultComponent tutorial={currentTutorial} view={"Engineer"} />
        </div>
        
       </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Tutorial...</p>
        </div>
      )}
      
    </div>
  );
};

export default EngineerView;

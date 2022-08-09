import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateTutorial, deleteTutorial } from "../slices/tutorials";
import TutorialDataService from "../services/TutorialService";
import DefaultComponent from "./Comments";

const TpmView = (props) => {
  const initialTutorialState = {
    id: null,
    title: "",
    jiraLink: "",
    prLink: "",
    targetedBranch: "",
    description: "",
    published: false,
    accepted: false,
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

  const updateStatus = (status1, status2) => {
    const data = {
      id: currentTutorial.id,
      title: currentTutorial.title,
      jiraLink: currentTutorial.jiraLink,
      prLink: currentTutorial.prLink,
      targetedBranch: currentTutorial.targetedBranch,
      description: currentTutorial.description,
      published: status1,
      accepted: status2
    };

    dispatch(updateTutorial({ id: currentTutorial.id, data }))
      .unwrap()
      .then(response => {
        console.log(response);
        setCurrentTutorial({ ...currentTutorial, published: status1, accepted: status2 });
        setMessage("The status was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
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
        props.history.push("/tutorials");
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
              <label htmlFor="prLink">Jira Link</label>
              <input
                type="text"
                className="form-control"
                id="prLink"
                name="prLink"
                value={currentTutorial.prLink}
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
          </form>
          {currentTutorial.published ? (
            ""
          ) : (
            <button
              className="badge badge-success label text-white f-12"
              onClick={() => updateStatus(true, true)}
            >
              Approve
            </button>

          )}

        {currentTutorial.published ? (
                    ""
                  ) : (
                    <button
                      className="badge badge-danger badge-success label text-white f-12"
                      onClick={() => updateStatus(true, false)}
                    >
                      Decline
                    </button>

          )}    
          

          <p>{message}</p>

        </div>
        </div>

        <div className="col-xl-6 col-md-6"> 
        <DefaultComponent tutorial={currentTutorial}  view={"Tpm"}/>
        </div>
        

        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Request...</p>
        </div>
      )}
      
    </div>
  );
};

export default TpmView;

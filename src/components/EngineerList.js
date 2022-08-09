import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  retrieveTutorials,
  findTutorialsByTitle,
  deleteAllTutorials,
} from "../slices/tutorials";
import { Link } from "react-router-dom";
import { type } from "os";
import '../assets/css/style.css';

const EngineerList = () => {
  const [currentTutorial, setCurrentTutorial] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [currentType, setCurrentType] = useState("");
  const [searchTitle, setSearchTitle] = useState("");

  const tutorials = useSelector(state => state.tutorials);
  const approvedTutorials = [];
  const nonApprovedTutorials = [];
  tutorials.forEach((tutorial) => {
    if(tutorial.published) {
      approvedTutorials.push(tutorial);
    } else {
      nonApprovedTutorials.push(tutorial);
    }
  });


  const dispatch = useDispatch();

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const initFetch = useCallback(() => {
    dispatch(retrieveTutorials());
  }, [dispatch])

  useEffect(() => {
    initFetch()
  }, [initFetch])

  const refreshData = () => {
    setCurrentTutorial(null);
    setCurrentIndex(-1);
  };

  const setActiveTutorial = (tutorial, index, type) => {
    setCurrentTutorial(tutorial);
    setCurrentIndex(index);
    setCurrentType(type);
  };

  const removeAllTutorials = () => {
    dispatch(deleteAllTutorials())
      .then(response => {
        refreshData();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    refreshData();
    dispatch(findTutorialsByTitle({ title: searchTitle }));
  };

  return (
    <div className="row">
     
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div>
 
      <div class="col-xl-6 col-md-6">
      <div class="Recent-Users card">
        <div class="card-header">
          <h5 class="card-title">
            Recent Review
          </h5>
        </div>
        <div className="px-0 py-2 card-body">
        <div className="table-responsive">
          <table class="table">
            <tbody>
            {approvedTutorials &&
            approvedTutorials.map((tutorial, index) => (
              <tr
                className={
                  (index === currentIndex && currentType === "approved" ? "tableSelected" : "")
                }
                onClick={() => setActiveTutorial(tutorial, index, "approved")}
                key={index}
              >
                <td>
                  <h6 class="mb-1">
                  {tutorial.title}
                  </h6>
                </td>

                <td>
                  <h6 class="mb-1">
                  <i class="fa fa-circle text-c-green f-10 m-r-15"></i>
                  {tutorial.targetedBranch}
                  </h6>
                </td>
                <td>
                  <h6 class="mb-1">
                  <a href={tutorial.jiraLink}>Jira Link</a>
                  
                  </h6>
                </td>

                <td>
                  <h6 class="mb-1">
                  <i class="fa fa-circle text-c-green f-10 m-r-15"></i>
                  {(tutorial.accepted?"Approved":"Declined")}
                  </h6>
                </td>
                
                <td>
                <Link
                    to={"/engineer/" + tutorial.id}
                    className="label theme-bg2 text-white f-12"
                  >
                    View
                  </Link>
                  
                </td>
              </tr>
            ))}
            
          </tbody>
        </table>
      </div>
    </div>
    </div>
      </div> 




      <div class="col-xl-6 col-md-6">
      <div class="Recent-Users card">
        <div class="card-header">
          <h5 class="card-title">
            Recently Requested
          </h5>
        </div>
        <div className="px-0 py-2 card-body">
        <div className="table-responsive">
          <table class="table">
            <tbody>
            {nonApprovedTutorials &&
            nonApprovedTutorials.map((tutorial, index) => (
              <tr
                className={
                  (index === currentIndex && currentType === "nonApproved" ? "tableSelected" : "")
                }
                onClick={() => setActiveTutorial(tutorial, index, "nonApproved")}
                key={index}
              >
                <td>
                  <h6 class="mb-1">
                  {tutorial.title}
                  </h6>
                </td>

                <td>
                  <h6 class="mb-1">
                  <i class="fa fa-circle text-c-green f-10 m-r-15"></i>
                  {tutorial.targetedBranch}
                  </h6>
                </td>
                <td>
                  <h6 class="mb-1">
                  <a href={tutorial.jiraLink}>Jira Link</a>
                  
                  </h6>
                </td>
                <td>
                <Link
                    to={"/engineer/" + tutorial.id}
                    className="label theme-bg2 text-white f-12"
                  >
                    View
                  </Link>
                  
                </td>
              </tr>
            ))}
            
          </tbody>
        </table>
      </div>
    </div>
    </div>
      </div>
    </div>
  );
};

export default EngineerList;
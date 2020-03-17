import React from "react";

const MovieTabs = (props) => {
    const {sort_by, updateSortBy} = props;
  return(
      <ul className="tabs nav nav-pills">
          <li className="nav-item" onClick={() =>{
              updateSortBy("popularity.desc");
          }}>
              <div className={`nav-link ${
                  sort_by === "popularity.desc"? "active":""
                  }`}>
                  Popularity desc
              </div>
          </li>
          <li className="nav-item" onClick={()=>{
              updateSortBy("revenue.desc");
          }}>
              <div className={`nav-link ${
                  sort_by === "revenue.desc"? "active":""
                  }`}>
                  Revenue desc
              </div>
          </li>
          <li className="nav-item" onClick={()=>{
              updateSortBy("vote_average.asc");
          }}>
              <div className={`nav-link ${
                  sort_by === "vote_average.asc"? "active":""
                  }`}>
                  Vote avetage desc
              </div>
          </li>
      </ul>
  )
};
export default MovieTabs;
import React from "react";
//import { moviesData } from "../moviesData";
import MovieItem from "./MovieItem";
import {API_URL, API_KEY_3} from "../utils/api";
import MovieTabs from "./MovieTabs";

// UI = fn(state, props)
// App = new React.Component()

class App extends React.Component {
  constructor() {
    super();
      console.log("constuctor");
    this.state = {
      movies: [],
      moviesWillWatch: [],
      sort_by: "popularity.desc"
    };
  }
  componentDidMount(){
      this.getMovies();
  }
  componentDidUpdate(prevProps, prevState){
    if(prevState.sort_by !== this.state.sort_by){
      this.getMovies();
    }
  }
  getMovies = () => {
      fetch(`${API_URL}/discover/movie?api_key=${API_KEY_3}&sort_by=${
          this.state.sort_by}`
      ).then(response => {
          return response.json();
      }).then((date) => {
          this.setState({
              movies: date.results
          });
      });
  };

  deleteMovie = movie => {
    console.log(movie.id);
    const updateMovies = this.state.movies.filter(item => item.id !== movie.id);
    console.log(updateMovies);

    // this.state.movies = updateMovies;
    this.setState({
      movies: updateMovies
    });
  };

  addMovieToWillWatch = movie => {
    const updateMoviesWillWatch = [...this.state.moviesWillWatch];
    updateMoviesWillWatch.push(movie);

    this.setState({
      moviesWillWatch: updateMoviesWillWatch
    });
  };

  deleteMovieFromWillWatch = movie => {
    const updateMoviesWillWatch = this.state.moviesWillWatch.filter(
      item => item.id !== movie.id
    );

    this.setState({
      moviesWillWatch: updateMoviesWillWatch
    });
  };

  updateSortBy = sort_by => {
    this.setState({
      sort_by: sort_by
    });
  };

  render() {
    console.log("render");
    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-9">
            <div className="row mb-4">
              <div className="col-12">
                <MovieTabs sort_by={this.state.sort_by} updateSortBy={this.updateSortBy} />
              </div>
            </div>

            <div className="row">
              {this.state.movies.map(movie => {
                return (
                  <div className="col-6 mb-4" key={movie.id}>
                    <MovieItem
                      data={movie}
                      deleteMovie={this.deleteMovie}
                      addMovieToWillWatch={this.addMovieToWillWatch}
                      deleteMovieFromWillWatch={this.deleteMovieFromWillWatch}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-3">
            <h4>Will Watch: {this.state.moviesWillWatch.length} movies</h4>
            <ul className="list-group">
              {this.state.moviesWillWatch.map(movie => (
                <li key={movie.id} className="list-group-item">
                  <div className="d-flex justify-content-between">
                    <p>{movie.title}</p>
                    <p>{movie.vote_average}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

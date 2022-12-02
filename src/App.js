import './App.css';
import { useState, useEffect } from "react";
import movieData from "./assets/movies.json";
import { Radio } from "./radio.js";
import MovieItem from "./components/movieItem";


function App() {

  const [filteredData, setFilteredData] = useState(movieData)
  const [sortVar, setSortVar] = useState('movie_id');
  const [phase, setPhase] = useState('All');
  const [team, setTeam] = useState('All')
  const [watched, setWatched] = useState({ items: [], time: 0 });

  const updateWatched = (idx) => {
    const item = movieData.find(el => el.movie_id === idx)
    console.log(movieData)
    const title = item.title;
    const arr_index = watched.items.indexOf(title)
    if (arr_index === -1) {
      const newWatched = [...watched.items, title]
      const newTime = watched.time + item.running_time
      setWatched({ items: newWatched, time: newTime })
    } else {
      const newWatched = watched.items.filter(a => a !== title)
      const newTime = watched.time - item.running_time
      setWatched({ items: newWatched, time: newTime })
    }
  }
  console.log(watched.items, watched.time)

  useEffect(() => {
    if (phase !== 'All' && team !== 'All') {
      setFilteredData(movieData.filter(a => a["phase"] === phase).filter(a => a["category"] === team))
    } else if (phase !== 'All' && team === 'All') {
      setFilteredData(movieData.filter(a => a["phase"] === phase))
    } else if (phase === 'All' && team !== 'All') {
      setFilteredData(movieData.filter(a => a["category"] === team))
    } else {
      setFilteredData(movieData)
    }
  }, [phase, team, sortVar])

  const sortChangeHandler = (e) => {
    setSortVar(e.target.value);
  };
  const PhaseChangeHandler = (e) => {
    setPhase(e.target.value);
  };

  const TeamChangeHandler = (e) => {
    setTeam(e.target.value);
  };

  return (
    <div className="App">
      <div className='head'>
        <h1>Marvel Studios Movies</h1>
      </div>
      <div className='content'>
        <div className='buttons'>
          <h2>Sort By:</h2>
          <div className="radio-btn-container">
            <Radio
              changed={sortChangeHandler}
              isSelected={sortVar === "movie_id"}
              label="Recent"
              value="movie_id"
            />
            <Radio
              changed={sortChangeHandler}
              isSelected={sortVar === "gross"}
              label="Box Office"
              value="gross"
            />
            <Radio
              changed={sortChangeHandler}
              isSelected={sortVar === "running_time"}
              label="Runtime"
              value="running_time"
            />
          </div>
          <h2>Phase:</h2>
          <div className="radio-btn-container">
            <Radio
              changed={PhaseChangeHandler}
              isSelected={phase === "All"}
              label="All"
              value="All"
            />
            <Radio
              changed={PhaseChangeHandler}
              isSelected={phase === "One"}
              label="One"
              value="One"
            />
            <Radio
              changed={PhaseChangeHandler}
              isSelected={phase === "Two"}
              label="Two"
              value="Two"
            />
            <Radio
              changed={PhaseChangeHandler}
              isSelected={phase === "Three"}
              label="Three"
              value="Three"
            />
            <Radio
              changed={PhaseChangeHandler}
              isSelected={phase === "Four"}
              label="Four"
              value="Four"
            />
          </div>
          <h2>Category:</h2>
          <div className="radio-btn-container">
            <Radio
              changed={TeamChangeHandler}
              isSelected={team === "All"}
              label="All"
              value="All"
            />
            <Radio
              changed={TeamChangeHandler}
              isSelected={team === "solo"}
              label="Solo"
              value="solo"
            />
            <Radio
              changed={TeamChangeHandler}
              isSelected={team === "team"}
              label="Team"
              value="team"
            />
          </div>
        <h3>Total Minutes Watched: {watched.time}</h3>
        </div>
        <div className="movieItems">
          {filteredData.sort((a, b) => (a[sortVar] < b[sortVar]) ? 1 : -1).map((item, index) => (
            <MovieItem item={item} updateWatched={updateWatched} index={index} movies={watched.items}> </MovieItem>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

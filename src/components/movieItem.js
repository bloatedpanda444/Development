import React from "react";

export default function MovieItem(props) {
    return (
        <div className="movieItem">
            <div><img className="movie-pic" src={props.item.image} alt={props.item.title}></img></div>
            <div className="details">
                <div className="descr">
                    <h2>{props.item.title}</h2>
                    <h3>Phase: {props.item.phase}</h3>
                    <h3>Release Date: {props.item.release_date}</h3>
                    <h3>Total Gross: ${props.item.gross}</h3>
                    <h3>Runtime: {props.item.running_time} minutes</h3>
                    <button onClick={() => props.updateWatched(props.item.movie_id)}>{((props.movies.includes(props.item.title) ? "Remove from Watched" : "Add to Watched"))}</button>
                </div>
            </div>
        </div>
    )
}
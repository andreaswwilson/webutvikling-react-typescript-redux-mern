import React, { CSSProperties } from 'react';
import './MovieCard.scss';
import { Movie } from '../actions';
import { moviesReducer } from '../reducers/movies';

export const MovieCard = (movie: Movie): JSX.Element => {
  const backgroundCSS: CSSProperties = {
    backgroundImage: 'url(' + movie.Poster + ')',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  };

  return (
    <div className='movie_card' style={backgroundCSS}>
      <div className='info_section'>
        <div className='movie_header'>
          <img className='locandina' src={movie.Poster} alt={movie.Title} />
          <h1>{movie.Title}</h1>
          <h4>{movie.Year}</h4>
          {movie.Runtime !== 'N/A' && (
            <span className='minutes'>{movie.Runtime}</span>
          )}
          <p className='type'>{movie.Genre}</p>
        </div>
        <div className='movie_desc'>
          <p className='text'>{movie.Plot}</p>
        </div>
        <div className='movie_social'></div>
      </div>
      <div className='blur_back'></div>
    </div>
  );
};

// export const MovieCard = (movie: Movie): JSX.Element => {
//   const { Ratings } = movie;
//   return (
//     <div className='card movie_card'>
//       <img src={movie.Poster} alt={movie.Title} />
//       <div className='card-body'>
//         <h5 className='card-title'>{movie.Title}</h5>
//         <span className='movie_info'>{movie.Year}</span>
//         <span className='movie_info float-right'></span>
//       </div>
//     </div>
//   );
// };

//         <div class="card movie_card">
//   <img src="https://www.joblo.com/assets/images/joblo/posters/2019/02/Dyow9RgX4AElAGN.jpg" class="card-img-top" alt="...">
//   <div class="card-body">
//     <i class="fas fa-play play_button" data-toggle="tooltip" data-placement="bottom" title="Play Trailer">
//     </i>
//     <h5 class="card-title">Toy Story 4</h5>
//         <span class="movie_info">2019</span>
//         <span class="movie_info float-right"><i class="fas fa-star"></i> 9 / 10</span>
//   </div>
// </div>

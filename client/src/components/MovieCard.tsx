import React, { CSSProperties } from 'react';
import './MovieCard.scss';
import { Movie, toggleFavoriteMovie } from '../actions';

interface Props {
  movie: Movie;
  toggleFavoriteMovie: typeof toggleFavoriteMovie;
}

export const MovieCard: React.FC<Props> = ({
  movie,
  toggleFavoriteMovie: toggleFavoriteMovie,
}): JSX.Element => {
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
        <div className='movie_social'>
          <ul>
            <li onClick={() => toggleFavoriteMovie(movie._id)}>
              {movie.Favorite ? (
                <i className='fas fa-heart'></i>
              ) : (
                <i className='far fa-heart'></i>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className='blur_back'></div>
    </div>
  );
};

// const mapStateToProps = ({ movies }: StoreState): { movies: Movie[] } => {
//   return { movies };
// };

// export const MovieCard = connect(mapStateToProps, { deleteMovie })(_MovieCard);

import React, { useEffect } from 'react';
import { Movie, fetchMovies } from '../actions';
import { StoreState } from '../reducers';
import { connect } from 'react-redux';
import { Spinner } from 'reactstrap';
import { MovieCard } from './MovieCard';

interface Props {
  movies: Movie[];
  fetchMovies: Function;
}

export const _App: React.FC<Props> = ({ movies, fetchMovies }): JSX.Element => {
  useEffect(() => {
    fetchMovies();
  }, []);

  const renderMovies = () => {
    return movies.map((movie: Movie) => {
      return <MovieCard {...movie} key={movie._id} />;
      // return <div key={movie.Title}>{movie.Title}</div>;
    });
  };

  return (
    <div className='container'>
      <div className='row'>
        {movies.length === 0 && <Spinner color='primary' />}

        {renderMovies()}
      </div>
    </div>
  );
};

const mapStateToProps = ({ movies }: StoreState): { movies: Movie[] } => {
  return { movies };
};

export const App = connect(mapStateToProps, { fetchMovies })(_App);

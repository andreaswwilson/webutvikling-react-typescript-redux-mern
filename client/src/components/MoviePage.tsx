import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Movie, fetchMovies, getMovieByID } from '../actions';
import { StoreState } from '../reducers';

interface Props {
  movies: Movie[];
  fetchMovies: Function;
}

export const _MoviePage: React.FC<Props> = ({
  movies,
  fetchMovies,
}): JSX.Element => {
  const params = useParams() as { id: string };

  useEffect(() => {
    fetchMovies();
  }, [params.id]);
  const movie: Movie = movies.filter((m) => m._id === params.id)[0];
  console.log(movie);
  if (movie) {
    return <div>{movie.Title}</div>;
  }
  return <div>Movie not found</div>;
};

const mapStateToProps = ({ movies }: StoreState): { movies: Movie[] } => {
  return { movies };
};

export const MoviePage = connect(mapStateToProps, {
  fetchMovies,
})(_MoviePage);

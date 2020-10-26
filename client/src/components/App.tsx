import React, { useEffect } from 'react';
import {
  Movie,
  fetchMovies,
  toggleFavoriteMovie,
  updateMovie,
} from '../actions';
import { StoreState } from '../reducers';
import { connect } from 'react-redux';
import { Container, Spinner, Row, Col } from 'reactstrap';
import { MovieCard } from './MovieCard';
import './style.css';

interface Props {
  movies: Movie[];
  fetchMovies: Function;
  updateMovie: any; // todo
  toggleFavoriteMovie: typeof toggleFavoriteMovie;
}

export const _App: React.FC<Props> = ({
  movies,
  fetchMovies,
  toggleFavoriteMovie,
  updateMovie,
}): JSX.Element => {
  useEffect(() => {
    fetchMovies();
  }, []);

  const renderMovies = () => {
    return movies.map((movie: Movie) => {
      return (
        <MovieCard
          movie={movie}
          toggleFavoriteMovie={toggleFavoriteMovie}
          updateMovie={updateMovie}
          key={movie._id}
        />
      );
    });
  };

  return (
    <Container>
      <Row className='justify-content-md-center'>
        {movies.length === 0 && (
          <Col xs='1'>
            <Spinner color='primary' /> Loading
          </Col>
        )}
        {renderMovies()}
      </Row>
    </Container>
  );
};

const mapStateToProps = ({ movies }: StoreState): { movies: Movie[] } => {
  return { movies };
};

export const App = connect(mapStateToProps, {
  fetchMovies,
  updateMovie,
  toggleFavoriteMovie,
})(_App);

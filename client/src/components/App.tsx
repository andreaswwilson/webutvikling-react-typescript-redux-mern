import React, { useEffect } from 'react';
import { Movie, fetchMovies, toggleFavoriteMovie } from '../actions';
import { StoreState } from '../reducers';
import { connect } from 'react-redux';
import { Container, Spinner, Row, Col } from 'reactstrap';
import { MovieCard } from './MovieCard';
import Search from "./Search";
import './style.css';

interface Props {
  movies: Movie[];
  fetchMovies: Function;
  toggleFavoriteMovie: typeof toggleFavoriteMovie;
}

export const _App: React.FC<Props> = ({
  movies,
  fetchMovies,
  toggleFavoriteMovie,
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
          key={movie._id}
        />
      );
    });
  };

  return (
    <Container>
      <Search />
      {movies.length === 0 && (
        <Row className='justify-content-md-center'>
          <Col xs='1'>
            <Spinner color='primary' /> Loading
          </Col>
        </Row>
      )}
      <Row>{renderMovies()}</Row>
    </Container>
  );
};

const mapStateToProps = ({ movies }: StoreState): { movies: Movie[] } => {
  return { movies };
};

export const App = connect(mapStateToProps, {
  fetchMovies,
  toggleFavoriteMovie,
})(_App);

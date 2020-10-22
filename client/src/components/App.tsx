import React, { useEffect } from 'react';
import { Movie, fetchMovies } from '../actions';
import { StoreState } from '../reducers';
import { connect } from 'react-redux';
import { Container, Spinner, Row, Col } from 'reactstrap';
import { MovieCard } from './MovieCard';
import './style.css';

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
    <Container>
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

export const App = connect(mapStateToProps, { fetchMovies })(_App);

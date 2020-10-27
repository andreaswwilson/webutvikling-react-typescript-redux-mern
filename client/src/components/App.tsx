import React, { useEffect, useState } from 'react';
import {
  Movie,
  fetchMovies,
  toggleFavoriteMovie,
  updateMovie,
  Page,
  prevPage,
  nextPage,
  sortByYear,
} from '../actions';
import { StoreState } from '../reducers';
import { connect } from 'react-redux';
import {
  Container,
  Spinner,
  Row,
  Col,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { MovieCard } from './MovieCard';
import Search from './Search';
import './style.css';

interface Props {
  movies: Movie[];
  fetchMovies: Function;
  updateMovie: any;
  toggleFavoriteMovie: typeof toggleFavoriteMovie;
  page: Page;
  nextPage: typeof nextPage;
  prevPage: typeof prevPage;
  sortByYear: typeof sortByYear;
}

export const _App: React.FC<Props> = ({
  movies,
  fetchMovies,
  updateMovie,
  toggleFavoriteMovie,
  page,
  prevPage,
  nextPage,
  sortByYear,
}): JSX.Element => {
  useEffect(() => {
    fetchMovies();
  }, []);

  // Usestate for locally keep state for dropdown sort button
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

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
      <Dropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle caret>Sort</DropdownToggle>
        <DropdownMenu>
          <DropdownItem
            onClick={() => {
              sortByYear(true);
            }}
          >
            Sort by year ascending
          </DropdownItem>
          <DropdownItem
            onClick={() => {
              sortByYear(false);
            }}
          >
            Sort by year descending
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <Search />

      <Row className='justify-content-md-center'>
        {movies.length === 0 && (
          <Col xs='1'>
            <Spinner color='primary' /> Loading
          </Col>
        )}
        {renderMovies()}
      </Row>
      <button onClick={() => prevPage()}> prev </button>
      <p>Page: {page.page} </p>
      <button onClick={() => nextPage()}> next </button>
    </Container>
  );
};

const mapStateToProps = ({ movies, page }: StoreState) => {
  return { movies, page };
};

export const App = connect(mapStateToProps, {
  fetchMovies,
  updateMovie,
  nextPage,
  prevPage,
  toggleFavoriteMovie,
  sortByYear,
})(_App);

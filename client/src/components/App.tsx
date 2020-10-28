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
import { Pagination } from './Pagination';
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

  //states for keeping track of page number
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage, setMoviesPerPage] = useState(4);

  //calculate
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  //function for switching pageNumber
  const paginate = (pageNumber : number) => setCurrentPage(pageNumber);

  const renderMovies = () => {
    return currentMovies.map((movie: Movie) => {
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
      <div className="sort-dropdown">
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
      </div>
      <Search />

      <Row className='justify-content-md-center'>
        {movies.length === 0 && (
          <Col xs='1'>
            <Spinner color='primary' /> Loading
          </Col>
        )}
        {renderMovies()}
      </Row>
      <Pagination moviesPerPage={moviesPerPage} totalMovies={movies.length} paginate={paginate}/>
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

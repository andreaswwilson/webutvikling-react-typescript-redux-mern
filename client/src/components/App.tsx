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
  filterByCategory,
  MovieState,
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
  FormGroup,
  Label,
  Input,
  CustomInput,
} from 'reactstrap';
import { MovieCard } from './MovieCard';
import Search from './Search';
import './style.css';

interface Props {
  movieState: MovieState;
  fetchMovies: Function;
  updateMovie: any;
  toggleFavoriteMovie: typeof toggleFavoriteMovie;
  page: Page;
  nextPage: typeof nextPage;
  prevPage: typeof prevPage;
  sortByYear: typeof sortByYear;
  filterByCategory: typeof filterByCategory;
}

export const _App: React.FC<Props> = ({
  movieState,
  fetchMovies,
  updateMovie,
  toggleFavoriteMovie,
  page,
  prevPage,
  nextPage,
  sortByYear,
  filterByCategory,
}): JSX.Element => {
  useEffect(() => {
    fetchMovies();
  }, []);

  // Usestate for locally keep state for dropdown sort button
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  // Use state for locally keep state of checkbox
  const [checkBoxFilter, setCheckBoxFilter] = useState<string[]>([]);
  const toggleCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setCheckBoxFilter([...checkBoxFilter, event.target.id]);
    } else {
      fetchMovies();
      setCheckBoxFilter(
        checkBoxFilter.filter((item) => item != event.target.id),
      );
    }
  };
  useEffect(() => {
    filterByCategory(checkBoxFilter);
  }, [checkBoxFilter]);

  //states for keeping track of page number
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage, setMoviesPerPage] = useState(4);

  //calculate
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movieState.movies.slice(
    indexOfFirstMovie,
    indexOfLastMovie,
  );

  //function for switching pageNumber
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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
      <Search />
      <Row className='justify-content-md-center'>
        <Col className='mx-auto text-center'>
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
          <FormGroup>
            <Label for='exampleCheckbox'>Filter by category:</Label>
            <div>
              <CustomInput
                type='checkbox'
                id='Action'
                label='Action'
                inline
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  toggleCheckbox(event)
                }
              />
              <CustomInput
                type='checkbox'
                id='Comedy'
                label='Comedy'
                inline
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  toggleCheckbox(event)
                }
              />{' '}
              <CustomInput
                type='checkbox'
                id='Drama'
                label='Drama'
                inline
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  toggleCheckbox(event)
                }
              />
            </div>
          </FormGroup>
        </Col>
      </Row>
      <Row className='justify-content-md-center'>
        {movieState.isLoading && (
          <Col xs='1'>
            <Spinner color='primary' /> Loading
          </Col>
        )}
        {renderMovies()}
        {movieState.movies.length === 0 && !movieState.isLoading && (
          <h1>No movies found</h1>
        )}
      </Row>
      <Pagination
        moviesPerPage={moviesPerPage}
        totalMovies={movieState.movies.length}
        paginate={paginate}
      />
    </Container>
  );
};

const mapStateToProps = ({ movieState, page }: StoreState) => {
  return { movieState, page };
};

export const App = connect(mapStateToProps, {
  fetchMovies,
  updateMovie,
  nextPage,
  prevPage,
  toggleFavoriteMovie,
  sortByYear,
  filterByCategory,
})(_App);

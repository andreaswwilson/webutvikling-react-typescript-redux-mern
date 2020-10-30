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
  MovieState,
  updateQuery,
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
  updateQuery: typeof updateQuery;
  page: Page;
  nextPage: typeof nextPage;
  prevPage: typeof prevPage;
  sortByYear: typeof sortByYear;
}

export const _App: React.FC<Props> = ({
  movieState,
  fetchMovies,
  updateMovie,
  toggleFavoriteMovie,
  updateQuery,
}): JSX.Element => {
  useEffect(() => {
    fetchMovies(movieState.query);
  }, [movieState.query]);

  // Usestate for locally keep state for dropdown sort button
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  // Use state for locally keep state of checkbox
  const [checkBoxFilter, setCheckBoxFilter] = useState<string[]>([]);
  const toggleCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setCheckBoxFilter([...checkBoxFilter, event.target.id]);
    } else {
      setCheckBoxFilter(
        checkBoxFilter.filter((item) => item != event.target.id),
      );
    }
  };
  useEffect(() => {
    updateQuery({ genre: checkBoxFilter });
  }, [checkBoxFilter]);

  const renderMovies = () => {
    return movieState.movies.map((movie: Movie) => {
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
  console.log('App.txt: ', movieState.query);
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
                  updateQuery({ sortYear: 'ascending' });
                }}
              >
                Sort by year ascending
              </DropdownItem>
              <DropdownItem
                onClick={() => {
                  updateQuery({ sortYear: 'descending' });
                }}
              >
                Sort by year descending
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <FormGroup>
            <Label for='categoryCHeckbox'>Filter by category:</Label>
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
        moviesPerPage={movieState.query.limit || 4}
        totalMovies={movieState.totalCount}
        updateQuery={updateQuery}
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
  updateQuery,
})(_App);

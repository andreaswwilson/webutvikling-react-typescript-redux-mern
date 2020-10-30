import React, { useEffect, useState } from 'react';
import {
  Movie,
  fetchMovies,
  toggleFavoriteMovie,
  updateMovie,
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
  updateMovie: any; // Couldn figure out this type
  toggleFavoriteMovie: typeof toggleFavoriteMovie;
  updateQuery: typeof updateQuery;
}

export const _App: React.FC<Props> = ({
  movieState,
  fetchMovies,
  updateMovie,
  toggleFavoriteMovie,
  updateQuery,
}): JSX.Element => {
  // When ever the query is changed we request the movies from the database
  // with the updated query and set the state
  useEffect(() => {
    fetchMovies(movieState.query);
  }, [movieState.query]);

  console.log('APP moviestate: ', movieState.query.genre);
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

  // Update the query when checking a checkbox.

  useEffect(() => {
    updateQuery({ genre: checkBoxFilter });
  }, [checkBoxFilter]);

  // Function for looping through the movieState and rendering the movie cards
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

  return (
    <Container>
      <Search />
      <Row className='justify-content-md-center'>
        <Col className='mx-auto text-center'>
          {/* Dropdown menu for sorting by year */}
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

          {/* Checkboxes for filtering on category */}
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

      {/* Here we render the movie cards */}
      <Row className='justify-content-md-center'>
        {/* If we are loading movies add a spinner */}
        {movieState.isLoading && (
          <Col xs='1'>
            <Spinner color='primary' /> Loading
            <h1>Are you connect to NTNU network?</h1>
          </Col>
        )}
        {/* Render all the movies in the state */}
        {renderMovies()}
        {/* If we dont have any movies in state and we are not loading return
        a message of no movies found */}
        {movieState.movies.length === 0 && !movieState.isLoading && (
          <h1>No movies found</h1>
        )}
      </Row>
      {/* Handeling of Pagination */}
      <Pagination
        moviesPerPage={movieState.query.limit || 4} // set 4 as default
        totalMovies={movieState.totalCount}
        updateQuery={updateQuery}
        movieState={movieState}
      />
    </Container>
  );
};

// Map the state to props
const mapStateToProps = ({ movieState }: StoreState) => {
  return { movieState };
};

// Connect the state to the app
export const App = connect(mapStateToProps, {
  fetchMovies,
  updateMovie,
  toggleFavoriteMovie,
  updateQuery,
})(_App);

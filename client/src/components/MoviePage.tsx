// Rendering of a movie page
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleMovie, updateMovie } from '../actions/movies';
import { StoreState } from '../reducers';

export const MoviePage: React.FC = (): JSX.Element => {
  const params = useParams() as { id: string }; // get the parameter from react-dom-router
  const dispatch = useDispatch();
  const movie = useSelector((state: StoreState) => state.movieState.movie);
  // USing state locally just for forminput handeling
  const [formInput, setFormInput] = React.useState('');

  useEffect(() => {
    dispatch(fetchSingleMovie({ id: params.id }));
  }, [params.id]);
  const renderReviews = () => {
    if (movie) {
      const reviews = movie.Reviews || [];
      return reviews.map((review: string) => {
        return (
          <div className='Review' key={review}>
            {review}
          </div>
        );
      });
    }
  };

  if (movie) {
    return (
      <div className='MoviePage' key={movie._id}>
        <Container>
          <img src={movie.Poster} className='moviePoster' />

          <h1>{movie.Title}</h1>
          <br />
          <p>
            <b>Release date:</b> {movie.Released}
          </p>
          <p>
            <b>Director: </b>
            {movie.Director}
          </p>
          <p>
            <b>Writer: </b>
            {movie.Writer}
          </p>
          <p>
            <b>Runtime: </b>
            {movie.Runtime}
          </p>
          <p>
            <b>Actors: </b>
            {movie.Actors}
          </p>

          <h3>Plot</h3>

          <p>{movie.Plot}</p>

          <h2>Add review</h2>

          <Form
            onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              if (movie && movie.Reviews) {
                movie.Reviews.push(formInput);
              } else {
                if (movie) {
                  movie.Reviews = [formInput];
                }
              }

              if (formInput.length > 5 && movie) {
                dispatch(updateMovie(movie));
              }

              setFormInput('');
            }}
          >
            <FormGroup>
              <Label for='review'></Label>
              <Input
                type='textarea'
                name='review'
                id='review'
                value={formInput}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setFormInput(event.target.value);
                }}
              />
            </FormGroup>

            <Button>Submit</Button>
          </Form>
          <br />
          {movie.Reviews !== undefined && movie.Reviews.length > 0 && (
            <h2>All Reviews</h2>
          )}
          {renderReviews()}
        </Container>
      </div>
    );
  }
  return <div></div>;
};

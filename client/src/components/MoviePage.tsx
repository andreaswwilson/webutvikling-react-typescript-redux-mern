import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Button,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Spinner,
} from 'reactstrap';
import { Movie, fetchMovies, updateMovie } from '../actions';
import { StoreState } from '../reducers';

interface Props {
  movies: Movie[];
  fetchMovies: Function;
  updateMovie: Function;
}

export const _MoviePage: React.FC<Props> = ({
  movies,
  fetchMovies,
  updateMovie,
}): JSX.Element => {
  const params = useParams() as { id: string };
  // USing state locally just for forminput handeling
  const [formInput, setFormInput] = React.useState('');
  useEffect(() => {
    fetchMovies();
  }, [params.id]);
  const movie: Movie = movies.filter((m) => m._id === params.id)[0];

  const renderReviews = () => {
    const reviews = movie.Reviews || [];
    return reviews.map((review: string) => {
      return <div className="Review"> {review}</div>;
    });
  };

  if (movie) {
    return (
      <div className="MoviePage">
      <Container>
        <img src={movie.Poster} className="moviePoster"/>
 
        <h1>{movie.Title}</h1>
        <br/>
        <p><b>Release date:</b> {movie.Released}</p>
        <p><b>Director: </b>{movie.Director}</p>
        <p><b>Writer: </b>{movie.Writer}</p>
        <p><b>Runtime: </b>{movie.Runtime}</p>
        <p><b>Actors: </b>{movie.Actors}</p>
        <h3>Plot</h3>
        <p>{movie.Plot}</p>
        <h2>Add review</h2>
        <Form
          onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            if (movie.Reviews) {
              movie.Reviews.push(formInput);
            } else {
              movie.Reviews = [formInput];
            }
            console.log(movie);
            if (formInput.length > 5) {
              updateMovie(movie);
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
        <br/>
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

const mapStateToProps = ({ movies }: StoreState): { movies: Movie[] } => {
  return { movies };
};

export const MoviePage = connect(mapStateToProps, {
  fetchMovies,
  updateMovie,
})(_MoviePage);

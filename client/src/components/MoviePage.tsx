import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import { Movie, fetchMovies } from '../actions';
import { StoreState } from '../reducers';

interface Props {
  movies: Movie[];
  fetchMovies: Function;
}

export const _MoviePage: React.FC<Props> = ({
  movies,
  fetchMovies,
}): JSX.Element => {
  const params = useParams() as { id: string };
  // USing state locally just for forminput handeling
  const [formInput, setFormInput] = React.useState('');
  useEffect(() => {
    fetchMovies();
  }, [params.id]);
  const movie: Movie = movies.filter((m) => m._id === params.id)[0];
  if (movie) {
    return (
      <Container>
        <h1>{movie.Title}</h1>
        <h2>Actors</h2>
        <p>{movie.Actors}</p>
        <h2>Plot</h2>
        <p>{movie.Plot}</p>
        <h2>Add review</h2>
        <Form
          onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            setFormInput('');
          }}
        >
          <FormGroup>
            <Label for='review'>Review:</Label>
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
      </Container>
    );
  }
  return <div>Movie not found</div>;
};

const mapStateToProps = ({ movies }: StoreState): { movies: Movie[] } => {
  return { movies };
};

export const MoviePage = connect(mapStateToProps, {
  fetchMovies,
})(_MoviePage);

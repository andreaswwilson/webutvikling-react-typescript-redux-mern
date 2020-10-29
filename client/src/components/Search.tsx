import React, { FC, FormEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, FormGroup, Input, Container, Row } from 'reactstrap';

import { updateQuery } from '../actions/movies';

const Search: FC = () => {
  // Handle local state for search bar input
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateQuery({ title: search }));
  }, [search]);

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    //Prevents auto refresh when submitting the form
    e.preventDefault();
  };

  return (
    <Container>
      <Row>
        <Form className='search-form' onSubmit={submitHandler}>
          <FormGroup>
            <Input
              type='text'
              className='input has-text-centered'
              value={search}
              placeholder='Search for a movie'
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setSearch(event.target.value);
              }}
            ></Input>
          </FormGroup>
        </Form>
      </Row>
    </Container>
  );
};

export default Search;

import React, { FC, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import {  Form, Button, FormGroup, Input, Container, Row  } from 'reactstrap';

import { SearchMovie, fetchMovies } from '../actions/movies'


const Search: FC = () => {
    const [search, setSearch] = useState("");   
    const dispatch = useDispatch();

    const changeHandler = (e: FormEvent<HTMLInputElement>) => {
        //Saves the search value in search
        setSearch(e.currentTarget.value);
        //Dynamic search while typing in the title of the film
        dispatch(SearchMovie(search))
    
        if(e.currentTarget.value == '') {
            dispatch(fetchMovies())
        }
    }

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        //Prevents auto refresh when submitting the form
        e.preventDefault();
        dispatch(SearchMovie(search))
    }

    return (
        <Container>
            <Row>
                <Form className="search-form" onSubmit={submitHandler} >
                    <FormGroup>
                        <Input 
                            type="text" 
                            className="input has-text-centered" 
                            value={search} 
                            placeholder="Search for a movie" onChange={changeHandler}> 
                        </Input>
                    </FormGroup>            
                </Form>
            </Row>
        </Container>
    );
}

export default Search;
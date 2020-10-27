import React, { FC, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import {  Form, Button, FormGroup, Input  } from 'reactstrap';

import { SearchMovie} from '../actions/movies'


const Search: FC = () => {
    const [search, setSearch] = useState("");   
    const dispatch = useDispatch();

    const changeHandler = (e: FormEvent<HTMLInputElement>) => {
        console.log(e.currentTarget.value);
        setSearch(e.currentTarget.value);
    }

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        //Prevents auto refresh when submitting the form
        e.preventDefault();
        
        console.log(search)
        dispatch(SearchMovie(search))
    }

    return (
        <Form className="search-form" onSubmit={submitHandler} >
                <FormGroup>
                    <Input 
                        type="text" 
                        className="input has-text-centered" 
                        value={search} 
                        placeholder="Search for a movie" onChange={changeHandler}> 
                    </Input>
                    <Button> Search </Button>

                </FormGroup>            
            </Form>
    );
}

export default Search;
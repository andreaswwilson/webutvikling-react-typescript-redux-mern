import React from 'react';
import {  Form, Button, FormGroup, Label, Input  } from 'reactstrap'

function SearchBar() {
    return (
        <Form className="search-form">
            <FormGroup>
                <Input type="search" placeholder="Search for a movie"></Input>
            </FormGroup>            
        </Form>
    )
}

export default SearchBar;
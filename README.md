[![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod)](https://gitpod.idi.ntnu.no/#https://gitlab.stud.idi.ntnu.no/it2810-h20/team-32/project-3-it2810-group-32) 


# Project 3 - IT2810 Group 32

# Overview

This project consists of a server part and a client part

# Server

## REST API

The server side is implemented using typescript, mongoDB and express.
A REST api is setup with a base url of /api/movies and have the following
functions

### Get requests

1. /api/movies/<id> => return a single movie if the id exist, else an error.
2. /api/movies 
    If no options are added returns a json object with key totalCount and data-array
    where the movies objects are in the data-array
    Options can be added using regular syntax, ie /api/movies?title=Tenet&sortByYear=ascending
    Available options:
        title - filter title by partial match ignoring case
        year - filter year by partial match ignoring case
        sortByYear - can either be sortByYear=descending or ascending. Sorts by year
        genre - input as an array, ie ?genre[]=action&genre[]=drama - filter by all categories
        page - what page to show
        limit - how many results to return

### Put requests

1. /api/movies/<id> - creates a new movie object based on json data sendt and
   updates an existing movie. Used to write comments and favorite movies to db.

## GraphQL

We decided not to implement GraphQL after learning about both REST API and GraphQL
since REST API was easier to implement and gave us all the functionallity we needed
for this procject.

GraphQL would be better suited for a bigger project where we had a lot more data to fetch.
Using GraphQL we would be able to fetch certain parts of the stored data, while with
REST we need to fetch the entire document and choose what we want in the front-end.


# Client

The client is build on typescript, redux, bootstrap/reactstrap, react-router and axios.

## State management

State management is done by usage of both redux and react hooks.
Redux is used for handeling the state of movies and pagination. For movies the states that are handled are an array
of all movies we currently are showing the user.

For states limited to local files we have used react hooks to simplifiy the program and to avoid
passing states around that are not necassary to keep in a global store.

## Content and functionallity

1. Search - the user can filter based on a search done by title. The search is querying the backend and the backend
   returns the hits.
2. Presentation of movies with pagination to prepare for handeling of big result of data. This is done in the front end
   for us since.
3. By clicking on the movie more information of that movie is shown.
4. Sorting and filtering - the user can sort all the movies by year, ascending or descending. The user can filter by
   up to three Genres that are accumulative filtered.
5. User generated data that is save to the backend. If a movie is added as a favorite, this choice is saved in the
   database. The user can add reviews to every movie which are saved to the database.
6. Database is hosted on the virtual machine and loaded with 20 movies.

## Testing

# Git

We have used git active and making and have used the issues as a todo-list where we have assigned issues to ourself
and to team-members to keep control of what everyone is doing and what is missing. We have used branches as much as
possible to indicate what the code we have commited is related to. We have also made a link between the commits and
the issues by refering to the issue by #<number>.

# How to run on gitpod

In gitpod everthing should set up automatically. 
Client is running on localhost:3000 and server is running on localhost:5000

If you need to start the project again go to the root folder and run npm start

If an error saying "[nodemon] app crashed - waiting for file changes before starting", try starting it again by running npm start


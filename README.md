[![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod)](https://gitpod.idi.ntnu.no/#https://gitlab.stud.idi.ntnu.no/it2810-h20/team-32/project-3-it2810-group-32) 


# Project 3 - IT2810 Group 32

# Overview

This project consists of a server part and a client part



# Client

The client is build on typescript, redux, bootstrap/reactstrap, react-router and axios.

## State management

State management is done by usage of both redux and react hooks.
Redux is used for handeling the state of movies and pagination. For movies the states that are handled are an array
of all movies we currently are showing the user, one movie object for rendering a movie page, isLoading, the 
current query based on an accumulation of serach, filter and sort and the total count of hits from the api for the current query.

For states limited to local files we have used react hooks to simplifiy the program and to avoid
passing states around that are not necassary to keep in a global store.

## Content and functionality

1. Search - the user can do a search on movie titles. The search will query the backend via the API and the backend
   returns the matches.
2. Presentation of movies with pagination to prepare for handling of a large dataset and increase readability for the user. 
   This is also done by using the API and the back-end. 
3. By clicking on a movie more information of that movie is shown. This is done by querying for the specific movie ID in the database via the API.
4. Sorting and filtering - the user can sort all the movies by year, ascending or descending. The user can filter by
   up to three Genres that are accumulative filtered. All this should work in combination with search as well. 
   Like the other 
5. User generated data that is saved to the backend. If a movie is added as a favorite, this choice is saved in the
   database (Clicking the little heart symbol on the front page will turn it red and save it as a favorite). 
   The user can add also reviews to every movie which are saved to the database. There is no user-specific functionality 
   in place so all reviews are anonymous.
6. Database is hosted on the virtual machine using MongoDB and contains a total of 20 movies.


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


## Testing

For automatic end-2-end testing, we have used the cypress (https://www.cypress.io/) library 
and made 5 tests that test different functionalities and navigations in the app. 

We wanted to use the cypress framework cypress-react-unit-test to make unit tests, but we could not make it work as several errors was generated during this. 
We then tried other alternatives such as ensyme and jest, but it was hard making it work with redux. The different tests we have made with cypress, 
in our opinion, can be regarded as unit tests since they test do test the functionality of the app. An example would be that the last test successfully enters a review on the movie "Schindler's list"

However, we tried implementing a jest test so that we did include an unit test, but this is a very simple one.

**RUN CYPRESS TEST**
1. Open new terminal in client
2. Type in npm run e2e

If the above don't work:

1. Clone the repo
2. Open a terminal in client
3. Type in npm run e2e

For some reason GitPod and Cypress don't work well together. The second solution will work, but requires a bit more work. 
Here is a screenshot taken 30.10.2020 14:16:38, to prove that it works when running it locally if you don't want to clone the repo:

![Cypress test](https://gitlab.stud.idi.ntnu.no/it2810-h20/team-32/project-3-it2810-group-32/-/blob/master/Images/Cypress-test.png)

The fifth test that checks if a user is able to add a review to a movie will add a new review every time the test is run. 
It is easy to remove these reviews after being implemented by running the mongodb query "cy.exec('db.movies.update( {Reviews: "This is a test"}, {$unset: {Reviews: ""}})')", 
but did not manage to implement this when running the test in cypress. Another work-around for deleting an review after each testrun is to add a button to a review 
which can take a movie-object, remove a comment/review and send it to an existing function called "updateMovie". We did not want to implement this last option
because we did not want a user to be able to delete another users review. Since we did not implement authorization for this kind of functionality, the result was
to just have every test add the same review every time it runs.

# Git

We have used git actively and have used issues as a todo-list where we have assigned issues to ourselves
and to team-members. This is to keep control of what everyone is doing and what is missing. We have used branches to ensure that the code which is implemented
is thoroughly tested and working, before merging it to the master branch. By doing this the latest version (the master branch) will always function. 
We have also made a link between the commits and the issues by refering to the issue by #<number>. In hindsight we realised that we could have used issues more frequently
and for smaller things that needed fixing, but it still worked well for our use case.


# How to run on gitpod

In gitpod everthing should set up automatically - we have testet it multiple times but it takes a couple of mimutes to build so 
have some pation. If you need to start the project again go to the root folder and run npm start

Client is running on localhost:3000 and server is running on localhost:5000

## If gitpod doesnt fix automatically
Open two terminals
1. In terminal 1:
    cd server -> npm install -> npm start
2. In terminal 2:
    cd client -> npm install -> npm start

If an error saying "[nodemon] app crashed - waiting for file changes before starting", try starting it again by running npm start


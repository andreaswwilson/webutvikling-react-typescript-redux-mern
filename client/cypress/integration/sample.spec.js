/// <reference types="cypress" />

import Chance from 'chance';
const chance = new Chance;

describe('NTNU moviesDB', () => {
    
    it('Check if its possible to click a film', () => {
        cy.visit('http://localhost:3000')
        cy.get(':nth-child(1) > a > .movie_card > .info_section').click()
        cy.contains('Tenet')
        cy.contains('Christopher Nolan')
    })

    it('Test to see if navigation is working properly', () => {
        cy
        .visit('http://localhost:3000/movie/5f86f3892d6c011affbcf178')
        .contains('Tenet')

        cy.contains('Plot')
        cy.contains('Add review')

        cy.get('.text-white').click()
        cy.get(':nth-child(1) > a > .movie_card > .info_section').click()
        cy.get('.text-white').click()

        cy.get(':nth-child(4) > .page-link').click()
        cy.get('.movie_card').should('have.length', 4)

        cy.get(':nth-child(1) > a > .movie_card > .info_section')
        cy.contains('The Wolf of Wall Street')

        
    })

    it('Check if there is 4 movies at each page', () => {
        cy.visit('http://localhost:3000/')
        cy.get('.movie_card').should('have.length', 4)

        cy.get(':nth-child(2) > .page-link').click()
        cy.get('.movie_card').should('have.length', 4)

        cy.get(':nth-child(3) > .page-link').click()
        cy.get('.movie_card').should('have.length', 4)

        cy.get(':nth-child(4) > .page-link').click()
        cy.get('.movie_card').should('have.length', 4)

        cy.get(':nth-child(5) > .page-link').click()
        cy.get('.movie_card').should('have.length', 4)
       
    })

    it('Search for movie: Mulan', () => {
        cy.visit('http://localhost:3000')
        cy.get('.search-form').find('.input').type('Mulan').should('have.length', 1)
        cy.get('.search-form').find('.input').clear()
        cy.get('.movie_card').should('have.length', 4)
    })

    it('Add a review for the film "Schindlers list"', () => {
        cy.visit('http://localhost:3000/movie/5f86fd142d6c011affbcf18b')
        cy.get('.form-group').find('[name="review"]').type('Add review with cypress')
        cy.get('.btn').click()

        //cy.exec('db.movies.update( {Reviews: "This is a test"}, {$unset: {Reviews: ""}})')
    })

} 

)

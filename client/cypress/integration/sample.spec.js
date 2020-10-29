/// <reference types="cypress" />

import Chance from 'chance';
const chance = new Chance;

describe('NTNU moviesDB', () => {
 
    it('click tenet', () => {
        cy.visit('http://localhost:3000')
        cy.get(':nth-child(1) > a > .movie_card > .info_section').click()

    })

    it('navigation', () => {
        cy
        .visit('http://localhost:3000/movie/5f86f3892d6c011affbcf178')
        .contains('Tenet')

        cy.contains('Plot')
        cy.contains('Add review')

        cy.get('.text-white').click()
        cy.get(':nth-child(1) > a > .movie_card > .info_section').click()

        /*cy.get('.form-group').find('[name="review"]').type('This is a test')
        cy.get('.btn').click()

        cy.get(':nth-child(18)').contains('This is a test')*/
    })

    it('Check if there is 20 movies in the array', () => {
        cy.visit('http://localhost:3000/')
        cy.get('.movie_card').should('have.length', 20)
    })

    it('Search for movie: Mulan', () => {
        cy.visit('http://localhost:3000')
        cy.get('.search-form').find('.input').type('Mulan').should('have.length', 1)
        cy.get('.search-form').find('.input').clear()
        cy.get('.movie_card').should('have.length', 20)
    })

} 

)

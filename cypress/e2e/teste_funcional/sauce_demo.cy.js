/// <reference types="cypress" />

describe('Teste funcional no site saucedemo.com', () => {

  it('Deve realizar login com sucesso', () => {
    cy.visit('https://www.saucedemo.com/')

    cy.get('[data-test="username"]').invoke('attr', 'type').should('eq', 'text')
    cy.get('[data-test="username"]').type('standard_user')

    cy.get('[data-test="password"]').invoke('attr', 'type').should('eq', 'password')
    cy.get('[data-test="password"]').type('secret_sauce')

    cy.get('[data-test="login-button"]').should('have.value', 'Login')
    cy.get('[data-test="login-button"]').click()

    cy.get('.title').should('have.text', 'Products')
  })
})
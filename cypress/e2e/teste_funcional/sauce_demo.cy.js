/// <reference types="cypress" />

import rgbHex from 'rgb-hex'

describe('Teste funcional no site saucedemo.com', () => {

  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/')
  })

  const msgError = 'Epic sadface: Username and password do not match any user in this service'
  
  it('Deve realizar login com sucesso', () => {
    cy.get('[data-test="username"]').invoke('attr', 'type').should('eq', 'text')
    cy.get('[data-test="username"]').type('standard_user')

    cy.get('[data-test="password"]').invoke('attr', 'type').should('eq', 'password')
    cy.get('[data-test="password"]').type('secret_sauce')

    cy.get('[data-test="login-button"]').should('have.value', 'Login').click()

    cy.get('.title').should('have.text', 'Products')
  })

  it('Deve exibir mensagem de erro ao realizar login com USUÁRIO INVÁLIDO', () => {
    cy.get('[data-test="username"]').should('be.visible').type('marco_user')
    cy.get('[data-test="password"]').should('be.visible').type('secret_sauce')

    cy.get('[data-test="login-button"]').click()

    cy.get('[data-test="error"]').should('be.visible').contains(msgError)
  })

  it('Deve exibir mensagem de erro ao realizar login com SENHA INVÁLIDA', () => {
    cy.get('[data-test="username"]').should('be.visible').type('standard_user')
    cy.get('[data-test="password"]').should('be.visible').type('12345')

    cy.get('[data-test="login-button"]').should('be.visible').click()

    cy.get('[data-test="error"]').contains(msgError)
  })

  it('Deve adicionar produtos ao carrinho', () => {
    cy.get('[data-test="username"]').should('be.visible').type('standard_user')
    cy.get('[data-test="password"]').should('be.visible').type('secret_sauce')

    cy.get('[data-test="login-button"]').click()

    cy.get('.title').should('have.text', 'Products')

    cy.get('[data-test="add-to-cart-sauce-labs-onesie"]').scrollIntoView({ duration: 1000 }).click()
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').scrollIntoView({ duration: 1000 }).click()
    cy.get('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').scrollIntoView({ duration: 1000 }).click()

    cy.get('.shopping_cart_badge').scrollIntoView({ duration: 1000 }).contains(3)

    cy.get('.shopping_cart_link').click()

    cy.get('.title').should('have.text', 'Your Cart')

    cy.get('.cart_item_label').should('have.length', 3)
  })

  it('Deve realizar uma compra com sucesso', () => {
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')

    cy.get('[data-test="login-button"]').click()

    cy.get('.title').should('have.text', 'Products')

    cy.get('[data-test="add-to-cart-sauce-labs-onesie"]').scrollIntoView({ duration: 1000 }).click()
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').scrollIntoView({ duration: 1000 }).click()
    cy.get('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').scrollIntoView({ duration: 1000 }).click()

    cy.get('.shopping_cart_badge').scrollIntoView({ duration: 1000 }).contains(3)

    cy.get('.shopping_cart_link').click()

    cy.get('.title').should('have.text', 'Your Cart')

    cy.get('.cart_item_label').should('have.length', 3)

    cy.get('[data-test="checkout"]').click()

    cy.get('[data-test="firstName"]').type('Marco')
    cy.get('[data-test="lastName"]').type('Silva')
    cy.get('[data-test="postalCode"]').type('02344-010')

    cy.get('[data-test="continue"]').click()

    cy.get('.title').scrollIntoView({ duration: 1000 }).should('have.text', 'Checkout: Overview')

    cy.get('.summary_info').scrollIntoView({ duration: 1000 })

    cy.get('[data-test="finish"]').click()

    cy.get('.complete-header').scrollIntoView({ duration: 1000 }).should('have.text', 'THANK YOU FOR YOUR ORDER')
  })

  it('[EXTRA] Validando a cor e a fonte do botão de "Login"', () => {
    cy.get('[data-test="login-button"]').invoke('css', 'background-color')
      .then((bgcolor) => {
        expect(rgbHex(bgcolor)).to.eq('e2231a')
      })

    cy.get('[data-test="login-button"]').should('have.css', 'font-family')
      .should('eq', 'Roboto, Arial, Helvetica, sans-serif')
  })
})
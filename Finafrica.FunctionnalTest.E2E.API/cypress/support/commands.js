// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import '@icokie/cypress-webhooksite'

Cypress.Commands.add('loginByApi', (emailUser, passwordUser) => {
    return cy.request({
      method: 'post',
      url: 'https://luca-dev2.spvie.com/api/Account/Login', // baseUrl is prepend to URL
      body: {
        Email: emailUser,
        Password: passwordUser,
      },
      headers: {
        accept: 'application/json',
      },
      failOnStatusCode: false,
    });
  });
  
  //Commande personnaliser pour récupérer les informations pour certaines APIs restant ce format
  Cypress.Commands.add('getApiAdmin', (urlApi, token) => {
    return cy.request({
      url: urlApi, // baseUrl is prepend to URL
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Host: 'gestion-sinistre.suntelecoms.com',
        Origin: 'https://gestion-sinistre.suntelecoms.com',
        Referer: 'https://gestion-sinistre.suntelecoms.com/',
      },
      failOnStatusCode: false,
      timeout: 300000
    });
  });
  
  Cypress.Commands.add('postApiAdmin', (urlApi, token, data) => {
    return cy.request({
      url: urlApi, // baseUrl is prepend to URL
      method: 'post',
      headers: {
        Accept: 'application/json',
        Host: 'gestion-sinistre.suntelecoms.com',
        Origin: 'https://gestion-sinistre.suntelecoms.com',
        Referer: 'https://gestion-sinistre.suntelecoms.com/',
      },
      body: data,
      failOnStatusCode: false,
      timeout: 300000
    });
  });
  

   //Commande personnaliser pour récupérer les informations pour certaines APIs restant ce format
   Cypress.Commands.add('getApiClient', (urlApi) => {
    return cy.request({
      url: urlApi, // baseUrl is prepend to URL
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Host: 'gestion-sinistre.suntelecoms.com',
        Origin: 'https://gestion-sinistre.suntelecoms.com',
        Referer: 'https://gestion-sinistre.suntelecoms.com/',
      },
      failOnStatusCode: false,
      timeout: 300000
    });
  });
  
  Cypress.Commands.add('postApiClient', (urlApi, data) => {
    return cy.request({
      url: urlApi, // baseUrl is prepend to URL
      method: 'post',
      headers: {
        Accept: 'application/json',
        Host: 'gestion-sinistre.suntelecoms.com',
        Origin: 'https://gestion-sinistre.suntelecoms.com',
        Referer: 'https://gestion-sinistre.suntelecoms.com/',
      },
      body: data,
      failOnStatusCode: false,
      timeout: 300000
    });
  });
import ConnectionData from "../../cypress/fixtures/ConnectionData.json";
describe('template spec', () => {
  let identifant = ConnectionData 
  it('passes', () => {
    cy.visit('http://bo-gestion-sinistre.suntelecoms.com/')
    cy.contains("Nom d'utilisateur")
      .parent()
      .parent()
      .find("input", { force: true }).type(identifant.AdminName, { force: true });
      cy.contains("Mot de passe")
      .parent()
      .parent()
      .find("input", { force: true }).type(identifant.AdminPassword, { force: true });
      cy.get('.fuse-mat-button-large').contains('Connexion').click( { force: true });
      cy.wait(6000)
      cy.get('.ng-tns-c58-9').contains("Sinistre").click( { force: true });
      cy.contains("Suivie Sinistre").click( { force: true });
     cy.log(identifant.AdminName)
  })
})
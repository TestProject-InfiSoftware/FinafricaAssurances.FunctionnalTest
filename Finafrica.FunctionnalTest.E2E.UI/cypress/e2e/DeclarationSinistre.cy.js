/// <reference types="cypress" />
import { faker } from "@faker-js/faker";
import RegistrationNumber from "../fixtures/RegistrationNumber.json";
import Helper from "../../cypress/support/Helper";
import ConnectionData from "../fixtures/ConnectionData.json";
describe("Declaration d'un sinistre", () => {
  // let choice = faker.helpers.arrayElement(["Non", "Oui"]);
  let choice = "Non";
  let firstName = faker.person.firstName();
  let lastName = faker.person.lastName();
  let password = faker.name.firstName() + "@" + faker.datatype.number({ min: 100, max: 999 });
  const phone = faker.phone.number("33#######");
  let identifant = ConnectionData 
  const registrationNumber = faker.helpers.arrayElement(
    RegistrationNumber.registrationNumbers
  );

  it("Creation du  compte utilisateur", () => {
    cy.visit("https://gestion-sinistre.suntelecoms.com/#/home");
    cy.contains("DÉCLARER UN SINISTRE").click({ force: true });
    cy.contains(choice).click({ force: true });
    choice = "Non";
    if (choice === "Non") {
      cy.contains("Créer un compte").should("be.visible");
      cy.contains("Nom ")
        .parent()
        .parent()
        .find("input", { force: true })
        .type(firstName, { force: true });
      cy.contains("Prénom ")
        .parent()
        .parent()
        .find("input", { force: true })
        .type(lastName, { force: true });
      cy.contains("Email ")
        .parent()
        .parent()
        .find("input", { force: true })
        .type("functional-tests+5@assurware.com", { force: true });
      cy.contains("Numéro téléphone ")
        .parent()
        .parent()
        .find("input", { force: true })
        .type(phone, { force: true });
      cy.get('select[formcontrolname="carIdType"]').select(
        "Numéro d'immatriculation"
      );
      cy.get('input[formcontrolname="carId"]').type(registrationNumber);
      cy.contains("S’INSCRIRE").click({ force: true });
      let operationDate;
      cy.wait(1000);
      cy.contains("Valider").click({ force: true });
      operationDate = new Date();
      let codeValidation = "";
      const TEST_CURRENT_USER = Helper.formatConnectionData(ConnectionData);
      const codeDataObject = {
        username: TEST_CURRENT_USER.NO_VAD_USER.EmailForSignature,
        password: TEST_CURRENT_USER.NO_VAD_USER.EmailPasswordForSignature,
        receivedDateTime: operationDate.toISOString(),
        subject: "FINAFRICA ASSURANCE - Code de Création Compte ",
      };
      cy.wait(5000);
      cy.task("getEMailContentTASK", codeDataObject).then((OutPut) => {
        const $SignerMesDocuments = Cypress.$(OutPut.body.content).find("b");
        expect($SignerMesDocuments).not.to.null;
        codeValidation = $SignerMesDocuments[1].innerText;
        console.log(codeValidation.replace(" ", ""));
        cy.get("code-input > :nth-child(1) > input").type(
          codeValidation.charAt(0)
        );
        cy.get(":nth-child(2) > input").type(codeValidation.charAt(1));
        cy.get(":nth-child(3) > input").type(codeValidation.charAt(2));
        cy.get(":nth-child(4) > input").type(codeValidation.charAt(3));
        cy.contains("Nouveau mot de passe ")
          .parent()
          .parent()
          .find("input", { force: true })
          .type(password, { force: true });
        cy.contains("confirmation mot de passe ")
          .parent()
          .parent()
          .find("input", { force: true })
          .type(password, { force: true });
        cy.contains("Valider").click({ force: true });
        cy.wait(3000);
        cy.contains("OK").click({ force: true });
      });
    } else {
      cy.contains("Connexion à votre compte").should("be.visible");
    }
  });
  it.only("Validation du compte utilisateur" , ()=>{
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
});

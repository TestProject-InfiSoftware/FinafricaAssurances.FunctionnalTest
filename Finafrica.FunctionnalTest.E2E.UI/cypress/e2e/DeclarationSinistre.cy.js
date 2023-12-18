/// <reference types="cypress" />
import { faker } from "@faker-js/faker";

describe("Declaration d'un sinistre", () => {
  // let choice = faker.helpers.arrayElement(["Non", "Oui"]);
  let choice = "Non";
  let firstName = faker.person.firstName();
  let lastName = faker.person.lastName();
  const email = faker.internet.email({ provider: 'gmail.com' });
  const registrationNumber = faker.helpers.arrayElement([
    "AA 046 EYA",
    "AA 969 AD",
    "AA 221 BM",
    "AA 577 AQ",
    "AA 761 BN",
    "DK 9524 AS",
    "AA-546-GJ",
  ]);
  // let phoneNumber2 = faker.string.numeric("30#######");
  const phoneNumber = faker.helpers.arrayElement([
    "771234567",
    "781234567",
    "701234567",
    "761234567",
    "331234567",
    "772345678",
    "782345678",
    "702345678",
    "762345678",
    "332345678"
  ]);
  it("Creation compte utilisateur", () => {
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
        .type(email, { force: true });
      cy.contains("Numéro téléphone ")
        .parent()
        .parent()
        .find("input", { force: true })
        .type(phoneNumber, { force: true });
      // cy.contains("Méthode d'identification ")
      // .click({force : true})
      cy.get('select[formcontrolname="carIdType"]').select(
        "Numéro d'immatriculation"
      );
      cy.get('input[formcontrolname="carId"]').type(registrationNumber);
      cy.contains("S’INSCRIRE").click({ force: true });
      cy.wait(1000);
      cy.contains("Valider").click({ force: true });
      
    } else {
      cy.contains("Connexion à votre compte").should("be.visible");
    }
  });

  // it.only('should create a new email address', () => {
  //   // cy.createInbox().then((inbox) => {
  //   //   console.log(inbox);
  //   //   // { id: '...', emailAddress: '...' }
  //   // });
  // });
});

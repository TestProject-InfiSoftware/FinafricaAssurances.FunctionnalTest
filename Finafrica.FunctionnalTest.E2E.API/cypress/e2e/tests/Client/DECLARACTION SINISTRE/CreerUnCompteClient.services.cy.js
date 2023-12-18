/// <reference types="cypress" />
import { faker } from "@faker-js/faker";
import registration from "../../../../fixtures/registrationNumber.json";

describe("Test API: Création de compte client", () => {
	const registrationNumber = faker.helpers.arrayElement(
		registration.registration
	);
	const identificationMethod = faker.helpers.arrayElement([
		"Numéro d'immatriculation",
		// "Numéro de chassis",
		// "Numéro de police",
	]);
	let payloadCustomerAccount = {
		givenName: faker.person.firstName,
		surname: faker.person.lastName.touppcase(),
		displayName: `${
			faker.person.firstName
		} ${faker.person.lastName.touppcase()}`,
		mailNickname: "337077765",
		countryCode: "221",
		mobilePhone: "337077765",
		mail: "mozart.developer99@gmail.com",
		carId: "KL 8634 B",
		duedate: new Date(),
		date: new Date(),
		carIdType: "0",
	};
	switch (identificationMethod) {
		case "Numéro d'immatriculation":
			payloadCustomerAccount.carId = "0";
			payloadCustomerAccount.carId = registrationNumber;
			break;
		case "Numéro de chassis":
			payloadCustomerAccount.carId = "1";
			break;
		default:
			payloadCustomerAccount.carId = "2";
			break;
	}
	it("TC1: API de vérification de l'existence d'un e-mail", () => {
		const email = faker.internet.email({
			firstName: payloadCustomerAccount.givenName,
			lastName: payloadCustomerAccount.surname,
		});
		cy.request({
			url: `https://gestion-sinistre.suntelecoms.com/v1/User/checkExistanceEmail?email=${email}.`, // baseUrl is prepend to URL
			method: "GET",
			headers: {
				Accept: "application/json",
				Referer: "https://gestion-sinistre.suntelecoms.com/",
			},
			failOnStatusCode: false,
			timeout: 300000,
		}).then((response) => {
			if (response.status === 200) {
				payloadCustomerAccount.mail = email;
				expect(response.status).to.eq(200);
			}
			expect(response.status).to.eq(200);
		});
	});

	it("TC2: API de vérification de l'existence d'un numéro de tel", () => {
		const phone = faker.phone.number("33#######");
		cy.request({
			url: `https://gestion-sinistre.suntelecoms.com/v1/User/${phone}.`, // baseUrl is prepend to URL
			method: "GET",
			headers: {
				Accept: "application/json",
				Referer: "https://gestion-sinistre.suntelecoms.com/",
			},
			failOnStatusCode: false,
			timeout: 300000,
		}).then((response) => {
			if (response.status === 200) {
				payloadCustomerAccount.mobilePhone = phone;
				payloadCustomerAccount.mailNickname = phone;
				expect(response.status).to.eq(200);
			}
			expect(response.status).to.eq(200);
		});
	});
});

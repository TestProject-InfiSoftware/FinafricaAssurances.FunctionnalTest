// const { MailSlurp } = require('mailslurp-client');
// const apiKey = Cypress.env('9a34bc1b464edce82fbef0f27f8f831dbb1f3693671194352cccf5d7171e8170');
// const mailslurp = new MailSlurp({ apiKey });
// Cypress.Commands.add("createInbox", () => {
//     return mailslurp.createInbox();
//   });

//   Cypress.Commands.add("waitForLatestEmail", (inboxId) => {
//     // how long we should hold connection waiting for an email to arrive
//     const timeoutMillis = 30_000;
//     return mailslurp.waitForLatestEmail(inboxId, timeoutMillis)
//   })
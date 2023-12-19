const { defineConfig } = require("cypress");
const axios = require('axios')
const PublicClientApplication = require('@azure/msal-node').PublicClientApplication;
const fs = require('get-file-object-from-local-path');
// fonctions de recupertaion du lien de signature et code SMS par mail

const msalConfig = {
  auth: {
    clientId: '66029fce-f4a5-4466-b3b7-a3195a549a07',
    authority: 'https://login.microsoftonline.com/spvie.onmicrosoft.com'
  }
}

const pca = new PublicClientApplication(msalConfig)

const callAPIFunction = async (data) => {
  const output = [];
  // Requête avec authentification héritée du parent
  if (data) {
    for (const apiData of data) {
      try {
        let response = {};
        switch (apiData.method) {
        case 'post':
          response = await axios.post(apiData.url, apiData.body, {headers: apiData.headers});
          break;
        case 'get':
          response = await axios.get(apiData.url, {headers: apiData.headers});
          break;
        case 'put':
          response = await axios.put(apiData.url, apiData.body, {headers: apiData.headers});
          break;
        }
        output.push({data: response.data, serviceCode: apiData.type});
      } catch (e) {
        console.log(e);
      }
    }
  }
  return output;
};

function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
const getSignatureCodeFromMail = async (data) => {
  const usernamePasswordRequest = {
    scopes: ['user.read', 'mail.read'],
    username: data.username, // Add your username here
    password: data.password // Add your password here
  }
  let OutPut = {}
  try {
    let goOut = 0

    // Get access token
    const response = await pca.acquireTokenByUsernamePassword(usernamePasswordRequest)
    const accessToken = response?.accessToken
    const messagesUri = 'https://graph.microsoft.com/v1.0/me/messages?$filter=ReceivedDateTime ge ' + data.receivedDateTime
    let finded = false
    while (goOut < 5 && !finded) {
      // Get messages
      const body = await axios.get(messagesUri, {
        headers: { Authorization: `Bearer ${accessToken}` }
      })
      let emails = body.data.value
      console.log(data.subject)
      emails = emails.filter((email) => email.subject.indexOf(data.subject) >= 0)
      console.log(emails[0])
      if (emails.length) {
        finded = true
        OutPut = emails[emails.length - 1]
      } else {
        goOut++
        await sleep(10000)
      }
    }

    return OutPut
  } catch (error) {
    OutPut = { successStatus: false, data: JSON.stringify(error) }
    console.log(`not finded :${OutPut}`)
    return OutPut
  }
}
const getEMailContent = async (data) => {
  const usernamePasswordRequest = {
    scopes: ['user.read', 'mail.read'],
    username: data.username, // Add your username here
    password: data.password, // Add your password here
  };
  let OutPut = {};
  try {
    let goOut = 0;

    // Get access token
    const response = await pca.acquireTokenByUsernamePassword(usernamePasswordRequest);
    const accessToken = response?.accessToken;
    const messagesUri = `https://graph.microsoft.com/v1.0/me/messages?$filter=ReceivedDateTime ge ${data.receivedDateTime}&$orderby=receivedDateTime DESC`;
    let finded = false;
    while (goOut < 5 && !finded) {
      // Get messages
      const body = await axios.get(messagesUri, {
        headers: { 'Authorization': `Bearer ${accessToken}` },
      });
      console.log(data.receivedDateTime);
      let emails = body.data.value;
      console.log(data.subject);
      console.log(emails[0]);
      emails = emails.filter((email) => email.subject.indexOf(data.subject) >= 0);
      if (emails.length) {
        finded = true;
        OutPut = emails[emails.length - 1];
      } else {
        goOut++;
        await sleep(10000);
      }
    }
    return OutPut;

  } catch (error) {
    OutPut = {successStatus: false, data: JSON.stringify(error)};
    console.log(`not finded :${OutPut}`);
    return OutPut;
  }
};
const uploadFile = async (data) => {
  // Read image from disk as a Buffer
  const file = new fs.LocalFileData(data.fileUrl);
  const fileName = file.name;
  // Create a form and append image with additional fields
  const form = {fileName: file};
  console.log("testData", file);
  // Send form data with axios
  const response = null;
 try{
    return await axios.post(data.url, form, {
      headers: data.headers
    });
  }catch(e){
    console.log(JSON.stringify(e));
  }
  return file;
}
module.exports = defineConfig({
  e2e: {
    video: false,
    baseUrl: "https://gestion-sinistre.suntelecoms.com",
    reporter: 'mocha-junit-reporter',
    reporterOptions: {
      mochaFile: 'cypress/reports/junit/test-results.[hash].xml',
      attachments: true,
      toConsole: true,
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        getEMailContentTASK (data) {
          return getEMailContent(data)
        },
        checkEMailData (data) {
          return getSignatureCodeFromMail(data)
        },
        uploadFileTASK (data) {
          return uploadFile(data)
        },
        callPERINExternalAPI (data) {
          console.log('Call PERIN External API');
          return callAPIFunction(data);
        }        
      })
    },
  },
});

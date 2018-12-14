'use strict';

const AWS = require('aws-sdk'); 
const request = require('request');

module.exports.randomGenerator = (event, context, callback) => {  
  
  //create a random number between 0-100
  let rand = Math.floor(Math.random() * 101);   

  let apiAccessToken = event.context.System.apiAccessToken;
  let apiEndpoint = event.context.System.apiEndpoint;  

  let skillUserEmail = '';
  let emailHeadersOpt = {};
  let emailUrl= apiEndpoint + "/v2/accounts/~current/settings/Profile.email";
  emailHeadersOpt = {  
    "Authorization": "Bearer " +apiAccessToken                                
  };
  request(
    {
      method: 'get',
      url: emailUrl,
      headers: emailHeadersOpt
    }, function(error, resp, body){     
    if (resp.statusCode == 200) {  //permissions for email already approved by user   
      skillUserEmail = body;          
      const response = {
        version: '1.0',
        response: {
          card: {
              type: 'Simple',
              title: `Random Number Generator!`,
              content: `Your email is ${skillUserEmail}.  Your random number is ${rand}`,
          },
          outputSpeech: {
            type: 'PlainText',
            text: `Your email is ${skillUserEmail}.  Your random number is ${rand}!`,
          },          
          shouldEndSession: true,
        }
      };
      callback(null, response);
    }else{//permissions for email have not been approved by the user
      const response = {
        version: '1.0',
        response: {
          card: {
            type: "AskForPermissionsConsent",
            permissions: [
              "alexa::profile:email:read"
            ],
            content: "In order to use this skill we will need access to your email address. Please go to the home screen in your Alexa app and grant this permission."
          },
          outputSpeech: {
            type: 'PlainText',
            text: `In order to use this skill we will need access to your email address. Please go to the home screen in your Alexa app and grant this permission.`,
          }, 
          shouldEndSession: true,
        },
      };
      callback(null, response);
    }
  });
}

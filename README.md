# randomgen-with-alexaprofileinfo
A sample node.js Alexa skill lambda that demonstrates requiring user permissions to provide Customer Profile API access.  Then spits out a random number and their email.
User is prevented from interacting with the skill until they've enabled the requested permission in their Alexa app.

REQUIRES:
-Serverless framework to deploy.    serverless.com
Node.js 8.10

TO DEPLOY:
(assumes you have AWS Profile set up, as well as an Alexa Skill that will use this Lambda as the backend.)
- npm install
- serverless deploy 

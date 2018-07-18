# shopapi

### Status
[![Build Status](https://travis-ci.org/bezopteam/marketplace-backend.svg?branch=master)](https://travis-ci.org/bezopteam/marketplace-backend)

1. Clone the Repo

> git clone https://github.com/bezopteam/marketplace-backend.git

2. Install Dependencies

> npm install

3. Start the App

> npm start

4. Test the App

> npm test

5. Build and Serve App

> npm serve


## Deploy to Heroku

$ heroku login
$ heroku git:clone -a bshop-api
$ cd bshop-api

Alternative 

$ heroku git:remote -a bshop-api
$ heroku info --app bshop-api

Deploy your changes
Make some changes to the code you just cloned and deploy them to Heroku using Git.

$ git add .
$ git commit -am "make it better"
$ git push heroku master

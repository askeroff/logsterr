[![Build Status](https://travis-ci.org/askeroff/timetracker.svg?branch=master)](https://travis-ci.org/askeroff/timetracker)

# TimeTracker

This is a simple side project to learn more about full-stack JS stack. Supposedly, this will be an app, where you:

  - can signup and log in
  - create categories of your activities
  - create new task
  - assign category to that task
  - click on timer and time your activity
  - get weekly/monthly results (how much hours did you spend on what tasks)


## Tech Stack

Backend runs on Express framework. Logins and signup are handled with passportjs library (local strategy). For database I use mongodb (at mlab). Sensitive data for this app should be in a file variables.env, so if you decide to try it out on your own, this is what should be in that file (in the root directory):

    NODE_ENV=
    DATABASE=
    PORT=
    SECRET=
    KEY=

Pop in your values.

Client side all is handled with React right now.Probably Redux is gonna find its way into this application.

To run this app:

```
$ npm install
$ npm start
```

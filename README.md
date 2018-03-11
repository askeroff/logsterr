[![Build Status](https://travis-ci.org/askeroff/timetracker.svg?branch=master)](https://travis-ci.org/askeroff/timetracker)

# TimeTracker

This is a simple side project to learn more about full-stack JS stack. Supposedly, this will be an app, where you:

* can signup and log in
* create categories of your activities
* create new task
* assign category to that task
* click on timer and time your activity
* get weekly/monthly results (how much hours did you spend on what tasks)

## Demo

Demo version is hosted on now.sh for demo purposes only. You can see the current demo at the top, in the project's description. Usually, it's the last release hosted.

## Tech Stack

Backend runs on Express framework. Logins and signup are handled with passportjs library (local strategy). For database I use mongodb (at mlab). Sensitive data for this app should be in a file variables.env, so if you decide to try it out on your own, this is what should be in that file (in the root directory):

    NODE_ENV=
    DATABASE=
    PORT=
    SECRET=
    KEY=
    MAIL_USER=
    MAIL_PASS=
    MAIL_HOST=
    MAIL_PORT=
    MAIL_FROM=

Pop in your values. All MAIL_ prefixed variables are for SMTP transport for nodemailer, user with "Reset password" feature. I use mailjet service for this.

Client side all is handled with React w/Redux right now.
To run this app for production:

```
$ npm install
$ npm run build
$ npm start
```

To run this app for development:

```
$ npm install
$ npm run dev
```

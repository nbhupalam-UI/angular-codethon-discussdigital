# Digitaldiscuss

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.1.

## Development server

1. Install Node.
2. Install NPM
3. install angular-cli. npm install -g @angular/cli@latest
4. go to repo. perform npm install
5. Dev server. a)Run node server.js b) npm run local
6. access app at localhost:4200

## Prod Commands

1. Run npm run prod
2. access app at localhost:3000

## Hosting 

1. App is hosted on Google cloud Platform App Engine, accessible at https://discussdigital-203911.appspot.com/

# Progressive Features

1. App works offline in chrome, firefox.
2. App sends push notifications from GCM, when a comment is added by any user to your a posts and when you achive a new badge.
3. App does sync data offline. Background Sync feature is available. When user posts a question when device is offline. it syncs the question when device comes online.
4. App can be added to homescreen Mobile/Dektop. behaves like a standalone mobile app. In mobile browser prompts to add app to homescreen. In Desktop User can add app to desktop by clicking option 'Install to Desktop.'

Above features are achived through Service worker API's.

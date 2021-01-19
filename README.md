# Polymath Developer Portal

## Setup
Run `npm install` to install the project.

## Local development server
Start the local server with `npm run develop` - live reload is enabled

The local server will then be reachable on [http://localhost:8000/](http://localhost:8000/) and the graphql explorer on [http://localhost:8000/___graphql](http://localhost:8000/___graphql)

For debugging, use `npm run develop --verbose`

## Build
To build the deployable website, run `npm run build`. This will create the output package in the `/public` folder.

## Known issues
* When updating the gatsby configuration, live reload does not work - you need to restart the dev server.
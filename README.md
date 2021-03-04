# Polymesh Developer Portal

## Staging server
`main` and `staging` branches are deployed automatically
* staging: [https://tc-staging.polymesh.live/](https://tc-staging.polymesh.live/)
* main: [https://tc-main.polymesh.live/](https://tc-main.polymesh.live/)

## Project setup & tech details

### Requirements
This project requires [npm](https://www.npmjs.com/get-npm)

### Setup
Run `npm install` to install the project.

### Local development server
Start the local server with `npm run develop` - live reload is enabled

The local server will then be reachable on [http://localhost:8000/](http://localhost:8000/) and the graphql explorer on [http://localhost:8000/___graphql](http://localhost:8000/___graphql)

For debugging, use `npm run develop --verbose`

### Build
To build the deployable website, run `npm run build`. This will create the output package in the `/public` folder.

### Known issues
* gatsby is now using some advanced caching on local dev (which is great!). Sometimes, you might need to clear the cache manually if you don't see assets (images) or some included resources (like the menu) updating. To clean, run: `npm run clean`.

### Notes
* When updating the gatsby configuration, you need to restart the server. There is now a message that will appear in the Browser, notifying you about this.
* Run and build tested on osx, unix and within WSL
* You can skip the automatic deployment of a commit by adding [CI Skip] to the commit message

## Information for content creators
You can find a markdown file in `features/feature_test.mdx` which demonstrates the use of all Markdown features and additional components. (This file will not be linked in the final version).

## Update workflow & Review process
We use feature branches, named as `xx-feature-description`, where `xx` are the name initials. Once a WIP or FINAL change should be reviewed internally, a PR should be made towards staging (handled internally). Once B9lab is done with a part that should be reviewed, it will be pushed to the `review` branch (responsible person: Xavier), and a PR is opened towards `main`, assigned to a reviewer from Polymath.

We will then use the Github review features to manage the review. If due to the review, an update on the content is required, it should be put on the original feature branch (if possible), or a new feature branch, and a new PR towards both staging and the review branch should be opened.

This change will then be confirmed internally (Xavier accepts the PR on the review branch) and thereby automatically added to the PR from the `review` branch towards `main` (review by Polymath). Once the review is complete, the PR can be closed, pushing the update to the `main` server.

In the end, the recent WIP version can be found on staging and the already reviewed version on main.

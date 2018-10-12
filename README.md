# Doctor Lookup

#### Javascript project for Epicodus independent code review, 10.12.18

#### By Nikki Wong

## Description

This application will allow users to find a doctor in their area by inputting their medical issue using the BetterDoctor API.

## Specs

| Behavior | Example Input | Example Output |
|----------|-------|--------|
| When a user enters in a search query, a list of doctors' information matching that query is returned | toothache | Steven Toschi, DDS, etc |
| When an error occurs in calling the API, a corresponding error message is returned | 404 | "Not found" |
| When no results match the user's search query, an error message is returned | asdf | "Sorry, we couldn't find any doctors matching that description. Please try again." |


## Setup on OSX

* Clone this repository
* Run `npm install`
* Run `npm run start`
* Run `npm run test`

## Technologies Used

* JavaScript
* Node.js
* jQuery 3.3.1
* Bootstrap 4.1.3
* Babel
* Webpack
* ESLint
* Jasmine
* Karma

## License

Copyright (c) 2018 **Nikki Wong**

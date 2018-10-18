# Doctor Lookup

#### Javascript project for Epicodus independent code review, 10.12.18

#### By Nikki Wong

## Description

This application will allow users to find a doctor in their area by inputting their medical issue using the BetterDoctor API.

## Specs

| Behavior | Example Input | Example Output |
|----------|-------|--------|
| When a user enters in a query keyword, distance, and address, a list of doctors' information matching that keyword within the specified distance of the inputted location is displayed in descending order by distance | dentist, 5, 97204 | Hans A. Go, DMD, Brett Allen Ueek, DMD, etc |
| When a user clicks on a doctor's name, the doctor's information is displayed | [click action] | Richard I. Ashton, DMD, Richard I. Ashton, DMD, "Dr. Richard Ashton, DMD treats patients in Gilbert, Arizona, Irvine, California, Buckeye, Arizona, Oregon city, Oregon, Gresham, Oregon, Avondale, Arizona, Tualatin, Oregon, Happy valley, Oregon, and Hillsboro, Oregon and specializes in dentistry and general dentistry. Dr. Ashton is licensed to treat patients in Oregon and Arizona. In addition to having active medical licenses, Dr. Ashton has successfully passed a background check including a medical license verification (active) and screening for malpractice history (none found).", 30040 SW Boones Ferry Rd, Ste 20, Wilsonville, OR 97070, 5056824500, Accepts new patients? Yes |
| When a user clicks on a doctor's name, a Recently Viewed list is shown and the doctor's name is appended to it | [click action] | Recently Viewed: Loan Bich Nguyen, DMD, Rachel B. Schultz |
| When an error occurs in calling the API, a corresponding error message is returned | 404 | "Not found" |
| When no results match the user's search query, an error message is displayed | asdf | "Sorry, we couldn't find any doctors matching that description. Please try again." |


## Setup on OSX

* Clone this repository
* Run `npm install`
* Run `npm run start`
* Run `npm run test`
* Create .env file
  * exports.apiKey=[Better Doctor API Key]
  * exports.apiKey2=[Google Maps API Key]

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

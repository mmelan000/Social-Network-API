# Social-Network-RESTful-API

[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

The purpose of this is to create a RESTful API to serve as a database for a Social Media Platform.

## User Story

```md
AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data
```

## Acceptance Criteria

```md
GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list
```

## Table of Contents

1. [Description](#description)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Contributing](#contributing)
5. [Tests](#tests)
6. [Questions](#questions)
7. [License](#license)

## Installation

1. Download.
2. Run `npm i` in your terminal.
3. Access your **mongod** shell and create a database called `socialNetworkDB`. Optionally, you may also `npm run seed` to seed the database.
4. Enter the command `npm start`.

## Usage

**[Tutorial Video](tbd)**

![App Screenshot](./public/images/SS1.gif)

![App Screenshot](./public/images/SS2.gif)

![App Screenshot](./public/images/SS3.gif)

![App Screenshot](./public/images/SS4.gif)

## Contributing

Follow best practices for naming conventions, indentation, quality comments, etc.

## Tests

A seeds folder is included for testing purposes. Run `npm run seed` then use Insomnia to make calls to routes.

## Questions

If you have any questions, please reach out to me either on Github or by Email.

- **Github:** [mmelan000](https://github.com/mmelan000)
- **Email:** [m.melanson000@gmail.com](mailto:m.melanson000@gmail.com)

## License

- [MIT](https://opensource.org/licenses/MIT)

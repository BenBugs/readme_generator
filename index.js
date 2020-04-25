const inquirer = require("inquirer");
const axios = require('axios');
const fs = require('fs');
const util = require('util');

const writeFileAsync = util.promisify(fs.writeFile);


function getUserInput() {

    let questions = [
        {
            type: 'input',
            name: 'title',
            message: 'Add a project title',
        },
        {
            type: 'input',
            name: 'description',
            message: 'Add a project description (a one paragraph project description)',
        },
        {
            type: 'input', 
            name: 'installation',
            message: 'Describe the installation (a step by step guide to getting the development environment running)',
        },
        {
            type: 'input',
            name: 'usage',
            message: 'Usage (describe how the product is used)',
        },
        {
            type: 'input',
            name: 'contributors',
            message: 'Contibutors (who has worked in this project?)',
        },
        {
            type: 'input',
            name: 'tests',
            message: 'Tests (describe any tests that been applied to the project)',
        },
        {
            type: 'input',
            name: 'questions',
            message: 'Questions (what do users need to know)',
        },
        {
            type: 'list',
            choices: ['MIT', 'GNU', 'open source', 'proprietary', 'freeware'],
            name: 'licence',
            message: 'What licence would you like to apply?',
        },
        {
            type: 'input',
            name: 'github_username',
            message: 'What is your GitHub username?',
        }

    ];

    return inquirer.prompt(questions); // inquirer.prompt asks the q's and returns the answers to the promise

}

async function init()
{
    try {
        const userInput = await getUserInput(); // returns response or error, getUserInput object if successful
        console.log(userInput);
        const profileImage = await getProfile(userInput.github_username);
        const imageUrl = profileImage.data.avatar_url;
        const badgeType = userInput.licence;

        // pass getUserInput object, badge url and profile image to generateMarkdown function
        cleanDataPackage(userInput , imageUrl, badgeType);

      } catch(err) {
        console.log(err);
      }
}

init()


function getProfile(username) {
    let queryUrl = `https://api.github.com/users/${username}`;
    console.log(queryUrl);
    // api call
    return axios.get(queryUrl);
}

// clean and prcess data into a usable object
function cleanDataPackage(data , image , badge) {
    console.log(image)
    let formatedBadgeStr = `![Badge](https://img.shields.io/badge/licence-${badge}-brightgreen)`;
    let formatedImageStr = `![](${image})`

    userInput = data; // this is the original .prompt object which is being updated with image and badge strings
    userInput.profile = image;
    userInput.licence = formatedBadgeStr;

    console.log(userInput)
    generateMarkdown(userInput);
}


function generateMarkdown(data) {
  const documentData = `
${data.licence}

# Project title
${data.title}

## Description
${data.description}

## Table of Contents
- Intallation
- Usage
- Contributors
- Tests
- Questions

### Installation
${data.installation}

### Usage
${data.usage}

### Contributors
${data.profile}
${data.contributors}

### Tests
${data.tests}

### Questions
${data.questions}

`;

    writeFileAsync('readme.md', documentData);

}




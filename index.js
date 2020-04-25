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
            message: 'Add a project description, (a one paragraph project description)',
        },
        {
            type: 'input', 
            name: 'installation',
            message: 'Describe the installation',
        },
        {
            type: 'input',
            name: 'usage',
            message: 'Describe usage',
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
        const image = profileImage.data.avatar_url;
        console.log(profileImage.data.avatar_url);
        // pass getUserInput object and profile image to dataPkg function
        const dataPackage = userDataPackage(userInput , image);
        generateMarkdown(dataPackage);

      } catch(err) {
        console.log(err);
      }
}

init()


function getProfile(username) {
    let queryUrl = `https://api.github.com/users/${username}`;
    console.log(queryUrl);

    return axios.get(queryUrl);
}


function userDataPackage(userInput , image) {
    let userData = userInput;
    userData.profile = image;
    console.log(userData)
    return userData;
}

function generateBadge() {
    
}


function generateMarkdown(data) {
  const documentData = `


#Project title
${data.title}

#Project title
${data.description}

## Table of Contents
- Intallation
- Usage
- Licence
- Contributors
- Tests
- Questions

### Installation [an example][id]
${data.contents}

### Usage
${data.usage}

### License
${data.licence}

### Contributors
${data.contributors}

### Tests
${data.tests}

### Questions
${data.questions}

`;



  
    writeFileAsync('readme.md', documentData);

}




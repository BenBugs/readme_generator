const inquirer = require("inquirer");
const axios = require('axios');
const fs = require('fs');


function getUserInput() {

    let questions = [
        {
            type: 'input',
            name: 'title',
            message: 'Add a project title',
        },
        // {
        //     type: 'input',
        //     name: 'description',
        //     message: 'Add a project description',
        // },
        // {
        //     type: 'input',
        //     name: 'contents',
        //     message: 'Add a table of contents',
        // },
        // {
        //     type: 'input', //table???????!
        //     name: 'installation',
        //     message: 'Describe the installation',
        // },
        // {
        //     type: 'input',
        //     name: 'usage',
        //     message: 'Describe usage',
        // },
        // {
        //     type: 'list',
        //     choices: ['MIT', 'GNU', 'open source', 'proprietary', 'freeware'],
        //     name: 'licence',
        //     message: 'What licence would you like to apply?',
        // },
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
        dataPkg(userInput , image);

      } catch(err) {
        console.log(err);
      }
}

init()

function dataPkg(userInput , image) {
    let userData = userInput;
    userData.profile = image;
    console.log(userData)
    return userData;
}


function getProfile(username) {
    let queryUrl = `https://api.github.com/users/${username}`;
    console.log(queryUrl);

    return axios.get(queryUrl);
}


function generateMarkdown(data) {
    console.log(data)
    // fs.writeFile('readme.md', data, function (err/* needs erro message*/) {
    //     return `
    //     # ${data[title]} 
    //     ## ${data.description}
    //     ### ${data.contents}
    //     ### ${data.installation}
    //     ### ${data.usage}
    //     `;

    // })

}







// .then(function (response) {

//     if (response.confirm === response.password) {
//         console.log("Success!");
//     }
//     else {
//         console.log("You forgot your password already?!");
//     }
// });



// function writeToFile(fileName, data) 
// {



// }

// function init() {

// }

// init();

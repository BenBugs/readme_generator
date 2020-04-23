const inquirer = require("inquirer");
const axios = require('axios');
const fs = require('fs');


function getUserInput() {

    let questions = [
        // {
        //     type: 'input',
        //     name: 'project_title',
        //     message: 'Add a Project Title',
        // },
        {
            type: 'input',
            name: 'github_username',
            message: 'What is your GitHub username?',
        },
        {
            type: 'list',
            choices: ['MIT', 'GNU', 'open source', 'proprietary', 'freeware'],
            name: 'licence',
            message: 'What licence would you like to apply?',
        }

    ];

    return inquirer.prompt(questions); // inquirer.prompt asks the q's and returns the answers to the promise

}

getUserInput().then(function (response) {
    console.log(response);
    getProfile(response.github_username)
})


function getProfile(username) {
    let queryUrl = `https://api.github.com/users/${username}`;
    console.log(queryUrl);

    axios.get(queryUrl)
        .then(function (response) {
            let image = response.data.avatar_url;
            // handle success
            console.log(image);

            //create readMe file
            generateMarkdown(response); ///not sure about this

        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
}




function generateMarkdown( data) {
    return `
  # ${data.title}
  
  `;
  }
  
  module.exports = generateMarkdown;





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

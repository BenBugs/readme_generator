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

getUserInput()

    .then(function (response) {
        console.log(response);
        // pass github username to getProfile()
        getProfile(response.github_username);
    })

    .then(function (response) {
        // pass .prompt responses to generateMarkdown()
        generateMarkdown(response);
    })


function getProfile(username) {
    let queryUrl = `https://api.github.com/users/${username}`;
    console.log(queryUrl);

    axios.get(queryUrl)
        .then(function (response) {
            let image = response.data.avatar_url;
            // handle success
            console.log(image);

            // //create readMe file
            // generateMarkdown(response); ///not sure

        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
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

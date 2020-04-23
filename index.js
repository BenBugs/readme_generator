const inquirer = require("inquirer");

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

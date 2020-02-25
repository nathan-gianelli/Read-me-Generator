const inquirer = require('inquirer');
const generateMarkdown = require("./utils/generateMarkdown.js");
const fs = require("fs");
const config = require("./package.json");
const api = require("./utils/api.js");

const questions = [
    {
      message: "What's your GitHub username?",
      type: "input",
      name: "userName"
    },
    {
      message: "What's your email address?",
      type: "input",
      name: "emailAddress"
    },
    {
      message: "What's your project name?",
      type: "input",
      name: "projectName"
    },
    {
      message: "Please type a short description about your project?",
      type: "input",
      name: "projectDescription"
    },
    {
      message: "What kind of license should your project have?",
      type: "input",
      name: "projectLicense"
    },
    {
        message: "How to use?",
        type: "input",
        name: "projectUsage"
    },
    {
      message: "What command should be run to install dependencies?",
      type: "input",
      name: "runDependencies"
    },
    {
      message: "What command should be run to run tests?",
      type: "input",
      name: "runTest"
    },
    {
      message: "Enter Your Respository .git URL",
      type: "input",
      name: "projectRepository"
    },
    {
      message: "What does the user need to know about contributing to the repo?",
      type: "input",
      name: "projectContribution"
    }
  ]

function writeToFile(fileName, data) {

  fs.writeFile(fileName, data, function(err) {
  
    if (err) {
      return console.log(err);
    }
  
    console.log("Success!");
  
  });
  
}

function init() {
  inquirer
    .prompt(questions)
    .then(answers => {
      // Make the call to get the info we want from github. 
      api.getUser(answers.userName).then(data => {
        // Debugging the object that comes in. 
        // console.log("Here is the Data From Github"+data);        
        
        // Create new variable that contains the data from github and our question data. 
        const summary = {...data, ...answers};

        // Get our markdown. 
        var markdown = generateMarkdown(summary);

        // Generate a custom file name or defaults to a README.md file. 
        var filename = process.env.filename || "README.md";

        // Write the file. 
        writeToFile(filename, markdown);
        
        // Debuggin'
        // console.log(markdown);
      });
    });
}



init();

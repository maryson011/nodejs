import chalk from 'chalk';
import inquirer from 'inquirer';
// const inquirer = require('inquirer');

inquirer.prompt([
    {
        name: "name",
        message: "What's your name?"
    },
    {
        name: "age",
        message: "it's the age?"
    }
])
.then((answer) => {
    if(!answer.name || !answer.age){
        throw new Error('The name and age not defined!'); 
    }
    console.log(chalk.bgYellow.blue(answer.name))
    console.log(chalk.bgYellow.blue(answer.age))
})
.catch(err => console.log(err))
const inquirer = require('inquirer');

inquirer.prompt([
    {
        name: 'q1',
        message: 'Qual é a primeira nota?'
    },
    {
        name: 'q2',
        message: 'E a segunda?'
    },
])
.then((answer)=>{
    console.log(answer);
    const media = (parseFloat(answer.q1) + parseFloat(answer.q2))/2;

    console.log(media)
})
.catch(err => console.log(err))
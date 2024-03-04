import chalk from 'chalk';

const nota = 6

console.clear();

if(nota >=8){
    console.log(chalk.green('Parabéns! Você foi aprovado.'))
}else if(nota >=6 && nota <8){
    console.log(chalk.yellow('Parabéns! Você foi aprovado por pouco. Vamos estudar mais!'))
}else{
    console.log(chalk.red('Nota insuficiente! Bora estudar.'))
}
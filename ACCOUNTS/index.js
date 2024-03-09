const inquirer = require('inquirer')
// const chalk = require('chalk'); // não vamos usar o chalk aqui pois está incompativel. Depois se quiser pode optar por outro modulo externo

const fs = require('fs');

operation();
// menu principal
function operation(){
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'O que você quer fazer?',
            choices: [
            'Criar Conta',
            'Consultar Saldo',
            'Depositar',
            'Sacar',
            'Sair'
            ],
        },
    ])
    .then((answer)=>{
        const action = answer['action']

        if(action === 'Criar Conta'){
            creatAccount();
        }else if(action === 'Consultar Saldo'){
            getAccountBalance();
        }else if(action === 'Depositar'){
            depositar();
        }else if(action === 'Sacar'){
            withdraw();
        }else if(action === 'Sair'){
            console.log('Obrigado por usar o Account.')
            process.exit();
        }
    })
    .catch((err)=>console.log(err))
}
// create account
function creatAccount(){
    console.log('Parabéns por escolher nosso banco!');
    console.log('Defina as opções da sua conta a seguir.');

    buildAccount();
}
// verifica se conta já existe
function buildAccount(){
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Digite o nome da sua conta:'
        }
    ])
    .then(answer=>{
        const accountName = answer['accountName'];
        console.info(accountName);

        if(!fs.existsSync('accounts')){
            fs.mkdirSync('accounts')
        }

        if(fs.existsSync(`accounts/${accountName}.json`)){
            console.log('essa conta já existe, por favor escolha outro nome!')
            buildAccount();
            return
        }

        fs.writeFileSync(`accounts/${accountName}.json`, '{"balance": 0}', (err)=>{
            console.log(err);
        })

        console.log('Parabéns, a sua conta foi criada.');

        operation()
    })
    .catch((err)=>console.log(err))
}
// add an amount to user account
function depositar(){
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Qual o nome da conta?'
        }
    ])
    .then((answer)=>{
        const accountName = answer['accountName'];

        if(!checkAccount(accountName)){
            return depositar();
        }

        inquirer.prompt([
            {
                name: 'amount',
                message: 'Quanto você deseja depositar?'
            }
        ])
        .then((answer)=>{
            const amount = answer['amount'];

            addAmount(accountName, amount);
            operation()
        })
        .catch((err)=>console.log());
    })
    .catch((err)=>console.log(err));
};
// checa nome da conta
function checkAccount(accountName){
    if(!fs.existsSync(`accounts/${accountName}.json`)){
        console.log('Essa conta não existe, escolha outro nome!');
        return false;
    }
    return true;
}
// adiciona deposito
function addAmount(accountName, amount){
    const accountData = getAccount(accountName);

    if(!amount){
        console.log('Ocorreu um erro! Tente novamente mais tarde.')
        return depositar();
    }

    accountData.balance = parseFloat(amount)+parseFloat(accountData.balance)

    fs.writeFileSync(
        `accounts/${accountName}.json`,
        JSON.stringify(accountData),
        (err)=>{
            console.log(err);
        },
    )

    console.log(`Foi depositado o valor de R$ ${amount}`)
}
// obtem os dados da conta
function getAccount(accountName){
    const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
        encoding: 'utf8',
        flag: 'r'
    })

    return JSON.parse(accountJSON)
}
// consultar saldo
function getAccountBalance(){
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Qual o nome da conta'
        }
    ])
    .then((answer)=>{
        const accountName = answer['accountName'];

        if(!checkAccount(accountName)){
            return getAccountBalance();
        }

        const accountData = getAccount(accountName)

        console.log(`Seu saldo é R$ ${accountData.balance}`)
        operation();
    })
    .catch((err)=>console.log(err))
}
// retirar
function withdraw(){
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Qual o nome da sua conta?'
        }
    ])
    .then((answer)=>{
        const accountName = answer['accountName'];
        if(!checkAccount(accountName)){
            return withdraw();
        }

        inquirer.prompt([
            {
                name: 'amount',
                message: 'Qual o valor?'
            }
        ])
        .then((answer)=>{
            const amount = answer['amount']

            removeAmount(accountName, amount);
        })
        .catch((err)=>console.log(err))
    })
    .catch((err)=>console.log(err))
}
// remove valor da conta
function removeAmount(accountName, amount){
    const accountData = getAccount(accountName)
    if(!amount){
        console.log('Ocorreu um erro! Tente novamente mais tarde.')
        return withdraw();
    }

    if(accountData.balance < amount){
        console.log('Valor em conta não disponivel!')
        return withdraw();
    }

    accountData.balance = parseFloat(accountData.balance)-parseFloat(amount)

    fs.writeFileSync(
        `accounts/${accountName}.json`,
        JSON.stringify(accountData),
        function(err){
            console.log(err)
        },
    )

    console.log(`Foi realizado um saque de R$${amount} em sua conta.`)
    operation();
}
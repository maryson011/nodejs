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
            'Transferir',
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
        }else if(action === 'Transferir'){
            transferAmount();
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
        .catch((err)=>console.log(err));
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

    console.log(`Foi depositado o valor de R$ ${amount} para ${accountName}`)
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
    setTimeout(()=>{
        operation();
    }, 2000);
}
// transferencia de saldo
function transferAmount(){
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Qual a conta que deseja realizar a transferência?'
        }
    ])
    .then((answer)=>{
        const accountName = answer['accountName']

        if(!accountName){
            console.log('Conta inválida')
            return transferAmount();
        }

        const accountData = getAccount(accountName);
        const amount = parseFloat(accountData.balance);
        console.log(`Seu saldo é de R$ ${amount}`); 

        if(amount>0){
            getAmountTo(accountName, amount);
        }
    })
    .catch((err)=>console.log(err))
};

function getAccountForTransfer(accountName, amount, amountTo){
    inquirer.prompt([
        {
            name: "accountNameTo",
            message: "Para qual conta deseja transferir?"
        }
    ])
    .then(async (answer)=>{
        const accountNameTo = answer['accountNameTo'];

        if(!accountNameTo){
            console.log('Nome da conta inválido! Por favor verificar.');
            return 
        }

        if(!checkAccount(accountNameTo)){
            return getAccountForTransfer(amountTo)
        }

        removeAmount(accountName, amountTo);
        addAmount(accountNameTo, amountTo);
    })
    .catch((err)=>console.log(err))
}

function getAmountTo(accountName, amount){
    inquirer.prompt([
        {
            name: 'amountTo',
            message: 'Qual o valor para transferir?'
        }
    ])
    .then((answer)=>{
        const amountTo = answer['amountTo'];
        if(!amount){
            console.log('Valor inválido!')
            return getAmountTo(amount);
        }
        if(amountTo > amount){
            console.log("O valor da tranferência não pode ser maior que seu saldo!")
            return getAmountTo(amount);
        }

        getAccountForTransfer(accountName, amount, amountTo);
    })
}
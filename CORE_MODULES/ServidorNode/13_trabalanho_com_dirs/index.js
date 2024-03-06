const fs = require('fs');
const path = require('path');

if(!fs.existsSync('./minhaPasta')){
    console.log('Não não existe! Vou criar para você aqui rapidinho.')

    fs.mkdirSync('minhaPasta');

    console.log('Verificando novamente..')

    const minhaPasta = path.basename('minhaPasta');

    minhaPasta ? console.log(`Pasta ${minhaPasta} criada com sucesso.`) : console.log('Algo deu errado na criação da pasta!')
}else{
    console.log(`${path.basename('minhaPasta')} já está criada.`)
}
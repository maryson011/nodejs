const fs = require('fs');
const path = require('path');

// const pastaAtual = process.cwd();
const pastaAtual = '../';

fs.readdir(pastaAtual, (err, arquivos) => {
    if (err) {
        console.error('Erro ao ler o diretório:', err);
        return;
    }

    arquivos.forEach((arquivo, indice) => {
        const caminhoCompleto = path.join(pastaAtual, arquivo);

        if (fs.statSync(caminhoCompleto).isDirectory()) {
            
            const novoNome = arquivo.replace(/^.(.)/, (match, p1) => `p${indice}${p1}`);
            // corrigir aqui para renomear corretamente
            fs.renameSync(caminhoCompleto, path.join(pastaAtual, novoNome));
            console.log(`Pasta renomeada: ${arquivo} -> ${novoNome}`);
        }
    });
});

const path = require('path');

const customPath = '/relatorios/pasta1/index.dpf';
// exibir informações do path
console.log(path.dirname(customPath))
console.log(path.basename(customPath))
console.log(path.extname(customPath))

// criar path dinâmico
const dir1 = 'firstDir';
const dir2 = 'secondDir';

const endPath = path.join('startDirs', dir1, dir2);

console.log(endPath);
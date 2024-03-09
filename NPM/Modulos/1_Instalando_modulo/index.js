const _ = require('lodash');

const arr1 = [2,1,4,3,6,5,7,8]
const arr2 = [5,4,6,1,4,3,8,0]

const arrDiff = _.difference(arr1, arr2)
console.log(arrDiff);

// para installar as dependencias com npm é npm install. Ele verifica no arqui package.json quais são as dependencias listadas
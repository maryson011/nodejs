const { Sequelize } = require('sequelize')

const bankName = 'thoughts'
const userName = 'root'
const password = ''

const sequelize = new Sequelize(bankName, userName, password, {
    host: 'localhost',
    dialect: 'mysql',
})

try{
    sequelize.authenticate()
    console.log(`Conectamos ao banco ${bankName}`)
}catch(err){
    console.log(err)
}

module.exports = sequelize
const { Sequelize } = require('sequelize')

const bankName = 'thoughts'

const sequelize = new Sequelize(bankName, 'root', '', {
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
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('nodesequelize', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
})

try{
    sequelize.authenticate()
    console.log('Conectamos com sucesso com o Sequelize!')
} catch (err){
    console.log(err);
}

module.exports = sequelize;
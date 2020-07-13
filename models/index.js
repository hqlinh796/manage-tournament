const Sequelize = require('sequelize');
const {config} = require('../config');
var fs = require('fs')
    , path = require('path')
    , db = {}

const sequelize = new Sequelize(
  config.database.name,
  config.database.username,
  config.database.password, {
    dialect: 'postgres',
    host: config.database.host,
    port: Number(config.database.port),
    logging: config.env === 'development' ? console.log : false,
    define: {
      underscored: true
    },
  },
);

fs.readdirSync(__dirname)
    .filter(function (file) {
        return (file.indexOf('.') !== 0) && (file !== 'index.js')
    })
    .forEach(function (file) {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize);
        console.log(model);
        db[model.name] = model;
    })

Object.keys(db).forEach(function (modelName) {
    if (db[modelName].options.hasOwnProperty('associate')) {
        db[modelName].options.associate(db)
    }
})

sequelize
  .authenticate()
  .then(() => {
      console.log('Connection has been established successfully.');  
  })
  .catch((error) => {
    // TODO: add logger
    console.log(error);
  });


module.exports = {
    ...db,
    sequelize,
    Sequelize
};





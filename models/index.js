'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(__filename);
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/config.json')[env];
var db        = {};

const Wkt = require('terraformer-wkt-parser')
Sequelize.GEOMETRY.prototype._stringify = function _stringify(value, options) {
  return 'ST_GeomFromText(' + options.escape(Wkt.convert(value)) + ')'
}
Sequelize.GEOGRAPHY.prototype._stringify = function _stringify(value, options) {
  return 'ST_GeomFromText(' + options.escape(Wkt.convert(value)) + ')'
}



const operatorsAliases = {
  "$and": "Op.and",
  "$or": "Op.or",
  "$eq": "Op.eq",
  "$gt": "Op.gt",
  "$lt": "Op.lt",
  "$lte": "Op.lte",
  "$like": "Op.like"
};
if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable], config, { operatorsAliases });
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config, { operatorsAliases });
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

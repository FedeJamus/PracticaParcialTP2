'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Folder);
      User.belongsToMany(models.File,{through:'users_files'});
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:true,
        noHola(params) {
          if(params === 'hola'){
            throw new Error('No podes poner hola')
          }
        },
        puedeSer(params){
          if(!(params === 'fede' || params === 'fonso' || params === 'tom')){
            throw new Error('Pone estos nombres pa')
          }
        }
      }
    },
    surname:{
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:true,
      }
    },
    type:{
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull:false,
      validate:{
        notEmpty:true,
        isIn:[[1,2,3]]
      }
    },
  }, {
    sequelize,
    modelName: 'User',
    tableName:'users'
  });
  return User;
};
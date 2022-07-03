'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Folder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Folder.hasMany(models.File)
      Folder.belongsTo(models.User)
    }
  }
  Folder.init({
    name: {
      type: DataTypes.STRING,
      allowNull:false,
     // unique:true,
      validate:{
        notEmpty:true,
        noHola(params) {
          if(params === 'hola'){
            throw new Error('No podes poner hola')
          }
        }
      }
    },
    userId:{
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull:false,
      validate:{
        notNull:true,
        notEmpty:true,
        isInt:true,
        min:1,
        max:9999999999999999999999
      }
    },
  }, {
    sequelize,
    modelName: 'Folder',
    tableName: 'folders'
  });
  return Folder;
};
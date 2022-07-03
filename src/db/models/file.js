'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class File extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      File.belongsTo(models.Folder)
      File.hasOne(models.Image)
      File.belongsToMany(models.User,{through:'users_files'})

    }
  }
  File.init({
    title: {
      type: DataTypes.STRING,
      allowNull:false
    },
    folderId:{
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull:false
    },
  }, {
    sequelize,
    modelName: 'File',
    tableName: 'files'
  });
  return File;
};
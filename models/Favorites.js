const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Favorites extends Model {}

Favorites.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    sponsor_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    short_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bill_status: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    //foreign key
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'favorites',
  }
);

module.exports = Favorites;

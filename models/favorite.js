const { Model, DataTypes } = require("sequelize");
const bcrypt = require('bcrypt');
const sequelize = require("../config/connection");

class Favorite extends Model { };

Favorite.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    bill_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sponsor_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    short_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    introduced_date: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    house_passage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    senate_passage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "favorite"
  }
);

module.exports = Favorite;

// module.exports = function (sequelize, DataTypes) {
//   const Favorite = sequelize.define("Favorite", {
//     title: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: {
//         len: [1],
//       },
//     },
//     body: {
//       type: DataTypes.TEXT,
//       allowNull: false,
//       len: [1],
//     },
//   });

//   Favorite.associate = function (models) {
//     // We're saying that a Post should belong to an Author
//     // A Post can't be created without an Author due to the foreign key constraint
//     Favorite.belongsTo(models.User, {
//       foreignKey: {
//         allowNull: false,
//       },
//     });
//   };

//   return Favorite;
// };

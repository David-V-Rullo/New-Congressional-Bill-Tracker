const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
  validPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;


// // Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
// const bcrypt = require("bcryptjs");
// // Creating our User model
// module.exports = function(sequelize, DataTypes) {
//   const User = sequelize.define("User", {
//     name: {
//       type: DataTypes.STRING
//     },
//     // The email cannot be null, and must be a proper email before creation
//     email: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//       validate: {
//         isEmail: true
//       }
//     },
//     // The password cannot be null
//     password: {
//       type: DataTypes.STRING,
//       allowNull: false
//     }
//   });
//   // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
//   User.prototype.validPassword = function(password) {
//     console.log("User.prototype.validPassword");
//     return bcrypt.compareSync(password, this.password);
//   };
//   // Hooks are automatic methods that run during various phases of the User Model lifecycle
//   // In this case, before a User is created, we will automatically hash their password
//   User.addHook("beforeCreate", user => {
//     console.log("User.addHook");
//     user.password = bcrypt.hashSync(
//       user.password,
//       bcrypt.genSaltSync(10),
//       null
//     );
//   });

//   User.associate = function(models) {
//     console.log("User associate: models", models);
//     User.hasMany(models.Post);
//     User.hasMany(models.Favorite);
//   };

//   // User.associate = function(models) {
//   //   User.hasMany(models.Favorite);
//   // };

//   return User;
// };

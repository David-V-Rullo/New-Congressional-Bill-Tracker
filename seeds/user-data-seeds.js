const { User } = require('../models');

const userData = [
  {
    name: 'John Clark',
    email: "jclark@email.com",
    zip: 07101,
    password: "password",
  },

];

const seedUserData = () => User.bulkCreate(userData);

module.exports = seedProducts;
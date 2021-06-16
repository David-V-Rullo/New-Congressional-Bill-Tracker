
const seedUserData = require('./user-data-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');
  await seedUserData();
  console.log('\n----- USERS SEEDED -----\n');

  process.exit(0);
};

seedAll();

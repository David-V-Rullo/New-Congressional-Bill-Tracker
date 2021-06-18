
const seedUserData = require('./user-seeds');

const seedFavoriteData = require('./favorite-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');
  seedUserData();
  console.log('\n----- USERS SEEDED -----\n');
  await seedFavoriteData();
  console.log('\n----- Favorite SEEDED -----\n');
  

  process.exit(0);
};

seedAll();

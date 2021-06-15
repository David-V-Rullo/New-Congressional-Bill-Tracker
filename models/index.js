

const User = require('./User');
const Favorites = require('./Favorites');


User.hasMany(Favorites, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Favorites.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports = { User, Favorites };

const User = require('./user');
const Post = require('./post');
const Favorite = require("./favorite")

User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

User.hasMany(Favorite, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Post.belongsTo(User, {
  foreignKey: 'user_id'
});

Favorite.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Post, Favorite };


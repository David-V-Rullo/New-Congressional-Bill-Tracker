const { Favorite } = require('../models');


const favoriteData = [
  {
    bill_id: "s-12345",
    sponsor_name: 'John Clark',
    short_title: "test",
    introduced_date:"2021-03-03",
    house_passage: "2021-04-03",
    senate_passage: "2021-05-03",
    user_id: "1"
  },
  // {
  //   name: 'John Name',
  //   email: "jname@email.com",
  //   zip: 07102,
  //   password: "password123",
  // },

];

const seedFavoriteData = () => Favorite.bulkCreate(favoriteData);


module.exports = seedFavoriteData;


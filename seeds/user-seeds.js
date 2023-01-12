const User = require("../models/User");

const userData = [
  {
    username: "Vasco",
    password: "cmonin123!",
    email: "vasco@email.com",
  },
  {
    username: "Tatiana",
    password: "letmethrough123!",
    email: "tatiana@email.com",
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;

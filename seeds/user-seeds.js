const User = require("../models/User");

const userData = [
  {
    name: "Vasco",
    password: "cmonin123!",
    email: "vasco@email.com",
  },
  {
    name: "Tatiana",
    password: "letmethrough123!",
    email: "tatiana@email.com",
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;

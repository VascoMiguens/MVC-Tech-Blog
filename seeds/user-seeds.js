const User = require("../models/User");

const userData = [
  {
    name: "Vasco",
    password: "cmonin123!",
  },
  {
    name: "Tatiana",
    password: "letmethrough123!",
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;

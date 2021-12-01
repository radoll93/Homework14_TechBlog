const { User } = require('../models');

const userdata = [
  {
    username: 'Sam',
    email: 'Sam1@email.com',
    password: 'SamSam',
  },
  {
    username: 'Bora',
    email: 'Bora1@email.com',
    password: 'BoraBora',
  },
  {
    username: 'Aiden',
    email: 'Aiden1@email.com',
    password: 'AidenAiden',
  },
  {
    username: 'Kim',
    email: 'Kim1@email.com',
    password: 'KimKim',
  },
];

const seedUsers = () => User.bulkCreate(userdata);

module.exports = seedUsers;

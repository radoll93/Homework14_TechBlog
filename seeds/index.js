const sequelize = require('../config/connection');
const seedTopics = require('./topicData');
const seedComments = require('./commentData');
const seedUsers = require('./userData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUsers();

  await seedTopics();

  await seedComments();


  process.exit(0);
};

seedAll();

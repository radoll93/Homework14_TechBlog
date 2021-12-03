const { Topic } = require('../models');

const topicdata = [
  {
    title: 'HTML',
    content: 'It is HTML',
    user_id: 1,
  },
  {
    title: 'CSS',
    content: 'It is CSS',
    user_id: 2,
  },
  {
    title: 'Javascript',
    content: 'It is JS',
    user_id: 3,
  },
  {
    title: 'Node',
    content: 'It is Node',
    user_id: 4,
  },
];

const seedTopics = () => Topic.bulkCreate(topicdata);

module.exports = seedTopics;

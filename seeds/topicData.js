const { Topic } = require('../models');

const topicdata = [
  {
    title: 'HTML',
    content: 'It is HTML',
    posting_date: '2021-11-30',
    user_id: 1,
  },
  {
    title: 'CSS',
    content: 'It is CSS',
    posting_date: '2021-11-30',
    user_id: 2,
  },
  {
    title: 'Javascript',
    content: 'It is JS',
    posting_date: '2021-11-30',
    user_id: 3,
  },
  {
    title: 'Node',
    content: 'It is Node',
    posting_date: '2021-11-30',
    user_id: 4,
  },
];

const seedTopics = () => Topic.bulkCreate(topicdata);

module.exports = seedTopics;

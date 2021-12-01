const { Comment } = require('../models');

const commentdata = [
  {
    comment: 'it is good',
    user_id: '1',
    topic_id: '1',
  },
  {
    comment: 'it is bad',
    user_id: '2',
    topic_id: '1',
  },
  {
    comment: 'it is soso',
    user_id: '2',
    topic_id: '3',
  },
  {
    comment: 'it is suck',
    user_id: '4',
    topic_id: '2',
  },
];

const seedComments = () => Comment.bulkCreate(commentdata);

module.exports = seedComments;

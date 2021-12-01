const User = require('./User');
const Topic = require('./Topic');
const Comment = require('./Comment');

Topic.hasMany(Comment, {
  foreignKey: 'topic_id',
});

Comment.belongsTo(Topic, {
  foreignKey: 'topic_id',
});

User.hasMany(Topic, {
  foreignKey: 'user_id',
});

Topic.belongsTo(User, {
  foreignKey: 'user_id',
});

Comment.belongsTo(User, {
  foreignKey: 'user_id'
})

User.hasMany(Comment, {
  foreignKey: 'user_id',
});


module.exports = { User, Topic, Comment };

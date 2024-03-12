const User = require('./User');
const BlogPost = require('./BlogPost');
const Comment = require('./Comments')

User.hasMany(BlogPost, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

BlogPost.hasMany(Comment, {
    foreignKey: 'postId',
    onDelete: 'CASCADE'
})

BlogPost.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(BlogPost, {
    foreignKey: 'postId'
});

module.exports = { User, BlogPost, Comment };
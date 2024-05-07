const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    body: {
        type: String,
        required: [true, 'You must enter a body'],
        minlength: [3, 'Body must be at least 3 characters long'],
        maxlength: [280, 'Body cannot exceed 280 characters']
    },
    imageUrl: {
        type: String,
        required: [true, 'You must provide an image URL']
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    authorId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

PostSchema.methods.addImageUrl = function(imageUrl) {
    this.imageUrl = imageUrl;
    return this.save();
};

PostSchema.methods.addComment = function(commentId) {
    this.comments.push(commentId);
    return this.save();
};

PostSchema.methods.updateComment = function(commentId, updatedText) {
    const commentIndex = this.comments.findIndex(comment => comment.toString() === commentId.toString());
    if (commentIndex !== -1) {
        this.comments[commentIndex].text = updatedText;
        return this.save();
    } else {
        throw new Error('Comment not found');
    }
};

PostSchema.methods.removeComment = function(commentId) {
    this.comments = this.comments.filter(comment => comment.toString() !== commentId.toString());
    return this.save();
};

PostSchema.methods.addLike = function(userId) {
    if (!this.likes.includes(userId)) {
        this.likes.push(userId);
    }
    return this.save();
};

PostSchema.methods.removeLike = function(userId) {
    this.likes = this.likes.filter(like => like.toString() !== userId.toString());
    return this.save();
};


module.exports = mongoose.model('Post', PostSchema);

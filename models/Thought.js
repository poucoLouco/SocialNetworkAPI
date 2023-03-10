const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

// thoughtText
// String
// Required
// Must be between 1 and 280 characters

const thoughtSchema = new Schema(
    {
      thoughtText: {
        type: String,
        required: true,
        maxlength: 280,
        minlength: 1,
      },
//createdAt
// Date
// Use a getter method to format the timestamp on query
// Set default value to the current timestamp

createdAt: {
    type: Date,
    default: Date.now,
  },

// username (The user that created this thought)
// String
// Required

username: {
    type: String,
    required: true,
  },

// reactions (These are like replies)
// Array of nested documents created with the reactionSchema

reactions: [reactionSchema],
},
{
  toJSON: {
    virtuals: true,
  },
}
);

// Schema Settings
// Create a virtual called reactionCount that retrieves the length 
//of the thought's reactions array field on query.
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

module.exports = Thought;
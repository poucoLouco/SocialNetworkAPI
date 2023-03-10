const {model} = require('mongoose');
const moment = require('moment');

//User
// username:
// String
// Unique
// Required
// Trimmed
const UserSchema = new Schema({
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },

    // email
    // String
    // Required
    // Unique
    // Must match a valid email address (look into Mongoose's matching validation)

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
    },

    // thoughts

    // Array of _id values referencing the Thought model

    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
      ],

    //   friends

    //   Array of _id values referencing the User model (self-reference)

    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
    },
    { 
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
  );


//   Create a virtual called friendCount
//    that retrieves the length of the user's friends array field on query.

  UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
  });

  module.exports = User;
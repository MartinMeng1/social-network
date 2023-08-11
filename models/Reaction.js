

const { Schema } = require('mongoose');

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(), // Default value is a new ObjectId
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280, // 280 character maximum
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      getters: true, // Enable getter functions for virtual properties
    },
  }
);

// Format the createdAt timestamp using a getter method
reactionSchema.virtual('formattedCreatedAt').get(function () {
  return this.createdAt.toLocaleString(); // Customize the date format as per your requirement
});

module.exports = reactionSchema;
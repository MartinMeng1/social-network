const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const thoughtSchema = new Schema(
    {
        thoughtText:{
            type:String,
            required:true,
            minlength: 1, // Minimum length of 1 character
            maxlength: 280, // Maximum length of 280 characters
        },

        createdAt:{
            type: Date,
            default: Date.now,
        },
        username:{
            type:String,
            required:true,
        },
        reactions:[reactionSchema]
    },
    {
      toJSON: {
        virtuals: true,
        getters: true, // Enable getter functions for virtual properties
      },

})

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
  });
  
thoughtSchema.virtual('formattedCreatedAt').get(function () {
    return this.createdAt.toLocaleString(); // Customize the date format as per your requirement
  });
  // Create the Thought model using the thoughtSchema
  const Thought = model('Thought', thoughtSchema);
  
  // Export the Thought model
  module.exports = Thought;
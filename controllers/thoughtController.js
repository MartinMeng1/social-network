const { User, Thought } = require('../models');

module.exports = {

async getThoughts(req,res){
    try{
        const thoughts = await Thought.find();
        res.json(thoughts);
    }
    catch (err){
        res.status(500).json(err)
    }
},

async getSingleThought(req,res){
    try{
        const thought = await Thought.findOne({_id : req.params.thoughtId})

        if(!thought){
          return res.status(404).json({ message: "No thought is found with this ID" });
        }

        res.json({thought, reactionCount:thought.reactionCount})
    }catch(err){
        res.status(500).json(err)
    }
},

async createThought(req,res){
    try{
        const thought = await Thought.create(req.body)
        res.json(thought)
    } catch(err){
        console.log(err)
        res.status(500).json(err)
    }

},

async updateThought(req, res) {
    const { thoughtId } = req.params;
    const { thoughtText } = req.body;
  
    try {
      const updatedThought = await Thought.findOneAndUpdate(
        { _id: thoughtId },
        { $set: { thoughtText } },
        { new: true, runValidators: true }
      );
  
      if (!updatedThought) {
        return res.status(404).json({ message: 'No thought found with this ID' });
      }
  
      res.json(updatedThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

async deleteThought(req,res){
    try{
        const thought = await Thought.findOneAndDelete({_id:req.params.thoughtId})
        if(!thought){
            res.status(404).json({ message: "No user is found with this ID" });
        }
        res.json({ message : 'Thought deleted!'})
    } catch(err){
        res.status(500).json(err)
    }
},

async addReaction(req,res){
    try{
        const thought = await Thought.findByIdAndUpdate(
            req.params.thoughtId,
            { $addToSet: { reactions: { reactionId: req.params.reactionId } } },
            { new: true}
        );

        if(!thought){
            res.status(404).json({ message: "No thought is found with this ID" });
      } else {
        res.status(200).json({ message: "reaction added successfully" });
        }
    } catch(err) {
        res.status(500).json(err);
    }
},

async deleteReaction(req, res) {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
      );
  
      if (!thought) {
        return res.status(404).json({ message: "No thought is found with this ID" });
      }
  
      res.status(200).json({ message: "Reaction removed successfully" });
    } catch (err) {
      res.status(500).json(err);
    }
  }
}


// This file is adapted from the courseController.js file in the module 18 mini-project

const { Thought, User } = require('../models');
module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
              .select('-__v');

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that id' });
            }  
            res.json(thought);
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: { thoughts: thought._id } },
                { new: true }
            )
            res.json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    }
}
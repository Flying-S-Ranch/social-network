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
    // The following route is adapted from the example in module 18, activity 26, appController.js file
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: { thoughts: thought._id } },
                { new: true }
            );

            if (!user) {
                return res.status(404).json({
                    message: 'Thought added without associated user, no user found with this id'
                })
            }
            res.json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId},
                { $set: req.body },
                { new: true}
            );
            if (!thought) {
                return res.status(404).json({ message: 'No thought found with this id'})
            }
            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });
    
            if (!application) {
                return res.status(404).json({ message: 'no thought found with this id' });
            }
    
            const user = await User.findOneAndUpdate(
                { applications: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true }
            );
    
            if (!user) {
                return res.status(404).json({
                    message: 'thought deleted, but no user with this id'
                });
            }
            res.json({ message: 'thought deleted' });

        } catch (err) {
            res.status(500).json(err)
        } 
    }
}
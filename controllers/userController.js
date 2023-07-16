// This file is adapted from module 18, activity 26, userController.js file

const { User, Application } = require('../models');

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
                .select('-__v');

            if (!user) {
                return res.status(404).json({ message: 'no user found with this id' });
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { new: true }
            )
            if (!user) {
                return res.status(404).json({ message: 'no user found with that id' })
            }
            res.json(user)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async deleteUser(req,res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });
            if (!user) {
                return res.status(404).json({ message: 'no user found with that id' });
            }
            await Thought.deleteMany({ _id: { $in: user.thoughts } });
            res.json({ message: 'user and their thoughts have been deleted' })
        } catch (err) {
            res.status(500).json(err)
        }
    }
}
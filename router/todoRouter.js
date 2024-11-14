const express = require('express')
const Task = require('../Models/Todo');
const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const docs = await Task.find();
        res.json(docs);
    } catch (err) {
        console.log(err);

    }
});

    router.post('/', async (req, res) => {
        const task = new Task(req.body);
        try {
            const doc = await task.save();
            res.json(doc);  // Send the saved task as the response
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Error saving task" });
        }
    });
router.put('/:id', async (req, res) => {
    try {
        const doc = await Task.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        );
        res.json(doc);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error updating task" });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const doc = await Task.findByIdAndDelete(req.params.id);
        res.json(doc);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error deleting task" });
    }
});

    module.exports = router
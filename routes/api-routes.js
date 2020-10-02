const express = require('express');
const router = require("express").Router();
const Workout = require("../models/workout.js");

router.get('/api/workouts', (req, res) => {
    // find all workout records
    Workout.find({}, (err, workouts) => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.json(workouts);
        }
    });
});

router.get('/api/workouts/range', (req, res) => {
    Workout.find({}, (err, workouts) => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.json(workouts);
        }
    });
});

router.put('/api/workouts/:id', (req, res) => {
    Workout.findOneAndUpdate({ _id: req.params.id }, { $push: { exercises: req.body } }, (err, workout) => {
        if (err) {
            res.status(400).send(err);
        }
        else {
            res.json(workout);
        }
    });
});

router.post('/api/workouts', (req, res) => {
    const day = new Date();
    Workout.create({ day: day, exercises: [] }, (err, workouts) => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.json(workouts);
        }
    });
});

module.exports = router;
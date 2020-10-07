const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    day: {
        type: Date,
        required: true
    },
    exercises: [
        {
            workoutType: {
                type: String,
                enum: ["resistance", "cardio"],
                required: true
            },
            workoutName: {
                type: String,
                required: true
            },
            duration: {
                type: Number,
                required: true
            },
            weight: {
                type: Number,
                required: function () {
                    return this.type = "resistance";
                }
            },
            reps: {
                type: Number,
                required: function () {
                    return this.type = "resistance";
                },
                min: [2, "Must have at least two reps"],
                max: [600, "C'mon bro - Don't try and be a hero"]
            },
            sets: {
                type: Number,
                required: function () {
                    return this.type = "resistance";
                },
                min: [1, "Must have at least 1 set"]
            },
            distance: {
                type: Number,
                required: function () {
                    return this.type = "cardio";
                }
            }

        }
    ]
}, {
    // Virtuals are properties not stored in MongoDB
    toJSON: { virtuals: true }
});

workoutSchema.virtual('totalDuration').get( function() {
    return this.exercises.reduce((total, exercise) => total + exercise.duration, 0)
})

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
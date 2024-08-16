import express from "express";
// import * as workoutController from "../controllers/workout-controller.js";
const router = express.Router();
import fs from "fs";
import { v4 as uuid } from "uuid";

// router
//     .route("/")
//     // GET List of 
//     .get(workoutController.allworkout)
//     // POST/CREATE a New 
//     .post(workoutController.add);


router.get("/", (req, res) => {
    // res.send(200);
    const workoutBuffer = fs.readFileSync("./data/workout.json");
    const workoutData = JSON.parse(workoutBuffer);
    return res.json(workoutData);
});
router.get("/:date", (req, res) => {
    // res.send(200);
    const workoutBuffer = fs.readFileSync("./data/workout.json");
    const workoutData = JSON.parse(workoutBuffer);
    const filterData = workoutData.filter((currentWorkout) => {
        return currentWorkout.date === req.params.date;
    });
    return res.json(filterData);
});

router.post("/", (req, res) => {
    const newExercise = {
        id: uuid(),
        timeStamp: new Date(),
        date: req.body.date,
        workout: [
            {
                id: uuid(),
                exercise: req.body.exercise,
                sets: [
                    {
                        id: uuid(),
                        setNumber: req.body.setNumber,
                        reps: req.body.reps,
                        weight: req.body.weight,
                        rest: req.body.rest,
                        note: req.body.note
                    }]
            }]
    }
    const workoutBuffer = fs.readFileSync("./data/workout.json");
    const workoutData = JSON.parse(workoutBuffer);
    workoutData.push(newExercise);
    fs.writeFileSync("./data/workout.json", JSON.stringify(workoutData));
    res.send(200);
})

export default router;

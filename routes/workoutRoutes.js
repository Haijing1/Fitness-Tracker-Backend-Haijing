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

const workoutBuffer = fs.readFileSync("./data/workout.json");
const workoutData = JSON.parse(workoutBuffer);

router.get("/", (req, res) => {
    // res.send(200);
    return res.json(workoutData);
});

router.get("/:date", (req, res) => {
    const workoutBuffer = fs.readFileSync("./data/workout.json");
    const workoutData = JSON.parse(workoutBuffer);
    const foundDate = workoutData.filter((currentWorkout) => {
        return currentWorkout.date === req.params.date;
    });
    if (!foundDate) {
        res.status(404).send("Compliment not found the date")
    }
    return res.json(foundDate);
});

router.get("/exercise", (req, res) => {
    const workoutBuffer = fs.readFileSync("./data/workout.json");
    const workoutData = JSON.parse(workoutBuffer);
    // console.log(req.body.dateId)
    // console.log(req.body.exerciseId)
    const filterWorkout = workoutData.filter((currentDate) => {
        return currentDate.id === req.body.dateId;
    });
    // console.log(filterWorkout)
    const filterExercise = filterWorkout[0].workout.filter((currentExercise) => {
        return currentExercise.id === req.body.exerciseId;
    });
    // filterExercise[0].exercise
});

router.post("/", (req, res) => {
    const newExercise = {
        id: uuid(),
        timeStamp: new Date(),
        // date: currentDate,
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

router.post("/:date/workout", (req, res) => {
    const workoutBuffer = fs.readFileSync("./data/workout.json");
    const workoutData = JSON.parse(workoutBuffer);
    const filterData = workoutData.filter((currentData) => {
        return currentData.date === req.body.date;
    });

    if (filterData) {
        // console.log(filterData[0])
        const newExercise =
        {
            id: uuid(),
            exercise: req.body.exercise,
            sets: [{
                id: uuid(),
                setNumber: req.body.setNumber,
                reps: req.body.reps,
                weight: req.body.weight,
                rest: req.body.rest,
                note: req.body.note
            }]
        }

        filterData[0].workout.push(newExercise);

        workoutData.map((currentWorkout, index) => {
            if (currentWorkout.id === filterData.id) {
                return workoutData[index] = filterData[0];

            }
        })
        // console.log(workoutData)
        fs.writeFileSync("./data/workout.json", JSON.stringify(workoutData));
        return res.send(200);
    }
})

router.post("/addset", (req, res) => {
    const workoutBuffer = fs.readFileSync("./data/workout.json");
    const workoutData = JSON.parse(workoutBuffer);
    // console.log(req.body.dateId)
    // console.log(req.body.exerciseId)
    const filterWorkout = workoutData.filter((currentDate) => {
        return currentDate.id === req.body.dateId;
    });
    // console.log(filterWorkout)
    const filterExercise = filterWorkout[0].workout.filter((currentExercise) => {
        return currentExercise.id === req.body.exerciseId;
    });
    console.log("filterExercise:", filterExercise)
    if (filterWorkout) {
        const newSet =
        {
            id: uuid(),
            setNumber: req.body.setNumber,
            reps: req.body.reps,
            weight: req.body.weight,
            rest: req.body.rest,
            note: req.body.note
        }

        filterExercise[0].sets.push(newSet);

        workoutData.map((currentDate, index) => {
            if (currentDate.id === filterWorkout.id) {
                currentDate.map((currentExercise, index1) => {
                    if (currentExercise.id === filterExercise.id) {
                        return workoutData[index][index1] = filterExercise[0];
                    }
                })
            }
        })
        // console.log(workoutData)
        fs.writeFileSync("./data/workout.json", JSON.stringify(workoutData));
        return res.send(200);
    }

})


export default router;

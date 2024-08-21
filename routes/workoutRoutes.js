import express from "express";
const router = express.Router();
import fs from "fs";
import { v4 as uuid } from "uuid";


const workoutBuffer = fs.readFileSync("./data/workout.json");
const workoutData = JSON.parse(workoutBuffer);

router.get("/", (req, res) => {
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

router.post("/:date/workout", (req, res) => {
    const workoutBuffer = fs.readFileSync("./data/workout.json");
    const workoutData = JSON.parse(workoutBuffer);
    const filterData = workoutData.filter((currentData) => {
        console.log(req.body.date)
        return currentData.date === req.body.date;
    });
    console.log(filterData)
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
    if (filterData.length > 0) {
        filterData[0].workout.push(newExercise);

        workoutData.map((currentWorkout, index) => {
            if (currentWorkout.id === filterData.id) {
                return workoutData[index] = filterData[0];

            }
        })
        fs.writeFileSync("./data/workout.json", JSON.stringify(workoutData));
        return res.send(200);
    } else {
        const newDate = {
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
        workoutData.push(newDate);
        fs.writeFileSync("./data/workout.json", JSON.stringify(workoutData));
        return res.send(200);
    }
})

router.post("/addset", (req, res) => {
    const workoutBuffer = fs.readFileSync("./data/workout.json");
    const workoutData = JSON.parse(workoutBuffer);
    const filterWorkout = workoutData.filter((currentDate) => {
        return currentDate.id === req.body.dateId;
    });

    const filterExercise = filterWorkout[0].workout.filter((currentExercise) => {
        return currentExercise.id === req.body.exerciseId;
    });

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

        fs.writeFileSync("./data/workout.json", JSON.stringify(workoutData));
        return res.send(200);
    }

})


export default router;

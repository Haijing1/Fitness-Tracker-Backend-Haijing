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

// router.post("/:date/workout", (req, res) => {
//     const foundDate = workoutData.filter((currentWorkout) => {
//         return currentWorkout.date === req.params.date;
//     });

//     const newWorkout = {
//         id: uuid(),
//         setNumber: req.body.setNumber,
//         reps: req.body.reps,
//         weight: req.body.weight,
//         rest: req.body.rest,
//         note: req.body.note
//     }

//     foundDate.workout.push(newWorkout);

//     // if (!foundDate) {
//     //     res.status(404).send("Compliment not found the id")
//     // }

//     // fs.writeFileSync("./data/videos.json", JSON.stringify(workoutData));
//     // res.send(foundDate);
// });
// router.post("/:date", (req, res) => {
//     // res.send(200);
// const date = new Date();
// const day = date.getDate();
// const month = date.getMonth() + 1; // The month index starts from 0
// const year = date.getFullYear();
// const currentDate = `${day}-${month}-${year}`;
//     const newData = {
//         id: uuid(),
//         timeStamp: new Date(),
//         date: currentDate}

//     // const workoutBuffer = fs.readFileSync("./data/workout.json");
//     // const workoutData = JSON.parse(workoutBuffer);
//     // const filterData = workoutData.filter((currentWorkout) => {
//     //     return currentWorkout.date === req.params.date;
//     // });
//     return res.json(filterData);
// });


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



router.post("/:date/add-exercise", (req, res) => {
    const workoutBuffer = fs.readFileSync("./data/workout.json");
    const workoutData = JSON.parse(workoutBuffer);
    const filterData = workoutData.filter((currentData) => {
        return currentData.date === req.body.date;
    });

    // const filterWorkout = filterData.find((currentWorkout) => {
    //     return currentWorkout.date === req.body.exercise;
    // });

    if (filterData) {
        console.log(filterData)
        const newExercise = [
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
            }]
        // const workoutBuffer = fs.readFileSync("./data/workout.json");
        // const workoutData = JSON.parse(workoutBuffer);

        filterData.push(newExercise);
        fs.writeFileSync("./data/workout.json", JSON.stringify(filterData));
        // res.send(200);
    }
    //     // else {
    //     //     const newExercise = {
    //     //         id: uuid(),
    //     //         timeStamp: new Date(),
    //     //         // date: currentDate,
    //     //         date: req.body.date,
    //     //         workout: [
    //     //             {
    //     //                 id: uuid(),
    //     //                 exercise: req.body.exercise,
    //     //                 sets: [
    //     //                     {
    //     //                         id: uuid(),
    //     //                         setNumber: req.body.setNumber,
    //     //                         reps: req.body.reps,
    //     //                         weight: req.body.weight,
    //     //                         rest: req.body.rest,
    //     //                         note: req.body.note
    //     //                     }]
    //     //             }]
    //     //     }
    //     //     // const workoutBuffer = fs.readFileSync("./data/workout.json");
    //     //     // const workoutData = JSON.parse(workoutBuffer);
    //     //     workoutData.push(newExercise);
    //     //     fs.writeFileSync("./data/workout.json", JSON.stringify(workoutData));
    //     //     res.send(200);
    // }
})

export default router;

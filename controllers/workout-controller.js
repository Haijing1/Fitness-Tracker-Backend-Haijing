import initKnex from "knex";
import configuration from "../knexfile.js";

const knex = initKnex(configuration);

// const allworkout = async (_req, res) => {
//     try {
//         const data = await knex("warehouses");
//         res.status(200).json(data);
//     } catch (err) {
//         res.status(400).send(`Error retrieving workouts data: ${err}`);
//     }
// };
// const add = async (req, res) => {
//     const {
//         id,
//         date,
//         workout: [
//             {
//                 id,
//                 exercise,
//                 sets: [
//                     {
//                         id,
//                         reps,
//                         weight,
//                         rest,
//                         note
//                     },
//     } = req.body;

//     try {
//         const result = await knex("warehouses").insert(req.body);
//         const newWarehouseId = result[0];
//         const createdWarehouse = await knex("warehouses").where({
//             id: newWarehouseId,
//         });
//         res.status(201).json(createdWarehouse);
//     } catch (error) {
//         res.status(500).json({
//             message: `Unable to create new warehouse: ${error}`,
//         });
//     }
// };

// export { allworkout, add };
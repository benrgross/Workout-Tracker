const db = require("../models");

module.exports = (app) => {
  app.get("/api/workouts", async (req, res) => {
    try {
      const workouts = await db.Workout.aggregate([
        {
          $addFields: {
            totalDuration: { $sum: "$exercises.duration" },
          },
        },
      ]);
      res.json(workouts);
    } catch (err) {
      throw new Error(err);
    }
  });

  app.post("/api/workouts", async (req, res) => {
    try {
      const workouts = await db.Workout.create({});
      res.json(workouts);
    } catch (err) {
      throw new Error(err);
    }
  });

  app.put("/api/workouts/:id", async ({ body, params }, res) => {
    try {
      const workouts = await db.Workout.findByIdAndUpdate(
        params.id,
        {
          $push: { exercises: body },
        },
        { new: true }
      );
      res.json(workouts);
    } catch (err) {
      throw new Error(err);
    }
  });

  app.get("/api/workouts/range", async (req, res) => {
    try {
      const workouts = await db.Workout.aggregate([
        {
          $addFields: {
            totalDuration: { $sum: "$exercises.duration" },
          },
        },
      ])
        .sort({ day: -1 })
        .limit(7);
      console.log(workouts);
      res.send(workouts);
    } catch (err) {
      throw new Error(err);
    }
  });
};

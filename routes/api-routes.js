const db = require("../models");

module.exports = (app) => {
  app.get("/api/workouts", async (req, res) => {
    try {
      const workouts = await db.Workout.find();
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
        { $push: { exercises: body } },
        { new: true, runValidators: true }
      );
      res.json(workouts);
    } catch (err) {
      throw new Error(err);
    }
  });
};

const express = require("express");
const router = express.Router();
const State = require("../useCases/state");

router.get("/");

router.post("/", async (req, res, next) => {
  try {
    const { nameState } = req.body;
    const stateCreate = await State.create(nameState);
    res.json({
      success: true,
    });
  } catch (error) {}
});

module.exports = router;

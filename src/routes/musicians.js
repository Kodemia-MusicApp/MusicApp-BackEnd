const router = require("express").Router();
const musician = require("../useCases/musician");

router.get("/", async (req, res, next) => {
  console.log("entra");
  res.json({
    message: "Entra",
  });
});

router.get("/:id", async (req, res, next) => {
  console.log("Entra get id");
});

router.post("/", async (req, res, next) => {
  console.log("Entra post");
});

module.exports = router;

const router = require('express').Router()
const{ profillingControllers } = require("../controllers")

router.get("/", profillingControllers.testing)
router.patch("/update/:id", profillingControllers.update)

module.exports = router
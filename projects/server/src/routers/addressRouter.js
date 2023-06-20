const router = require('express').Router()
const{ addressControllers } = require("../controllers")
const { fileUploader } = require("../middleware/multer")

router.post("/address/:id", addressControllers.signA)


module.exports = router
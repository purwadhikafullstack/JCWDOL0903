const router = require('express').Router()
const{ profillingControllers } = require("../controllers")
const { fileUploader } = require("../middleware/multer")


router.get("/", profillingControllers.testing)
router.post("/update/:id", fileUploader({destinationFolder:"avatar"}).single("profile_picture"), profillingControllers.update)
router.post("/address/:id", profillingControllers.signAddress)
router.get("/address/:id", profillingControllers.getAddress)
router.patch("/address", profillingControllers.setAddress)


module.exports = router
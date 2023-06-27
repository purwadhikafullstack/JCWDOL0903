const router = require('express').Router()
const{ rajaOngkirControllers } = require("../controllers")

router.get("/province", rajaOngkirControllers.getProvince)
router.post("/city",rajaOngkirControllers.getCity)

module.exports = router;


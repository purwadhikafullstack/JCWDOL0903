const router = require('express').Router()
const{ rajaOngkirControllers } = require("../controllers")

router.get("/province", rajaOngkirControllers.getProvince)
router.post("/city",rajaOngkirControllers.getCity)
router.post("/city/rajaongkir", rajaOngkirControllers.getRajCity)
router.post("/kecamatan",rajaOngkirControllers.getKecamatan)
router.post("/ongkir", rajaOngkirControllers.getOngkir)

module.exports = router;


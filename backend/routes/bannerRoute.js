const express = require("express");
const { getBanner, updateBanner } = require("../controllers/bannerController");
const router = express.Router();

router.get("/", getBanner);
router.post("/", updateBanner);

module.exports = router;

const mongoose = require("mongoose");

const bannerSchema = mongoose.Schema(
  {
    heading: { type: String, required: true },
    buttonText: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

const Banner = mongoose.model("Banner", bannerSchema);

module.exports = Banner;

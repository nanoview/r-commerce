const Banner = require("../models/Banner");

// Fetch the banner
const getBanner = async (req, res) => {
  try {
    const banner = await Banner.findOne(); // Assuming a single banner document
    res.status(200).json(banner || {});
  } catch (error) {
    res.status(500).json({ message: "Error fetching banner", error: error.message });
  }
};

// Update the banner
const updateBanner = async (req, res) => {
  try {
    const { heading, buttonText, image } = req.body;
    let banner = await Banner.findOne();
    if (!banner) {
      banner = new Banner({ heading, buttonText, image });
    } else {
      banner.heading = heading;
      banner.buttonText = buttonText;
      banner.image = image;
    }
    await banner.save();
    res.status(200).json({ message: "Banner updated successfully", banner });
  } catch (error) {
    res.status(500).json({ message: "Error updating banner", error: error.message });
  }
};

module.exports = { getBanner, updateBanner };

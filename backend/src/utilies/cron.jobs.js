// src/jobs/cronJob.js
const cron = require("node-cron");
const PromoModel = require("../modules/promo/promo.model");
const { Status } = require("../config/constants.config");

cron.schedule("0 0 * * *", async () => { // Runs daily at midnight
  try {
    const currentDate = new Date();
    
    // Update expired promos to INACTIVE
    await PromoModel.updateMany(
      { validTo: { $lt: currentDate } }, 
      { $set: { status: Status.INACTIVE } }
    );

    console.log("✅ Promo statuses updated based on expiration dates");
  } catch (error) {
    console.error("❌ Error updating promo statuses:", error);
  }
});

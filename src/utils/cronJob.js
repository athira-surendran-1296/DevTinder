const { subDays, startOfDay, endOfDay } = require("date-fns");
const cron = require("node-cron");
const ConnectionRequest = require("../models/connectionRequest");

const sendEmailToReviewPendingRequests = async () => {
  try {
    const yesterday = subDays(new Date(), 1);
    const yesterdayStart = startOfDay(yesterday);
    const yesterdayEnd = endOfDay(yesterday);

    const pendingRequests = await ConnectionRequest.find({
      status: "interested",
      createdAt: {
        $gte: yesterdayStart,
        $lt: yesterdayEnd,
      },
    }).populate("fromUserId toUserId");

    const listOfEmails = [
      ...new Set(pendingRequests.map((req) => req.toUserId.emailId)),
    ];

    for (const email of listOfEmails) {
      // send email
      try {} catch(err) {
        console.log(err);
      }
    }
  } catch (err) {
    console.log(err);
  }
};

// “At 08:00.”
cron.schedule("0 8 * * *", () => {
  sendEmailToReviewPendingRequests();
});

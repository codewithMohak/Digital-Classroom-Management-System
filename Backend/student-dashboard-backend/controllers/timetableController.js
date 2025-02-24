const Timetable = require("../models/Timetable");


// Get timetable for a specific date
const getTimetable = async (req, res) => {
  try {
    await sendNotification(req.body.studentId, `New event added on ${req.params.date}`);
    const timetable = await Timetable.findOne({ date: req.params.date });
    if (!timetable) return res.status(404).json({ message: "No events found" });

    res.json(timetable);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add new events
const updateTimetable = async (req, res) => {
  try {
    const timetable = await Timetable.findOneAndUpdate(
      { date: req.params.date },
      { $push: { events: req.body.events } },
      { new: true, upsert: true }
    );

    res.json(timetable);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getTimetable, updateTimetable };

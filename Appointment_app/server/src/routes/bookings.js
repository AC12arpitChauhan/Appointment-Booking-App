import express from "express";
import Booking from "../models/Booking.js";

const router = express.Router();

// GET all bookings (sorted by start time)
router.get("/", async (req, res) => {
  const bookings = await Booking.find().sort({ start: 1 }).lean();
  res.json(bookings);
});

// POST create booking (conflict-safe)
router.post("/", async (req, res) => {
  try {
    const { title, email, start } = req.body;
    if (!title || !email || !start) {
      return res.status(400).json({ message: "title, email and start are required" });
    }

    // Normalize to Date
    const startDate = new Date(start);
    if (isNaN(startDate.getTime())) {
      return res.status(400).json({ message: "Invalid start datetime" });
    }

    // Extra conflict check (helpful ux; DB unique index is the hard guard)
    const exists = await Booking.findOne({ start: startDate });
    if (exists) {
      return res.status(409).json({ message: "This time slot is already booked" });
    }

    const booking = await Booking.create({ title, email, start: startDate });
    res.status(201).json(booking);
  } catch (err) {
    // Handle unique index race safely
    if (err?.code === 11000) {
      return res.status(409).json({ message: "This time slot is already booked" });
    }
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE a booking by id
router.delete("/:id", async (req, res) => {
  await Booking.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

export default router;

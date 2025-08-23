
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/booking_app", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(" MongoDB connected"))
  .catch((err) => console.error(err));

// Schema + Model
const bookingSchema = new mongoose.Schema({
  title: String,
  email: String,
  date: Date,
});
const Booking = mongoose.model("Booking", bookingSchema);

// Routes
app.get("/api/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ date: 1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/bookings", async (req, res) => {
  try {
    const { title, email, date } = req.body;
    const newBooking = new Booking({ title, email, date });
    await newBooking.save();
    res.json(newBooking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`✅ API listening on ${PORT}`));



app.get("/api/bookings", async (req, res) => {
    try {
      const bookings = await Booking.find();
      res.json(bookings);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });


  //  Get all bookings
app.get("/api/bookings", async (req, res) => {
    try {
      const bookings = await Booking.find().sort({ start: 1 }); // sorted by time
      res.json(bookings);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch bookings" });
    }
  });
  
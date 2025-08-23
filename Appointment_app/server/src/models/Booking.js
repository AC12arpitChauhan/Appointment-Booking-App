import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    // single source of truth: the slot start time in ISO (Date)
    start: { type: Date, required: true, unique: true }
  },
  { timestamps: true }
);

// Ensure the unique index exists (prevents same date+time bookings)
BookingSchema.index({ start: 1 }, { unique: true });

export default mongoose.model("Booking", BookingSchema);

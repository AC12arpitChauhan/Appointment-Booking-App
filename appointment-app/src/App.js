import React, { useState } from "react";
import Calendar from "./components/Calendar";
import SlotPicker from "./components/SlotPicker";
import BookingForm from "./components/BookingForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bookings, setBookings] = useState([]);

  const handleBooking = (userData) => {
    const newBooking = {
      date: selectedDate.toDateString(),
      slot: selectedSlot,
      ...userData,
    };

    // Prevent double booking
    const isBooked = bookings.find(
      (b) => b.date === newBooking.date && b.slot === newBooking.slot
    );
    if (isBooked) {
      toast.error("Slot already booked!");
      return;
    }

    setBookings([...bookings, newBooking]);
    toast.success("Booking Confirmed!");
    setSelectedSlot(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">📅 Appointment Booking</h1>
      
      <Calendar onChange={setSelectedDate} />
      {selectedDate && (
        <SlotPicker date={selectedDate} onSelectSlot={setSelectedSlot} />
      )}
      {selectedSlot && (
        <BookingForm onSubmit={handleBooking} slot={selectedSlot} />
      )}

      <ToastContainer position="bottom-right" />
    </div>
  );
}

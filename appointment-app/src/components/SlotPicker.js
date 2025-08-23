import React from "react";

const slots = ["10:00 AM", "11:00 AM", "12:00 PM", "02:00 PM", "03:00 PM"];

export default function SlotPicker({ date, onSelectSlot }) {
  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold">
        Available Slots on {date.toDateString()}
      </h2>
      <div className="flex gap-3 mt-2 flex-wrap">
        {slots.map((slot) => (
          <button
            key={slot}
            onClick={() => onSelectSlot(slot)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {slot}
          </button>
        ))}
      </div>
    </div>
  );
}

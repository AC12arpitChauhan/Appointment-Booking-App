import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Calendar({ onChange }) {
  return (
    <div className="mb-4">
      <DatePicker
        selected={null}
        onChange={onChange}
        placeholderText="Select a date"
        className="p-2 border rounded"
      />
    </div>
  );
}

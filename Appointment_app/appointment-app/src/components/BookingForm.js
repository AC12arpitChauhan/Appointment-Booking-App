import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";

export default function BookingForm({ onSubmit, slot }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) return;
    onSubmit({ name, email, slot });
    setName("");
    setEmail("");
  };

  return (
    <Box mt={3}>
      <Typography variant="h6" gutterBottom>
        Booking for {slot.date.toDateString()} at {slot.time}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Full Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          label="Email Address"
          type="email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: "1rem" }}
        >
          Confirm Booking
        </Button>
      </form>
    </Box>
  );
}

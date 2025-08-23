import React from "react";
import { Typography, Button, Grid } from "@mui/material";

const slots = [
  "09:00 AM", "10:00 AM", "11:00 AM",
  "01:00 PM", "02:00 PM", "03:00 PM",
  "04:00 PM", "05:00 PM",
];

export default function SlotPicker({ date, onSelectSlot }) {
  return (
    <div style={{ marginTop: "1.5rem" }}>
      <Typography variant="h6" gutterBottom>
        Select a Slot for {date.toDateString()}
      </Typography>
      <Grid container spacing={2}>
        {slots.map((slot) => (
          <Grid item key={slot}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => onSelectSlot({ date, time: slot })}
            >
              {slot}
            </Button>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

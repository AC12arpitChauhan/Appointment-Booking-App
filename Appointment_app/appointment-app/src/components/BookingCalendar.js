import React from "react";
import {
  Typography,
  Card,
  CardContent,
  Grid,
} from "@mui/material";

export default function BookingCalendar({ bookings }) {
  return (
    <div style={{ marginTop: "2rem" }}>
      <Typography variant="h5" gutterBottom color="secondary">
        Your Appointments
      </Typography>
      <Grid container spacing={2}>
        {bookings.map((booking, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Card elevation={2}>
              <CardContent>
                <Typography variant="h6">{booking.name}</Typography>
                <Typography color="textSecondary">{booking.email}</Typography>
                <Typography>
                  {booking.slot.date.toDateString()} at {booking.slot.time}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Paper,
  Grid,
  Card,
  CardContent,
  IconButton,
  CssBaseline,
  Switch,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import EventIcon from "@mui/icons-material/Event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EmailIcon from "@mui/icons-material/Email";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [bookings, setBookings] = useState([]);

  // Dialog state
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    email: "",
    time: "",
  });

  // MUI Theme
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: { main: "#1976d2" },
      secondary: { main: "#9c27b0" },
    },
  });

  // Handle booking
  const handleBook = () => {
    if (!form.title || !form.email || !form.time) {
      alert("Please fill all fields");
      return;
    }

    const newBooking = {
      title: form.title,
      email: form.email,
      date:
        selectedDate.toDateString() +
        " at " +
        form.time,
    };

    setBookings([...bookings, newBooking]);
    setForm({ title: "", email: "", time: "" });
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* Header */}
      <AppBar position="static" color="primary" sx={{ mb: 4 }}>
        <Toolbar>
          <EventIcon sx={{ mr: 2 }} />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Appointment Booking
          </Typography>

          {/* Dark Mode Toggle */}
          <IconButton color="inherit" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <Switch
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
            color="default"
          />
        </Toolbar>
      </AppBar>

      <Container maxWidth="md">
        {/* Calendar */}
        <Paper elevation={4} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
          <Typography variant="h6" gutterBottom>
            Select a Date
          </Typography>
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            className="react-calendar-modern"
          />

          {/* Book Appointment Button */}
          <Button
            variant="contained"
            color="secondary"
            sx={{ mt: 3 }}
            onClick={() => setOpen(true)}
          >
            Book Appointment
          </Button>
        </Paper>

        {/* Appointments */}
        <Typography variant="h6" color="secondary" gutterBottom>
          Your Appointments
        </Typography>
        <Grid container spacing={3}>
          {bookings.map((booking, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Card elevation={3} sx={{ borderRadius: 3 }}>
                <CardContent>
                  <Typography variant="h6" color="primary" gutterBottom>
                    {booking.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <EmailIcon fontSize="small" sx={{ mr: 1 }} /> {booking.email}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mt: 1,
                    }}
                  >
                    <AccessTimeIcon fontSize="small" sx={{ mr: 1 }} />{" "}
                    {booking.date}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Booking Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Book Appointment</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            fullWidth
            margin="normal"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <TextField
            label="Time"
            type="time"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={form.time}
            onChange={(e) => setForm({ ...form, time: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleBook} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}

import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";

function App() {
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      background: {
        default: darkMode ? "#121212" : "#f5f5f5",
        paper: darkMode ? "#1e1e1e" : "#fff",
      },
    },
  });

  // Backend API URL
  const API_BASE = "https://appointment-booking-app-v9za.onrender.com";

  // Fetch appointments from backend
  useEffect(() => {
    axios
      .get(`${API_BASE}/api/bookings`)
      .then((res) => setAppointments(res.data))
      .catch((err) => console.error(err));
  }, [API_BASE]);

  // Book appointment
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !email || !date) return alert("Please fill all fields");

    try {
      const res = await axios.post(`${API_BASE}/api/bookings`, {
        title,
        email,
        date,
      });
      setAppointments([...appointments, res.data]); // update UI
      setTitle("");
      setEmail("");
      setDate("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          bgcolor: "background.default",
          color: "text.primary",
          minHeight: "100vh",
          py: 4,
        }}
      >
        <Container maxWidth="sm">
          <Paper sx={{ p: 4, borderRadius: 2, boxShadow: 3 }}>
            <Typography variant="h4" align="center" gutterBottom>
              Appointment Booking
            </Typography>

            <FormControlLabel
              control={
                <Switch
                  checked={darkMode}
                  onChange={() => setDarkMode(!darkMode)}
                />
              }
              label="Dark Mode"
            />

            <form onSubmit={handleSubmit}>
              <TextField
                label="Title"
                fullWidth
                margin="normal"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <TextField
                label="Email"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                type="datetime-local"
                fullWidth
                margin="normal"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                sx={{ mt: 2 }}
              >
                Book Appointment
              </Button>
            </form>
          </Paper>

          {/* Upcoming Appointments */}
          <Paper sx={{ mt: 4, p: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              Upcoming Appointments
            </Typography>
            {appointments.length === 0 ? (
              <Typography variant="body2" color="text.secondary">
                No upcoming appointments
              </Typography>
            ) : (
              <List>
                {appointments.map((appt) => (
                  <ListItem key={appt._id}>
                    <ListItemText
                      primary={appt.title}
                      secondary={`${appt.email} — ${new Date(
                        appt.date
                      ).toLocaleString()}`}
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;

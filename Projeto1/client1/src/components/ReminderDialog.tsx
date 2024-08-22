import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
// MUI components
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Box from "@mui/material/Box";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";


// Predefined time options for the reminder.
const timeOptions = [
  { label: "8:00 AM - 12:00 PM", value: "8AM-12AM" },
  { label: "12:00 PM - 6:00 PM", value: "12PM-6PM" },
  { label: "6:00 PM - 10:00 PM", value: "6PM-22PM" },
  { label: "10:00 PM - 8:00 AM", value: "22PM-8AM" },
];

// ReminderDialog component to add reminders for activities.
export default function ReminderDialog(props) {
  const theme = useTheme();
  // Determines if the dialog should be full screen based on screen width.
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));

  // State for selected time and date.
  const [time, setTime] = useState("");
  const date = new Date();
  const [data, setData] = React.useState<Dayjs | null>(dayjs(date));

  // Function to add a reminder. It makes an API call to a server.
  async function addReminder(activityID: string, activityName: string) {
    try {
      // Ensure time is selected before proceeding.
      if (time !== "") {
        let dateFormatted = dayjs(data).format('MMMM DD, YYYY');
        // Post request to add the reminder.
        await fetch("http://localhost:8080/reminders", {
          body: JSON.stringify({
            time, date: dateFormatted, activityName, activityID
          }),
          headers: {
            "Content-type": "application/json"
          },
          method: "POST"
        });

        // Reset the form and close the dialog after successful addition.
        setData(dayjs(date));
        setTime("");
        props.handleClose();
        if (!props.messageAdded) {
          props.handleMessageAdd();
        }
      } else {
        alert("Fill all fields first"); // Prompt if time isn't selected.
      }
    } catch (error) {
      alert("Connection to the server failed"); // Error handling for failed connection.
    }
  }

  return (
    <Dialog fullScreen={fullScreen} open={props.open}>
      {props.activity.map((rec) => (
        <DialogContent key={rec._id} sx={{ overflow: "hidden" }}> {/* Adicionado overflow hidden para evitar barras de rolagem desnecessárias */}
          <DialogTitle>Add {rec.name} to a Reminder</DialogTitle>
          <Box
            noValidate
            component="form"
            sx={{
              display: "flex", // Mudado de 'center' para 'flex' para ter um controle melhor.
              flexDirection: "column",
              m: "auto",
              mt: 1, // Reduzido o espaço no topo
              width: "fit-content",
            }}
          >
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel htmlFor="time">Choose Time</InputLabel>
              <Select
                sx={{ mb: 4 }}
                label="Choose Time"
                value={time}
                required
                onChange={(newValue) => {
                  setTime(newValue.target.value);
                }}
                inputProps={{
                  name: "Time",
                  id: "time",
                }}
              >
                {timeOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  label="Pick a Date"
                  inputFormat="DD/MM/YYYY"
                  value={data}
                  onChange={(newValue) => {
                    setData(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>

              <DialogActions>
                <Button onClick={props.handleClose}>Cancel</Button>
                <Button
                  onClick={() => addReminder(rec._id, rec.name)}
                >
                  Add
                </Button>
              </DialogActions>
            </FormControl>
          </Box>
        </DialogContent>
      ))}
    </Dialog>
  );
}

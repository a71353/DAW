import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
//MUI components
import { CardActions, Card, CardContent, Typography, IconButton, Container, CardHeader } from "@mui/material";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
//Components
import Message from "./Message";
import DeleteDialogReminder from "./DeleteDialogReminder";
import Navigation from "./Navigation";
import Footer from "./Footer";

function Reminder() {
    const [reminder, setReminder] = useState([]);
    const [reminders, setReminders] = useState([]);
    const [message, setMessage] = useState("");

    const [openDelete, setOpenDelete] = React.useState(false);
    const [reminderID, setReminderID] = useState("");

    async function fetchReminder(ID: string) {
        console.log(ID)
        const response = await fetch("http://localhost:8080/reminders/" + ID)
        const json = await response.json()
        if (!json.message) {
            setReminder(json)
            console.log(json)
        }
    }

    async function deleteReminder(ID: string) {
        if (ID !== "") {
            await fetch("http://localhost:8080/reminders/" + ID, {
                method: "DELETE"
            })
        }
    }

    const handleClickOpenDelete = (ID: string) => {
        setReminderID(ID)
        fetchReminder(ID).catch(() => setMessage("Failed connecting to the server"));
        setOpenDelete(true);
    };

    async function fetchReminders() {
        const response = await fetch("http://localhost:8080/reminders")
        const json = await response.json()
        if (json.message) {
            setMessage(json.message)
            setReminders([])
        }
        else setReminders(json);
    }

    useEffect(() => {
        fetchReminders().catch(() => setMessage("Can't connect to the server"));
    }, []);

    return (
        <div>
            <Navigation />

            <Message message={message} handleClose={() => setMessage("")} />

            <DeleteDialogReminder
                open={openDelete}
                reminder={reminder}
                handleClose={() => {
                    setOpenDelete(false)
                }} handleDelete={() => {
                    setOpenDelete(false)
                    deleteReminder(reminderID).then(() => {
                        fetchReminders().catch(() => setMessage("Failed connecting to the server"))
                        setMessage("Reminder was concluded successfully")
                    }).catch(() => setMessage("Failed connecting to the server"))
                }}
            />

            <Container>
                {reminders.length > 0 && (
                    <Typography variant="h4" gutterBottom className="calendar-header">
                        Calendar
                    </Typography>
                )}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '10px' }}>
                    {reminders.map(reminder =>
                        <Card key={reminder._id} sx={{ mt: 3, boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)" }}>
                            <CardHeader title={`${reminder.date}`} />
                            <CardContent>
                                <Typography variant="body2" color="text.secondary">
                                    {reminder.activityName}       {reminder.time}
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing style={{ display: "flex", justifyContent: "flex-end" }}>
                                <Link to={{
                                    pathname: '/activity',
                                    search: `?id=${reminder.activityID}&time=${reminder.time}`
                                }}>
                                    <IconButton aria-label="delete" size="large" sx={{
                                        "&:hover": {
                                            color: "green",
                                        }
                                    }}>
                                        <OpenInNewIcon />
                                    </IconButton>
                                </Link>
                                <IconButton aria-label="done" sx={{
                                    "&:hover": {
                                        color: "green",
                                    }
                                }} onClick={() => handleClickOpenDelete(reminder._id)}>
                                    <TaskAltIcon />
                                </IconButton>
                            </CardActions>
                        </Card>
                    )}
                </div>
            </Container>

            <Footer />
        </div>
    );
}


export default Reminder;
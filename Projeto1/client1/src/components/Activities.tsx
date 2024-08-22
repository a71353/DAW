import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
// MUI components
import EditIcon from '@mui/icons-material/Edit';

import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Grid, InputAdornment, OutlinedInput } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import SearchIcon from "@mui/icons-material/Search";
// Components
import DeleteDialog from "./DeleteDialog";
import ReminderDialog from "./ReminderDialog";
import Navigation from "./Navigation";
import Footer from "./Footer";
import Message from "./Message";
import './../css/index.css';

/**
 * The Activities component provides functionality and display for managing activities.
 */
function Activities() {
    // All the states used in this component.
    const [activities, setActivities] = useState([]);
    const [message, setMessage] = useState("");
    const [activityID, setActivityID] = useState("");
    const [activityDialog, setActivityDialog] = useState([])
    const [openReminder, setOpenReminder] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [filterActivities, setFilterActivities] = useState([])

    /**
     * Handles the opening of the DeleteDialog component.
     */
    const handleClickOpenDelete = (ID: string) => {
        setActivityID(ID)
        fetchActivity(ID).catch(() => setMessage("Connection to the server failed"));
        setOpenDelete(true);
    };

    /**
     * Handles the opening of the ReminderDialog component.
     */
    const handleClickOpenReminder = (ID: string) => {
        setActivityID(ID)
        fetchActivity(ID).catch(() => setMessage("Connection to the server failed"));
        setOpenReminder(true);
    };

    /**
     * Requests a specific activity from the server by the provided ID.
     */
    async function fetchActivity(ID: string) {
        const response = await fetch("http://localhost:8080/activities/" + ID)
        const json = await response.json()
        if (!json.message) setActivityDialog(json)
    }

    /**
     * Requests the server to delete a specific activity by the provided ID.
     */
    async function deleteActivity(ID: string) {
        if (ID !== "") {
            await fetch("http://localhost:8080/activities/" + ID, {
                method: "DELETE"
            })
        }
    }

    /**
     * Applies a filter to all activities based on what is written in searchInput.
     * All letters are changed to lower case to make the search case-insensitive.
     */
    function filterActivity() {
        setFilterActivities(activities.filter(activity => activity.name.toLowerCase().match(searchInput.toLowerCase())))
    }

    /**
     * Requests all activities from the server and sets the necessary states for the rest of the page.
     */
    async function fetchActivities() {
        const response = await fetch("http://localhost:8080/activities")
        const json = await response.json()
        if (json.message) {
            setMessage(json.message)
            setActivities([])
            setFilterActivities([])
        } else {
            setActivities(json);
            setFilterActivities(json)
        }
    }

    /**
     * useEffect hook for handling component updates related to search input.
     * Updates the filtered activities whenever the search input changes.
     */
    useEffect(() => {
        if (searchInput.length > 0) {
            filterActivity()
        } else {
            setFilterActivities(activities)
        }
    }, [searchInput])

    /**
     * useEffect hook for fetching activities when the component mounts.
     */
    useEffect(() => {
        fetchActivities().catch(() => setMessage("Connection to the server failed"));
    }, []);

    return (
        <div>
            <Navigation />

            <Message message={message} handleClose={() => setMessage("")} />


            {activities.length > 0 ?
                <div style={{ display: "flex", justifyContent: "center", marginTop: 5 }}>
                    <OutlinedInput
                        startAdornment={<InputAdornment position="start"><SearchIcon /></InputAdornment>}
                        value={searchInput}
                        onChange={(newValue) => {
                            setSearchInput(newValue.target.value);
                        }}
                        className="OutlinedInput"
                    />
                </div>
                : null}

            <DeleteDialog
                open={openDelete}
                activityy={activityDialog}
                handleClose={() => {
                    setOpenDelete(false)
                }} handleDelete={() => {
                    setOpenDelete(false)
                    deleteActivity(activityID).then(() => {
                        fetchActivities().then((response) => console.log(response));
                        setMessage("Activity was deleted successfully")
                    }).catch(() => setMessage("Connection to the server failed"))
                }}
            />

            <ReminderDialog
                open={openReminder}
                activity={activityDialog}
                handleClose={() => {
                    setOpenReminder(false)
                }} handleMessageAdd={() => {
                    setMessage("Reminder added successfully!")
                }}
            />

            { }
            <Grid container spacing={6}>
            {filterActivities.map(activity =>
                <Grid item xs="auto" key={activity._id}>
                    <Card sx={{ maxWidth: 345, m: 5 }}>
                        <CardHeader
                            title={activity.name}
                            action={
                                <Link to={{
                                    pathname: '/update',
                                    search: '?id=' + activity._id
                                }} style={{ textDecoration: 'none' }}>
                                    <IconButton aria-label="edit" size="large" sx={{
                                        "&:hover": {
                                            color: "blue",
                                        }
                                    }}>
                                        <EditIcon />
                                    </IconButton>
                                </Link>
                            }
                        />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                {activity.description}
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <Button variant="contained" sx={{ backgroundColor: '#2e3c4e' }} endIcon={<AddIcon />}
                                onClick={() => handleClickOpenReminder(activity._id)}>
                                Add to Reminder
                            </Button>

                            <Link to={{
                                pathname: '/activity',
                                search: '?id=' + activity._id
                            }}>
                                <IconButton aria-label="open" size="large" sx={{
                                    "&:hover": {
                                        color: "green",
                                    }
                                }}>
                                    <OpenInNewIcon />
                                </IconButton>
                            </Link>

                            <IconButton aria-label="delete" size="large" sx={{
                                "&:hover": {
                                    color: "red",
                                }
                            }}
                                onClick={() => handleClickOpenDelete(activity._id)}>
                                <DeleteIcon />
                            </IconButton>
                        </CardActions>
                    </Card>
                </Grid>
            )}
        </Grid>


            <Footer />
        </div>
    );
}

export default Activities;
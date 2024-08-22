import React, {useEffect, useState} from "react";
import { useLocation } from 'react-router-dom';
//MUI components
import {Button, Card, Container, FormControl, TextField} from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
//Components
import Message from "./Message";
import Navigation from './Navigation'
import Footer from './Footer'


function Update() {
    /** 
     * Receives the data received from the URL, via the search parameters.
     */
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');

    /** 
     * All the states used in this component.
     */
    const [message, setMessage] = useState("");

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const [activity, setActivity] = useState([]);

    /** 
     * Request the server to update the activity with the provided ID. 
     * Send the data to update through the request body.
     */
    const updateActivity = async (ID : string) => {
        try {
            if(name !== "" && description !== "") {
                await fetch("http://localhost:8080/activities/"+ID, {
                    body: JSON.stringify({
                        name, description
                    }),
                    headers: {
                        "Content-type": "application/json"
                    },
                    method: "PUT"
                }).then(() => {
                    setMessage("Activity updated successfully")
                })
            } else {
                setMessage("Fill all fields first")
            }
        } catch (error) {
            setMessage("Connection to the server failed")
        }
    }

    /** 
     * Fetches the activity data from the server based on the ID.
     */
    async function fetchActivity(ID: string) {
        const response = await fetch("http://localhost:8080/activities/" + ID)
        const json = await response.json()
        if (!json.message) setActivity(json)
    }

    /** 
     * useEffect hook to fetch activity data when the component mounts or the id changes.
     */
    useEffect(() => {
        fetchActivity(id).catch(() => setMessage("Connection to the server failed"))
    }, []);

    /** 
     * useEffect hook to set the name and description in state when the activity data is fetched.
     */
    useEffect(() => {
        if(activity.length > 0) {
            setName(activity[0].name)
            setDescription(activity[0].description)
        }
    }, [activity])

    return (
        <div>
            <Navigation/>

            <Message message={message} handleClose={() => setMessage("")}/>


            <Container component="form" style={{maxWidth: 600}}>
                <Card sx={{m: 2}} style={{boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)"}}>
                    <CardHeader sx={{textAlign:"center"}}
                        title="Write your alterations"
                    />
                    <CardContent>
                        <FormControl>
                            <div>
                                <TextField
                                    style={{width: 450}}
                                    sx={{m: 2}}
                                    id="fullWidth"
                                    value={name}
                                    onChange={(newValue) => {
                                        setName(newValue.target.value);
                                    }}
                                    required
                                    label="Title"
                                    variant="outlined"/>

                            </div>
                            <div>
                                <TextField
                                    style={{width: 450}}
                                    sx={{m: 2}}
                                    id="fullWidth"
                                    value={description}
                                    onChange={(newValue) => {
                                        setDescription(newValue.target.value);
                                    }}
                                    required
                                    label="Description"
                                    multiline
                                    maxRows={4}
                                />
                            </div>
                            <Button variant="contained"  sx={{ backgroundColor: '#2e3c4e' }} onClick={() => updateActivity(id)}>Submit</Button>
                        </FormControl>
                    </CardContent>
                </Card>
            </Container>
            <Footer/>
        </div>
    )
}

export default Update;
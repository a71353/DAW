import React, { useState } from "react";
//MUI components
import { Button, Card, Container, FormControl, TextField } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
//Components
import Message from "./Message";
import Navigation from './Navigation'
import Footer from './Footer'
import './../css/index.css';

function Create() {

    const [message, setMessage] = useState("");

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    /**
     * Request the server to add a Activities. Send the data to create the activbity through the request body.
     * After sending the request and the server responded with a positive answer, clear all the states from the form, so the user can create another activbity immediately.
     */
    const addActivity = async () => {
        try {
            if (name !== "" && description !== "") {
                await fetch("http://localhost:8080/activities", {
                    body: JSON.stringify({
                        name, description
                    }),
                    headers: {
                        "Content-type": "application/json"
                    },
                    method: "POST"
                }).then(() => {
                    setMessage("Activity " + name + " added successfully")
                    setName("");
                    setDescription("");
                })
            } else {
                setMessage("Fill all fields first")
            }
        } catch (error) {
            setMessage("Failed connecting to the server")
        }
    }

    return (
        <body>
            <Navigation />
            <Message message={message} handleClose={() => setMessage("")} />

            {/* Adicione margem superior ao Container */}
            <Container component="form" style={{ maxWidth: 600, marginTop: 95 }}>
                <Card sx={{ m: 2 }} style={{ boxShadow: "0 8px 100px -2px rgba(0,0,0,0.3)" }}>
                    <CardHeader sx={{ textAlign: "center" }} title="Write your activity here!" />
                    <CardContent>
                        <FormControl>
                            <div>
                                <TextField
                                    style={{ width: 450 }}
                                    sx={{ m: 2 }}
                                    id="fullWidth"
                                    value={name}
                                    onChange={(newValue) => {
                                        setName(newValue.target.value);
                                    }}
                                    required
                                    label="Title"
                                    variant="outlined"
                                />
                            </div>
                            <div>
                                <TextField
                                    style={{ width: 450 }}
                                    sx={{ m: 2 }}
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
                            <Button variant="contained"   sx={{ backgroundColor: '#2e3c4e' }} onClick={addActivity}>
                                Submit
                            </Button>
                        </FormControl>
                    </CardContent>
                </Card>
            </Container>
            <Footer />
        </body>

    )
        ;
}

export default Create;
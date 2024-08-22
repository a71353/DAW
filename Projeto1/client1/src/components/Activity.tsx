import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
//MUI components
import {Card, CardContent, CardHeader, Container, Typography} from "@mui/material";
//Components
import Message from "./Message";
import Navigation from "./Navigation";
import Footer from "./Footer";

function Activity() {
    //Receives the data received from the URL, via the search parameters
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');

    //All the states used in this component
    const [message, setMessage] = useState("");
    const [activity, setActivity] = useState([]);

    //Requests a specific activity from the server with the ID argument
    async function fetchActivity(ID: string) {
        const response = await fetch("http://localhost:8080/activities/" + ID)
        const json = await response.json()
        if (json.message) setMessage(json.message)
        else setActivity(json)
    }

    /**
     * This function it's based in React 'componentDidMount()' that will invoke the functions inside after a component is mounted.
     * In this case, the 'useEffect()' only executes the arrow function after the main component mount, only executing one time.
     * */
    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchActivity(id);
            } catch (error) {
                setMessage("Can't connect to the server");
            }
        };

        fetchData();
    }, [setMessage, fetchActivity]);
    
    return (
        <div>
            <Navigation/>

            <Message message={message} handleClose={() => setMessage("")}/>

            {activity.map(rec =>
            <Container key={rec._id} sx={{mt: 5}}>
                <Card style={{boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)"}}>
                    <CardHeader
                        title={rec.name}
                    />
                    <CardContent>
                        <Typography paragraph sx={{whiteSpace: 'pre-line'}}>
                            {rec.description}
                        </Typography>
                    </CardContent>
                </Card>
            </Container>
            )}

            <Footer/>
        </div>
    );
}

export default Activity;
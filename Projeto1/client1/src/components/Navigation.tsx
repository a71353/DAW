import React from 'react';
import { Link } from 'react-router-dom';
// MUI components
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const pages = [
    {
        name: "Home",
        path: "/"
    },
    {
        name: "My Reminder",
        path: "/myReminder"
    },
    {
        name: "Create Activity",
        path: "/createActivity"
    },

    {
        name: "Creators",
        path: "/creators"
    }
];

function Navigation() {
    return (
        <AppBar position="static" sx={{ backgroundColor: '#2e3c4e', marginBottom: '20px' }}>
    <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'center', alignItems: 'center' }}>
            {/* Box that aligns the icon with the title */}
            <Box sx={{ display: 'flex', alignItems: 'center', marginRight: 'auto' }}>
                <CalendarMonthIcon sx={{ display: 'block', mr: 1 }} />
                <Typography
                    variant="h6"
                    noWrap
                    sx={{
                        fontFamily: 'Papyrus, fantasy', // Changed to a more extravagant font
                        fontWeight: 750,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                >
                    My Activities
                </Typography>
            </Box>

            {/* Navigation buttons */}
            <Box sx={{ display: 'flex', justifyContent: 'center', marginLeft: 'auto' }}>
                {pages.map((page) => (
                    <Link key={page.name} to={page.path} style={{ textDecoration: 'none' }}>
                        <Button
                            sx={{ 
                                my: 2, 
                                color: 'white', 
                                display: 'block',
                                fontFamily: 'Comic Sans MS, cursive, sans-serif', // Changed to a more extravagant font
                                fontSize: '1.1rem',
                            }}
                        >
                            {page.name}
                        </Button>
                    </Link>
                ))}
            </Box>
        </Toolbar>
    </Container>
</AppBar>

    );
}

export default Navigation;

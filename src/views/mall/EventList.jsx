import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import EventCard from './EventCard';
import { getCharityEvents } from '../../api/charityEvent';

const EventList = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const data = await getCharityEvents();
                setEvents(data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, []);

    return (
        <Grid container spacing={2}>
            {events.map((event) => (
                <Grid item xs={12} md={4} key={event.id}>
                    <EventCard event={event} />
                </Grid>
            ))}
        </Grid>
    );
};

export default EventList;
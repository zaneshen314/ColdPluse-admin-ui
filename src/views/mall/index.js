import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import EventList from './EventList';
import { getCharityEvents } from '../../api/charityEvent';

const Mall = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        getCharityEvents().then((data) => {
            setEvents(data);
        });
    }, []);

    return (
        <div>
            <Typography>Charity Events</Typography>
            <EventList events={events} />
        </div>
    );
};

export default Mall;
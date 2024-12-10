import React, {createContext, useEffect, useReducer, useState} from 'react';
import {Typography} from '@mui/material';
import EventList from './EventList';
import {getCharityEvents} from '../../api/charityEvent';
import participationReducer from '../../context/participationReducer';

export const ParticipationContext = createContext();

const Mall = () => {
    const [state, dispatch] = useReducer(participationReducer, []);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        getCharityEvents().then((data) => {
            setEvents(data);
        });
    }, []);

    return (
        <ParticipationContext.Provider value={{state, dispatch}}>
            <div>
                <Typography>Charity Events</Typography>
                <EventList events={events}/>
            </div>
        </ParticipationContext.Provider>
    );
};

export default Mall;
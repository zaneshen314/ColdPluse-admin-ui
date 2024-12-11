import React, {useEffect, useState} from 'react';
import ConcertControlPanel from './ConcertControlPanel';
import TicketList from './TicketList';
import TicketStrategyControlPanel from "./TicketStrategyControlPanel";
import {Box} from "@mui/material";
import {getAllConcertTickets} from '../../api/tickets';

const TicketManagementWrapper = () => {
    const [selectedConcert, setSelectedConcert] = useState(null);
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const data = await getAllConcertTickets();
                setTickets(data.data);
            } catch (error) {
                console.error('Error fetching tickets:', error);
            }
        };

        fetchTickets();
    }, []);

    const shouldShowStrategyPanel = selectedConcert && !selectedConcert.concertSchedule.concertClasses.every(ticket => ticket.capacity === ticket.availableSeats);

    return (
        <div>
            <Box sx={{
                boxShadow: '3px 3px 10px rgba(0, 0, 0, 0.2), -3px -3px 10px rgba(0, 0, 0, 0.2)',
                padding: 2,
                borderRadius: 1
            }}>
                <ConcertControlPanel concerts={tickets} setSelectedConcert={setSelectedConcert}/>
                {selectedConcert && <TicketList concert={selectedConcert}/>}
            </Box>
            {shouldShowStrategyPanel && <TicketStrategyControlPanel selectedConcert={selectedConcert}/>}
        </div>
    );
};

export default TicketManagementWrapper;
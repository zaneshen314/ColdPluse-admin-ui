import React, { useEffect, useState } from 'react';
import { FormControl, MenuItem, Select, Typography } from '@mui/material';

const ConcertControlPanel = ({ concerts, setSelectedConcert }) => {
    const [selectedConcertId, setSelectedConcertId] = useState(concerts.length > 0 ? concerts[0].concertId : '');

    useEffect(() => {
        if (concerts.length > 0) {
            setSelectedConcert(concerts[0]);
            setSelectedConcertId(concerts[0].concertId);
        }
    }, [concerts, setSelectedConcert]);

    const handleChange = (event) => {
        const selected = concerts.find(concert => concert.concertId === event.target.value);
        setSelectedConcert(selected);
        setSelectedConcertId(event.target.value);
    };

    return (
        <div>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Concert & Schedule
            </Typography>
            <FormControl fullWidth>
                <Select
                    labelId="concert-select-label"
                    value={selectedConcertId}
                    onChange={handleChange}
                >
                    {concerts.map(concert => (
                        <MenuItem key={concert.concertId} value={concert.concertId}>
                            {concert.concertName} - {concert.concertSchedule.scheduleId}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};

export default ConcertControlPanel;
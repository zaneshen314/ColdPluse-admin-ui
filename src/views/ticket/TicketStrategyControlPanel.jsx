import React, { useState, useEffect } from 'react';
import { Button, Grid, TextField, Divider, Chip, Snackbar, Alert } from '@mui/material';
import { setTicketStrategy } from "../../api/tickets";

const TicketStrategyControlPanel = ({ selectedConcert }) => {
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [executeHour, setExecuteHour] = useState('');
    const [repeatTimes, setRepeatTimes] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);

    useEffect(() => {
        if (selectedConcert && selectedConcert.ticketRelease) {
            const { startTime, endTime, hour, repeatCount } = selectedConcert.ticketRelease;
            setStart(startTime);
            setEnd(endTime);
            setExecuteHour(hour);
            setRepeatTimes(repeatCount);
        } else {
            setStart('');
            setEnd('');
            setExecuteHour('');
            setRepeatTimes('');
        }
    }, [selectedConcert]);

    const handleStartTimeChange = (event) => {
        setStart(event.target.value);
    };

    const handleEndTimeChange = (event) => {
        setEnd(event.target.value);
    };

    const handleExecuteHourChange = (event) => {
        setExecuteHour(event.target.value);
    };

    const handleRepeatTimesChange = (event) => {
        setRepeatTimes(event.target.value);
    };

    const handleSubmit = async () => {
        const ticketRelease = {
            startTime: start,
            endTime: end,
            hour: executeHour,
            repeatCount: repeatTimes
        };

        try {
            await setTicketStrategy(selectedConcert.concertId, selectedConcert.concertSchedule.scheduleId, ticketRelease);
            setOpenSnackbar(true);
        } catch (error) {
            console.error('Error updating ticket strategy:', error);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <div>
            <Divider sx={{ marginBottom: 3, marginTop: 3 }}>
                <Chip label="Ticket Strategy Control Panel" sx={{ height: 35, padding: '0 10px', fontSize: '1rem' }} />
            </Divider>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={3}>
                    <TextField
                        label="Start Time"
                        type="text"
                        fullWidth
                        value={start}
                        onChange={handleStartTimeChange}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        label="End Time"
                        type="text"
                        fullWidth
                        value={end}
                        onChange={handleEndTimeChange}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>
                <Grid item xs={2}>
                    <TextField
                        label="Execute Hour"
                        type="number"
                        fullWidth
                        value={executeHour}
                        onChange={handleExecuteHourChange}
                        inputProps={{ min: 0, max: 23 }}
                    />
                </Grid>
                <Grid item xs={2}>
                    <TextField
                        label="Repeat Times"
                        type="number"
                        fullWidth
                        value={repeatTimes}
                        onChange={handleRepeatTimesChange}
                    />
                </Grid>
                <Grid item xs={2}>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
                </Grid>
            </Grid>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    Ticket strategy updated successfully!
                </Alert>
            </Snackbar>
        </div>
    );
};

export default TicketStrategyControlPanel;
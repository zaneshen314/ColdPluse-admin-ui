import React, { useEffect, useState } from 'react';
import {
    Button,
    FormControl,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Modal,
    Box,
    TextField,
    CircularProgress
} from '@mui/material';
import { createSession, getAllConcertSchedules } from '../../api/concerts';

const Schedule = () => {
    const [schedules, setSchedules] = useState([]);
    const [selectedConcert, setSelectedConcert] = useState('');
    const [concerts, setConcerts] = useState([]);
    const [concertSchedules, setConcertSchedules] = useState([]);
    const [open, setOpen] = useState(false);
    const [startTime, setStartTime] = useState('');
    const [duration, setDuration] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSchedules = async () => {
            setLoading(true);
            try {
                const data = await getAllConcertSchedules();
                setSchedules(data.data);
            } catch (error) {
                console.error('Error fetching schedules:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSchedules();
    }, []);

    useEffect(() => {
        if (schedules.length > 0) {
            const uniqueConcerts = Array.from(
                schedules.reduce((map, { concertId, name, venue, start_time }) => {
                    if (!map.has(concertId)) {
                        map.set(concertId, { concertId, name, venue, start_time });
                    }
                    return map;
                }, new Map()).values()
            );
            setConcerts(uniqueConcerts);
        }
    }, [schedules]);

    const handleConcertChange = async (event) => {
        const concertId = event.target.value;
        setSelectedConcert(concertId);
        setConcertSchedules(schedules.filter((schedule) => schedule.concertId === concertId));
    };

    const handleCreateSession = async () => {
        setOpen(true);
    };

    const handleSubmit = async () => {
        try {
            const durationInSeconds = parseInt(duration) * 60;
            const requestBody = {
                concertId: selectedConcert,
                startTime: startTime,
                duration: durationInSeconds
            };

            await createSession(requestBody);

            const existingRecord = schedules.findLast(schedule => schedule.concertId === selectedConcert);

            const newRecord = {
                concertId: selectedConcert,
                scheduleId: existingRecord.scheduleId + 1,
                name: existingRecord.name,
                maxPrice: existingRecord.maxPrice,
                minPrice: existingRecord.minPrice,
                start_time: startTime,
                venue: existingRecord.venue,
                duration: durationInSeconds,
                imgUrl: existingRecord.imgUrl
            };

            const updatedSchedules = [...schedules, newRecord];
            setSchedules(updatedSchedules);
            setConcertSchedules(updatedSchedules.filter(schedule => schedule.concertId === selectedConcert));
            setOpen(false);
        } catch (error) {
            console.error("Error creating session:", error);
        }
    };

    return (
        <div>
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '20vh' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    <Typography sx={{ marginBottom: "5px" }}>Concerts</Typography>
                    <FormControl fullWidth>
                        <Select
                            labelId="concert-select-label"
                            value={selectedConcert}
                            onChange={handleConcertChange}
                        >
                            {concerts ? concerts.map((concert) => (
                                <MenuItem key={concert.concertId} value={concert.concertId}>
                                    {`${concert.concertId} - ${concert.name} - ${concert.venue}`}
                                </MenuItem>
                            )) : null}
                        </Select>
                    </FormControl>
                    {concertSchedules.length > 0 && (
                        <div>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Concert ID</TableCell>
                                            <TableCell>Schedule ID</TableCell>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Max Price</TableCell>
                                            <TableCell>Min Price</TableCell>
                                            <TableCell>Start Time</TableCell>
                                            <TableCell>Venue</TableCell>
                                            <TableCell>Duration</TableCell>
                                            <TableCell>Sale Start Time</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {concertSchedules ? concertSchedules.map((schedule) => (
                                            <TableRow key={schedule.scheduleId}>
                                                <TableCell>{schedule.concertId}</TableCell>
                                                <TableCell>{schedule.scheduleId}</TableCell>
                                                <TableCell>{schedule.name}</TableCell>
                                                <TableCell>{schedule.maxPrice}</TableCell>
                                                <TableCell>{schedule.minPrice}</TableCell>
                                                <TableCell>{schedule.start_time}</TableCell>
                                                <TableCell>{schedule.venue}</TableCell>
                                                <TableCell>{schedule.duration}</TableCell>
                                                <TableCell>{schedule.saleStartTime}</TableCell>
                                            </TableRow>
                                        )) : null}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <Button variant="contained" sx={{ marginTop: "10px" }} onClick={handleCreateSession}>Create New Session</Button>
                        </div>
                    )}
                    <Modal open={open} onClose={() => setOpen(false)}>
                        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 }}>
                            <Typography variant="h6" component="h2">Create New Session</Typography>
                            <TextField
                                label="Start Time"
                                type="datetime-local"
                                fullWidth
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                                sx={{ marginBottom: "10px" }}
                                InputLabelProps={{ shrink: true }}
                            />
                            <TextField
                                label="Duration (minutes)"
                                type="number"
                                fullWidth
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                sx={{ marginBottom: "10px" }}
                            />
                            <Button variant="contained" onClick={handleSubmit}>Submit</Button>
                        </Box>
                    </Modal>
                </>
            )}
        </div>
    );
};

export default Schedule;
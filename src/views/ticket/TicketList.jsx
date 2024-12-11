import React, { useState, useEffect } from 'react';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography, TextField, Button, Snackbar, Alert } from '@mui/material';
import { updatePrice } from '../../api/tickets';

const TicketList = ({ concert }) => {
    const tickets = concert.concertSchedule.concertClasses;
    const [prices, setPrices] = useState({});
    const [openSnackbar, setOpenSnackbar] = useState(false);

    useEffect(() => {
        const initialPrices = tickets.reduce((acc, ticket) => {
            acc[ticket.id] = ticket.price;
            return acc;
        }, {});
        setPrices(initialPrices);
    }, [concert, tickets]);

    const handlePriceChange = (event, ticketId) => {
        setPrices({
            ...prices,
            [ticketId]: event.target.value
        });
    };

    const handlePriceUpdate = async (ticket) => {
        const priceData = {
            price: parseFloat(prices[ticket.id]),
            currency: 'USD'
        };

        try {
            await updatePrice(concert.concertId, concert.concertSchedule.scheduleId, ticket.id, priceData);
            setOpenSnackbar(true);
        } catch (error) {
            console.error('Error updating price:', error);
            alert('Failed to update price');
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <div>
            <Typography variant="h6" gutterBottom sx={{ marginTop: 2, fontWeight: 'bold' }}>
                Ticket Type(s)
            </Typography>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <Table sx={{ border: '1px solid rgba(224, 224, 224, 1)', borderBottom: 'none' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', border: '1px solid rgba(224, 224, 224, 1)' }}>Class</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', border: '1px solid rgba(224, 224, 224, 1)' }}>Available</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', border: '1px solid rgba(224, 224, 224, 1)' }}>Released</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', border: '1px solid rgba(224, 224, 224, 1)' }}>Price (USD)</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', border: '1px solid rgba(224, 224, 224, 1)' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tickets.map((ticket, index) => (
                            <TableRow key={ticket.id} sx={{ backgroundColor: index % 2 === 0 ? '#f5f5f5' : '#ffffff' }}>
                                <TableCell sx={{ textAlign: 'center', border: '1px solid rgba(224, 224, 224, 1)' }}>{ticket.className}</TableCell>
                                <TableCell sx={{ textAlign: 'center', border: '1px solid rgba(224, 224, 224, 1)' }}>{ticket.availableSeats}</TableCell>
                                <TableCell sx={{ textAlign: 'center', border: '1px solid rgba(224, 224, 224, 1)' }}>{ticket.capacity}</TableCell>
                                <TableCell sx={{ textAlign: 'center', border: '1px solid rgba(224, 224, 224, 1)' }}>
                                    <TextField
                                        type="number"
                                        value={prices[ticket.id] || ''}
                                        onChange={(event) => handlePriceChange(event, ticket.id)}
                                        inputProps={{ min: 0 }}
                                    />
                                </TableCell>
                                <TableCell sx={{ textAlign: 'center', border: '1px solid rgba(224, 224, 224, 1)' }}>
                                    <Button variant="contained" color="primary" onClick={() => handlePriceUpdate(ticket)}>Update</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    Price updated successfully!
                </Alert>
            </Snackbar>
        </div>
    );
};

export default TicketList;
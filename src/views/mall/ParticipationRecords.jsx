import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText } from '@mui/material';

const ParticipationRecords = ({ eventId, participationRecords = [] }) => {
    return (
        <div>
            <Typography variant="h5" component="div" gutterBottom>
                Participants
            </Typography>
            <List>
                {Array.isArray(participationRecords) && participationRecords.length > 0 ? (
                    participationRecords.map((rec) => (
                        <Card style={{ margin: '10px' }} key={rec.user.id}>
                            <CardContent>
                                <ListItem>
                                    <ListItemText
                                        primary={
                                            <>
                                                <Typography sx={{ fontWeight: 'bold' }}>{rec.user.name}</Typography>
                                                <Typography>Email: {rec.user.email}</Typography>
                                                <Typography>Points: {rec.user.cumulatedPoint}</Typography>
                                                <Typography>Status: {rec.charityEventParticipation.status === 'REGISTERED' ? 'pending' : rec.charityEventParticipation.status.toLowerCase()}</Typography>
                                            </>
                                        }
                                    />
                                </ListItem>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <Typography>No participation records found.</Typography>
                )}
            </List>
        </div>
    );
};

export default ParticipationRecords;
import React, { useContext } from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import { ParticipationContext } from './index';
import {
    approveParticipation,
    completeParticipation,
    markAbsentParticipation,
    rejectParticipation
} from "../../api/charityEvent";
import {ACTION} from "../../context/participationReducer";

const ParticipationRecords = ({ eventId }) => {
    const { state, dispatch } = useContext(ParticipationContext);

    const handleApprove = (userId) => {
        approveParticipation(eventId, userId);
        dispatch({ type: ACTION.APPROVE, payload: { userId } });
    };

    const handleReject = (userId) => {
        rejectParticipation(eventId, userId);
        dispatch({ type: ACTION.REJECT, payload: { userId } });
    };

    const handleComplete = (userId) => {
        completeParticipation(eventId, userId);
        dispatch({ type: ACTION.COMPLETE, payload: { userId } });
    };

    const handleMarkAbsent = (userId) => {
        markAbsentParticipation(eventId, userId);
        dispatch({ type: ACTION.MARK_ABSENT, payload: { userId } });
    };

    return (
        <div>
            <Typography variant="h5" component="div" gutterBottom>
                Participants
            </Typography>
            <List>
                {Array.isArray(state.userParticipationRecResps) && state.userParticipationRecResps.length > 0 ? (
                    state.userParticipationRecResps.map((rec) => (
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
                                    {rec.charityEventParticipation.status === 'REGISTERED' ? (
                                        <>
                                            <Button variant="contained" color="primary" style={{ marginRight: '10px' }} onClick={() => handleApprove(rec.user.id)}>Approve</Button>
                                            <Button variant="contained" color="secondary" onClick={() => handleReject(rec.user.id)}>Reject</Button>
                                        </>
                                    ) : rec.charityEventParticipation.status !== 'COMPLETED' && rec.charityEventParticipation.status !== 'ABSENT' ? (
                                        <>
                                            <Button variant="contained" color="primary" style={{ marginRight: '10px' }} onClick={() => handleComplete(rec.user.id)}>Complete</Button>
                                            <Button variant="contained" color="secondary" onClick={() => handleMarkAbsent(rec.user.id)}>Mark Absent</Button>
                                        </>
                                    ) : null}
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
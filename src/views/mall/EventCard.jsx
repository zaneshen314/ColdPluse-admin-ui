import React, {useContext, useState} from "react";
import {Box, Card, CardContent, Modal, Typography, Button} from "@mui/material";
import {getCharityEventsParticipations} from "../../api/charityEvent";
import ParticipationRecords from "./ParticipationRecords";
import {ACTION} from "../../context/participationReducer";
import {ParticipationContext} from "./index";

const EventCard = ({event}) => {
    const [open, setOpen] = useState(false);
    const {dispatch} = useContext(ParticipationContext);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleCheckAttendance = async () => {
        try {
            const data = await getCharityEventsParticipations(event.id);
            if (data && Array.isArray(data.userParticipationRecResps)) {
                dispatch({type: ACTION.LOAD, payload: data});
            } else {
                dispatch({type: ACTION.LOAD, payload: []});
                console.error('Expected an array but received:', data);
            }
            handleOpen();
        } catch (error) {
            console.error('Error fetching participation records:', error);
        }
    }

    return (
        <Card style={{margin: '20px', position: 'relative', width: '100%', height: '100%'}}>
            <CardContent>
                <Button variant="contained" color="primary" onClick={handleCheckAttendance}
                        sx={{position: 'absolute', bottom: '5%', textTransform: 'none'}}>
                    View participants
                </Button>
                <Typography variant="h5" component="div">
                    {event.name}
                </Typography>
                <Typography color="textSecondary">
                    {new Date(event.startTime).toLocaleString()}
                </Typography>
                <Typography variant="body2" component="p">
                    Duration: {event.duration} minutes
                </Typography>
                <Typography variant="body2" component="p">
                    Location: {event.location}
                </Typography>
                <Typography variant="body2" component="p">
                    Description: {event.description}
                </Typography>
                <Typography variant="body2" component="p">
                    Points: {event.point}
                </Typography>
                <Typography variant="body2" component="p">
                    Enrolled: {event.currentEnrolled}/{event.suggestedParticipationSize}
                </Typography>
                <Modal open={open} onClose={handleClose}>
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '50%',
                        maxHeight: '80vh',
                        overflow: 'auto',
                        bgcolor: 'background.paper',
                        p: 4,
                        borderRadius: 2 // Rounded corners
                    }}>
                        <ParticipationRecords eventId={event.id}/>
                    </Box>
                </Modal>
            </CardContent>
        </Card>
    );
};

export default EventCard;
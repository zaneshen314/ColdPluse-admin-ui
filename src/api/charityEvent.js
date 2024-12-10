import instance from "./interceptor";

export const getCharityEvents = async () => {
    const response = await instance.get("/charity-events");
    return response.data;
}

export const getCharityEventsParticipations = async (eventId) => {
    const response = await instance.get(`/charity-events?eventId=${eventId}`);
    return response.data;
}

export const approveParticipation = async (eventId, userId) => {
    const response = await instance.put(`/charity-events/status`, {
        "charityEventId": eventId,
        "userId": userId,
        "status": "ENROLLED"
    });
    return response.data;
}

export const rejectParticipation = async (eventId, userId) => {
    const response = await instance.put(`/charity-events/status`, {
        "charityEventId": eventId,
        "userId": userId,
        "status": "REJECTED"
    });
    return response.data;
}

export const markAbsentParticipation = async (eventId, userId) => {
    const response = await instance.put(`/charity-events/status`, {
        "charityEventId": eventId,
        "userId": userId,
        "status": "ABSENT"
    });
    return response.data;
}

export const completeParticipation = async (eventId, userId) => {
    const response = await instance.put(`/charity-events/status`, {
        "charityEventId": eventId,
        "userId": userId,
        "status": "COMPLETED"
    });
    return response.data;
}
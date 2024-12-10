import instance from "./interceptor";

export const getCharityEvents = async () => {
    const response = await instance.get("/charity-events");
    return response.data;
}

export const getCharityEventsParticipations = async (eventId) => {
    const response = await instance.get(`/charity-events?eventId=${eventId}`);
    return response.data;
}
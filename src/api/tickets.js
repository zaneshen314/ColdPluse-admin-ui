import instance from "./interceptor";

export const getAllConcertTickets = async () => {
    const response = await instance.get("/release-tickets");
    return response.data;
}

export const setTicketStrategy = async (concertId, concertScheduleId, ticketRelease) => {
    const response = await instance.post(`/release-tickets/${concertId}/${concertScheduleId}/schedule`, ticketRelease);
    return response.data;
}

export const updatePrice = async (concertId, concertScheduleId, classId, price) => {
    const response = await instance.put(`/concerts/${concertId}/schedules/${concertScheduleId}/classes/${classId}`, price);
    return response.data;
}

import instance from "./interceptor";

export const getAllConcertSchedules = async () => {
    const response = await instance.get("/concerts/schedules");
    return response.data;
}

export const createSession = async (session) => {
    const response = await instance.post("/concerts/schedules", session);
    return response.data;
}
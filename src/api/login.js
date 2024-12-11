import instance from "./interceptor";

export const login = async (email, password) => {
    const response = await instance.post('/login', {
        email,
        password,
    });
    return response.data;
};

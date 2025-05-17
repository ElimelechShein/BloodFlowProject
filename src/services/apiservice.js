import axios from 'axios';

export const doApiMethod = async (url, method, body = {}) => {
    const token = localStorage.getItem('authToken') ? JSON.parse(localStorage.getItem('authToken')) : null;

    if (!token) {
        throw new Error('No token found in localStorage');
    }

    try {
        const apiUrl ="http://localhost:3007"; 
        return await axios({
            method: method,
            url: `${apiUrl}${url}`, // Use apiUrl from .env
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            responseType: 'json',
            data: body,
        });
    } catch (err) {
        throw err;
    }
};
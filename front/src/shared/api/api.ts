import axios  from 'axios';
import { USER_LOCALSTORAGE_DATA } from 'shared/const/localStorage';




export const $api = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem(USER_LOCALSTORAGE_DATA) || '').tokens?.access}`
    }
}) 

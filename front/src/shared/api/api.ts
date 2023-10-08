import axios  from 'axios';
import { USER_LOCALSTORAGE_DATA } from 'shared/const/localStorage';

const user = localStorage.getItem(USER_LOCALSTORAGE_DATA) || ''


export const $api = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        Authorization: `Bearer ${user && JSON.parse(user).tokens?.access}`
    }
}) 

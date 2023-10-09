import axios  from 'axios';
import { USER_LOCALSTORAGE_TOKENS } from 'shared/const/localStorage';

const tokens = localStorage.getItem(USER_LOCALSTORAGE_TOKENS) || ''


export const $api = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        Authorization: `Bearer ${tokens && JSON.parse(tokens).access}`
    }
}) 

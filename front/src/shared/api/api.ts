import axios  from 'axios';
import { USER_LOCALSTORAGE_TOKENS } from 'shared/const/localStorage';

const tokens = localStorage.getItem(USER_LOCALSTORAGE_TOKENS) || ''
const isDev = false 

export const $api = axios.create({
    baseURL: isDev ? 'http://localhost:8000' : 'http://77.223.126.236',
    headers: {
        Authorization: `Bearer ${tokens && JSON.parse(tokens).access}`
    }
}) 

import axios from 'axios';

export const apiTMD = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  timeout: 10000,
})
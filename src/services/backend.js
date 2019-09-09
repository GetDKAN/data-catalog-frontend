import axios from 'axios';

const backend = axios.create({
  baseURL: process.env.REACT_APP_INTERRA_API_URL,
});

export default backend;

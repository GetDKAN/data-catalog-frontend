import axios from "axios";

const backend = axios.create({
  baseURL: process.env.GATSBY_API_URL
});

export default backend;

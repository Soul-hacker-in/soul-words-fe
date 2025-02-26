import axios from "axios";

// Localhost
let domain = "http://localhost:5005/";

const instance = axios.create({
  baseURL: domain + "soul_words/api",
});

const baseUrl = () => {
  return domain;
}

export default instance;
export {
  baseUrl
}
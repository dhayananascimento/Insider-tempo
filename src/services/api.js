import axios from "axios";

export const key = "25936a4f";

const api = axios.create({
  baseURL: "https://api.hgbrasil.com",
});
export default api;

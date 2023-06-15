import axios from "axios";

export const Axios = axios.create({
    baseURL: `${process.env.REACT_APP_API}`,
    headers: {
        "Api-Token" : process.env.REACT_APP_API_TOKEN,
        "Accept" : "application/json",
    },
  });

  
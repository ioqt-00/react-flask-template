import React, { createContext, useState } from "react";
import axios from "axios";

import { getToken } from "../helpers/login";
export const ApiContext = createContext();

var axios_config = axios.create({
  validateStatus: function (status) {
      return (status >= 200 && status < 300);
  },
  headers: {
    'Authorization': 'Bearer ' + getToken()
  }
});

const ApiContextProvider = props => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const getProjectFromTitle = (query) => {
    axios_config
      .get(
        `projects/search?title=${query}`
      )
      .then(response => {
        if (response.data.length === 1) {
          console.log(response)
          setData(response.data[0]);
          setLoading(false);
        } else {
          setLoading(true);
          setData([]);
          throw new Error("Awaiting response of length 1");
        }
      })
      .catch(error => {
        console.log(
          "Encountered an error with fetching and parsing data",
          error
        );
      });
  };
  return (
    <ApiContext.Provider value={{ data, loading, getProjectFromTitle }}>
      {props.children}
    </ApiContext.Provider>
  );
};

export default ApiContextProvider;

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


  return (
    <ApiContext.Provider>
      {props.children}
    </ApiContext.Provider>
  );
};

export default ApiContextProvider;

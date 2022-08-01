const axios = require("axios");
// axios.defaults.withCredentials = true;
const API_ENDPOINT = (process.env.REACT_APP_API_ENDPOINT ? process.env.REACT_APP_API_ENDPOINT : '')

const client = {
  get: async (url: string, params: any) => {
    try {
      let token = client.getAuth();
      let response = await axios.get(`${API_ENDPOINT}${url}`, {
        params: params,
        headers: { "Authorization": `Bearer ${token}` },
      });
      return {
        error: false,
        ...response,
      };
    } catch (error: any) {
      window.snakAlert.error(error.toString());
      return {
        error: true,
        message: error.toString(),
      };
    }
  },
  getAll: async (url: string) => {
    try {
      //console.log(`${API_ENDPOINT}${url}`)
      let token = client.getAuth();
      let response = await axios.get(`${API_ENDPOINT}${url}`, {
        headers: { "Authorization": `Bearer ${token}` },
      });
      return {
        error: false,
        ...response.data,
      };
    } catch (error: any) {
      window.snakAlert.error(error.toString());
      return {
        error: true,
        message: error.toString(),
      };
    }
  },
  post: async (url: string, params: any) => {
    try {
      let token = client.getAuth();
      let response = await axios.post(`${API_ENDPOINT}${url}`, params, {
        headers: { "Authorization": `Bearer ${token}` },
      });
      return {
        error: false,
        ...response,
      };
    } catch (error: any) {
      window.snakAlert.error(error.toString());
      return {
        error: true,
        message: error.toString(),
      };
    }
  },
  put: async (url: string, params: any) => {
    try {
      let token = client.getAuth();
      let response = await axios.put(`${API_ENDPOINT}${url}`, params, {
        headers: { "Authorization": `Bearer ${token}` },
      });
      return {
        error: false,
        ...response,
      };
    } catch (error: any) {
      window.snakAlert.error(error.toString());

      return {
        error: true,
        message: error.toString(),
      };
    }
  },
  delete: async (url: string, params: any) => {
    try {
      let token = client.getAuth();
      let response = await axios.delete(`${API_ENDPOINT}${url}`, {
        data: params,
        headers: { "Authorization": `Bearer ${token}` },
      });
      return {
        error: false,
        ...response,
      };
    } catch (error: any) {
      window.snakAlert.error(error.toString());

      return {
        error: true,
        message: error.toString(),
      };
    }
  },
  upload: async (type: string, blob: any) => {
    const form: any = new FormData();
    form.append("file", blob);
    form.append("type", type); // banners|products|etc
    try {
      let token = client.getAuth();
      let response = await axios.put(`${API_ENDPOINT}/upload`, form, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "content-type": "multipart/form-data; ",
        },
      });
      return {
        error: false,
        ...response,
      };
    } catch (error: any) {
      window.snakAlert.error(error.toString());

      return {
        error: true,
        message: error.toString(),
      };
    }
  },
  getAuth: () => {
    let auth: any = window.localStorage.getItem("auth");
    if (auth) {
      auth = JSON.parse(auth);
      return auth.access_token;
    }
  },
};

export default client;

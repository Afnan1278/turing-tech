const axios = require("axios");
axios.defaults.withCredentials = true;
const API_ENDPOINT = 'http://localhost:3000/api';

const client = {
  get: async (url: string, params: any) => {
    try {
      let token = client.getAuth();
      let response = await axios.get(`${API_ENDPOINT}${url}`, {
        params: params,
        headers: { "x-token": `Bearer ${token}` },
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
  getAll: async (url: string) => {
    try {
      //console.log(`${API_ENDPOINT}${url}`)
      let token = client.getAuth();
      let response = await axios.get(`${API_ENDPOINT}${url}`, {
        headers: { "x-token": `Bearer ${token}` },
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
        headers: { "x-token": `Bearer ${token}` },
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
  put: async (url: string, params: any) => {
    try {
      let token = client.getAuth();
      let response = await axios.put(`${API_ENDPOINT}${url}`, params, {
        headers: { "x-token": `Bearer ${token}` },
      });
      return {
        error: false,
        ...response.data,
      };
    } catch (error: any) {
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
        headers: { "x-token": `Bearer ${token}` },
      });
      return {
        error: false,
        ...response.data,
      };
    } catch (error: any) {
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
          "x-token": `Bearer ${token}`,
          "content-type": "multipart/form-data; ",
        },
      });
      return {
        error: false,
        ...response.data,
      };
    } catch (error: any) {
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
      return auth.token;
    }
  },
};

export default client;

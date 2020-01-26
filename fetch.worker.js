import * as Comlink from "comlink";

class Fetch {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
    this._defaultHeaders = {
      headers: {
        "Content-Type": "application/json"
      }
    };
  }

  _genFormData(data) {
    const form = new FormData();
    Object.keys(data).forEach(key => {
      form.append(key, data[key]);
    });
    return form;
  }

  async get(endpoint = "") {
    const response = await fetch(this._baseUrl + endpoint);
    const data = await response.json();
    return data;
  }

  async post(endpoint = "", payload = undefined, headers = {}) {
    const body = this._genFormData(payload);
    return await this._send("POST", endpoint, body, headers);
  }

  async put(endpoint = "", body = undefined, headers = {}) {
    return await this._send("PUT", endpoint, body, headers);
  }

  async delete(endpoint = "", body = undefined, headers = {}) {
    return await this._send("DELETE", endpoint, body, headers);
  }

  async _send(method, endpoint = "", body = undefined, headers = {}) {
    console.log(this._baseUrl);
    console.log(endpoint);
    const response = await fetch(this._baseUrl + endpoint, {
      method,
      body,
      headers: { ...this._defaultHeaders, ...headers }
    });
    const data = await response.json();
    return data;
  }
}

Comlink.expose(Fetch);

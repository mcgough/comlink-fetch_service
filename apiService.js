import * as Comlink from "comlink";

class ApiService {
  constructor() {
    this._api = null;
    this.initApi();

    // allows for async init
    return new Proxy(this, {
      get: function(_target, prop) {
        if (_target._api) return _target[prop];
        return (...args) =>
          new Promise(resolve => {
            const poll = setInterval(() => {
              if (_target._api) {
                clearInterval(poll);
                resolve(_target[prop](...args));
              }
            }, 250);
          });
      }
    });
  }

  async initApi() {
    const Fetch = Comlink.wrap(new Worker());
    this._api = await new Fetch(BASE_URL);
  }
}

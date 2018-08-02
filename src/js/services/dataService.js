class DataService {
  constructor(authKey) {
    this.fetchOptions = {
      headers: { 'Content-Type': 'application/json', Authorization: authKey },
      mode: 'cors',
      cache: 'default',
    };
  }

  logJSON(url) {
    this.fetchOptions.method = 'POST';
    fetch(url, this.fetchOptions)
      .then((res) => {
        res.json().then((data) => {
          console.log(data);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getJSON(url) {
    this.fetchOptions.method = 'GET';
    delete this.fetchOptions.body;
    const dataPromise = fetch(url, this.fetchOptions);
    return new Promise((resolve, reject) => {
      dataPromise
        .then((res) => {
          res.json().then((data) => {
            resolve(data);
          });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  postJSON(url, payload) {
    console.log(`Token received at the server, Token Value: ${payload.fcmToken}`);
    this.fetchOptions.method = 'POST';
    this.fetchOptions.body = JSON.stringify(payload);
    const dataPromise = fetch(url, this.fetchOptions);
    return new Promise((resolve, reject) => {
      dataPromise
        .then((res) => {
          res.json().then((data) => {
            resolve(data);
          });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  deleteJSON(url) {
    this.fetchOptions.method = 'DELETE';
    const dataPromise = fetch(url, this.fetchOptions);
    return new Promise((resolve, reject) => {
      dataPromise
        .then((res) => {
          res.json().then((data) => {
            resolve(data);
          });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  putJSON(url, payload) {
    this.fetchOptions.method = 'PUT';
    this.fetchOptions.body = JSON.stringify(payload);
    const dataPromise = fetch(url, this.fetchOptions);
    console.log(payload);
    return new Promise((resolve, reject) => {
      dataPromise
        .then((res) => {
          res.json().then((data) => {
            resolve(data);
          });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

export default DataService;

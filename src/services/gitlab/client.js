import axios from "axios";

export default class Client {
  constructor(baseURL, privateToken) {
    this.baseURL = baseURL;
    this.client = this._createClient(baseURL, privateToken);
  }

  _createClient(baseURL, privateToken) {
    return axios.create({
      baseURL,
      headers: {
        "Private-Token": privateToken
      }
    });
  }

  fetchUsers(usernames = []) {
    return Promise.all(usernames.map(username => this.fetchUser(username)));
  }

  fetchUser(username) {
    return this.client
      .get(`/api/v4/users?username=${username}`)
      .then(result => result.data[0]);
  }

  fetchCurrentUser() {
    return this.client.get("/api/v4/user").then(result => result.data);
  }

  searchUsers(text) {
    return this.client.get(`/api/v4/users?search=${text}`);
  }

  getAvatarUrl(email) {
    return this.client
      .get(`/api/v4/avatar?email=${email}`)
      .then(result => result.data);
  }

  getCurrentUser() {
    return this.client.get("/api/v4/user");
  }
}

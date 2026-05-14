export class User {
  constructor({ id, username, password, role = "client", associatedClientId }) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.role = role;
    this.associatedClientId = associatedClientId;
  }
}
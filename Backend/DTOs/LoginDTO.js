class LoginDTO {
    constructor({
      id,
      userId,
      timestamp,
      token
    }) {
      this.id = id;
      this.userId = userId;
      this.timestamp = timestamp;
      this.token = token;
    }
  }
  
  module.exports = LoginDTO;
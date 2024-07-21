class Login {
    #id;
    #userId;
    #timestamp;
    #token;
  
    constructor({
      id,
      userId,
      timestamp,
      token
    }) {
      this.#id = id;
      this.#userId = userId;
      this.#timestamp = timestamp;
      this.#token = token;
    }
  
    // Getters
    get id() { return this.#id; }
    get userId() { return this.#userId; }
    get timestamp() { return this.#timestamp; }
    get token() { return this.#token; }
  
    toString() {
      return `Login [id=${this.#id}, userId=${this.#userId}, timestamp=${this.#timestamp}]`;
    }
  }
  
  module.exports = Login;
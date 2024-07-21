class Contact {
    #id;
    #name;
    #address;
    #email;
    #cellphone;
    #profilePicture;
    #userId;
    #notes;
    #createdAt;
    #updatedAt;
  
    constructor({
      id,
      name,
      address,
      email,
      cellphone,
      profilePicture,
      userId,
      notes = [],
      createdAt,
      updatedAt
    }) {
      this.#id = id;
      this.#name = name;
      this.#address = address;
      this.#email = email;
      this.#cellphone = cellphone;
      this.#profilePicture = profilePicture;
      this.#userId = userId;
      this.#notes = notes;
      this.#createdAt = createdAt;
      this.#updatedAt = updatedAt;
    }
  
    // Getters
    get id() { return this.#id; }
    get name() { return this.#name; }
    get address() { return this.#address; }
    get email() { return this.#email; }
    get cellphone() { return this.#cellphone; }
    get profilePicture() { return this.#profilePicture; }
    get userId() { return this.#userId; }
    get notes() { return this.#notes; }
    get createdAt() { return this.#createdAt; }
    get updatedAt() { return this.#updatedAt; }
  
    toString() {
      return `Contact [id=${this.#id}, name=${this.#name}, address=${this.#address}, createdAt=${this.#createdAt}, updatedAt=${this.#updatedAt}]`;
    }
  }
  
  module.exports = Contact;
class User {
  #id;
  #name;
  #password;
  #contacts;
  #notes;
  #logins;
  #createdAt;
  #updatedAt;

  constructor({
    id,
    name,
    password,
    contacts = [],
    notes = [],
    logins = [],
    createdAt,
    updatedAt
  }) {
    this.#id = id;
    this.#name = name;
    this.#password = password;
    this.#contacts = contacts;
    this.#notes = notes;
    this.#logins = logins;
    this.#createdAt = createdAt;
    this.#updatedAt = updatedAt;
  }

  // Getters
  get id() { return this.#id; }
  get name() { return this.#name; }
  get password() { return this.#password; }
  get contacts() { return this.#contacts; }
  get notes() { return this.#notes; }
  get logins() { return this.#logins; }
  get createdAt() { return this.#createdAt; }
  get updatedAt() { return this.#updatedAt; }

  toString() {
    return `User [id=${this.#id}, name=${this.#name}, createdAt=${this.#createdAt}, updatedAt=${this.#updatedAt}]`;
  }
}

module.exports = User;
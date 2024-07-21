class Note {
    #id;
    #text;
    #contactId;
    #userId;
  
    constructor({
      id,
      text,
      contactId,
      userId
    }) {
      this.#id = id;
      this.#text = text;
      this.#contactId = contactId;
      this.#userId = userId;
    }
  
    // Getters
    get id() { return this.#id; }
    get text() { return this.#text; }
    get contactId() { return this.#contactId; }
    get userId() { return this.#userId; }
  
    toString() {
      return `Note [id=${this.#id}, text=${this.#text}, contactId=${this.#contactId}]`;
    }
  }
  
  module.exports = Note;
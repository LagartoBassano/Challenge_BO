class NoteDTO {
    constructor({
      id,
      text,
      contactId,
      userId
    }) {
      this.id = id;
      this.text = text;
      this.contactId = contactId;
      this.userId = userId;
    }
  }
  
  module.exports = NoteDTO;
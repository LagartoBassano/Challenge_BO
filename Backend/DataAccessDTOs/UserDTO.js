class UserDTO {
    constructor({
      id,
      name,
      password,
      contacts,
      notes,
      logins,
      createdAt,
      updatedAt
    }) {
      this.id = id;
      this.name = name;
      this.password = password;
      this.contacts = contacts; 
      this.notes = notes;       
      this.logins = logins;     
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }
  }
  
module.exports = UserDTO;
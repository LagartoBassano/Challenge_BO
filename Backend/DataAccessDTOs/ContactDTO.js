class ContactDTO {
    constructor({
      id,
      name,
      address,
      email,
      cellphone,
      profilePicture,
      userId,
      notes,
      createdAt,
      updatedAt
    }) {
      this.id = id;
      this.name = name;
      this.address = address;
      this.email = email;
      this.cellphone = cellphone;
      this.profilePicture = profilePicture;
      this.userId = userId;
      this.notes = notes;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }
  }
  
  module.exports = ContactDTO;
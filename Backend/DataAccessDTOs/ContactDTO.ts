import NoteDTO from "./NoteDTO";

class ContactDTO {
  public id: number;
  public name: string;
  public address: string;
  public email: string;
  public cellphone: string;
  public profilePicture?: string;
  public userId: number;
  public notes: NoteDTO[];
  public createdAt: Date;
  public updatedAt: Date;

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
    updatedAt,
  }: {
    id: number;
    name: string;
    address: string;
    email: string;
    cellphone: string;
    profilePicture?: string;
    userId: number;
    notes: NoteDTO[];
    createdAt: Date;
    updatedAt: Date;
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

export default ContactDTO;
import NoteDTO from './NoteDTO';
import ContactDTO from './ContactDTO';
import LoginDTO from './LoginDTO';

class UserDTO {
  public id: number;
  public name: string;
  public password: string;
  public contacts: ContactDTO[];
  public notes: NoteDTO[];
  public logins: LoginDTO[];
  public createdAt: Date;
  public updatedAt: Date;

  constructor({
    id,
    name,
    password,
    contacts,
    notes,
    logins,
    createdAt,
    updatedAt,
  }: {
    id: number;
    name: string;
    password: string;
    contacts: ContactDTO[];
    notes: NoteDTO[];
    logins: LoginDTO[];
    createdAt: Date;
    updatedAt: Date;
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

export default UserDTO;
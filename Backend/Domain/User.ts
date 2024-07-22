import Contact from './Contact';
import Note from './Note';
import Login from './Login';

interface UserProps {
  id: number;
  name: string;
  password: string;
  contacts?: Contact[];
  notes?: Note[];
  logins?: Login[];
  createdAt: Date;
  updatedAt: Date;
}

class User {
  private id: number;
  private name: string;
  private password: string;
  private contacts: Contact[];
  private notes: Note[];
  private logins: Login[];
  private createdAt: Date;
  private updatedAt: Date;

  constructor({
    id,
    name,
    password,
    contacts = [],
    notes = [],
    logins = [],
    createdAt,
    updatedAt
  }: UserProps) {
    this.id = id;
    this.name = name;
    this.password = password;
    this.contacts = contacts;
    this.notes = notes;
    this.logins = logins;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  // Getters
  getId(): number { return this.id; }
  getName(): string { return this.name; }
  getPassword(): string { return this.password; }
  getContacts(): Contact[] { return this.contacts; }
  getNotes(): Note[] { return this.notes; }
  getLogins(): Login[] { return this.logins; }
  getCreatedAt(): Date { return this.createdAt; }
  getUpdatedAt(): Date { return this.updatedAt; }

  toString(): string {
    return `User [id=${this.id}, name=${this.name}, createdAt=${this.createdAt}, updatedAt=${this.updatedAt}]`;
  }
}

export default User;

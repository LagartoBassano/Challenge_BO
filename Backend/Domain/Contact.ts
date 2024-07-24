import Note from "./Note";

interface ContactProps {
  id: number;
  name: string;
  address: string;
  email: string;
  cellphone: string;
  profilePicture?: string;
  userId: number;
  notes?: Note[];
  createdAt: Date;
  updatedAt: Date;
}

class Contact {
  private id: number;
  private name: string;
  private address: string;
  private email: string;
  private cellphone: string;
  private profilePicture?: string;
  private userId: number;
  private createdAt: Date;
  private updatedAt: Date;

  constructor({
    id,
    name,
    address,
    email,
    cellphone,
    profilePicture,
    userId,
    createdAt,
    updatedAt
  }: ContactProps) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.email = email;
    this.cellphone = cellphone;
    this.profilePicture = profilePicture;
    this.userId = userId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  // Getters
  getId(): number { return this.id; }
  getName(): string { return this.name; }
  getAddress(): string { return this.address; }
  getEmail(): string { return this.email; }
  getCellphone(): string { return this.cellphone; }
  getProfilePicture(): string | undefined { return this.profilePicture; }
  getUserId(): number { return this.userId; }
  getCreatedAt(): Date { return this.createdAt; }
  getUpdatedAt(): Date { return this.updatedAt; }

  toString(): string {
    return `Contact [id=${this.id}, name=${this.name}, address=${this.address}, createdAt=${this.createdAt}, updatedAt=${this.updatedAt}]`;
  }
}

export default Contact;

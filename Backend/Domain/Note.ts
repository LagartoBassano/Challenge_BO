interface NoteProps {
  id: number;
  text: string;
  contactId: number;
  userId: number;
}

class Note {
  private id: number;
  private text: string;
  private contactId: number;
  private userId: number;

  constructor({
    id,
    text,
    contactId,
    userId
  }: NoteProps) {
    this.id = id;
    this.text = text;
    this.contactId = contactId;
    this.userId = userId;
  }

  // Getters
  getId(): number { return this.id; }
  getText(): string { return this.text; }
  getContactId(): number { return this.contactId; }
  getUserId(): number { return this.userId; }

  toString(): string {
    return `Note [id=${this.id}, text=${this.text}, contactId=${this.contactId}]`;
  }
}

export default Note;

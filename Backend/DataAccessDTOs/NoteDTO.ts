class NoteDTO {
  public id: number;
  public text: string;
  public contactId: number;
  public userId: number;

  constructor({
    id,
    text,
    contactId,
    userId,
  }: {
    id: number;
    text: string;
    contactId: number;
    userId: number;
  }) {
    this.id = id;
    this.text = text;
    this.contactId = contactId;
    this.userId = userId;
  }
}

export default NoteDTO;

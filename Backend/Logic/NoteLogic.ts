import INoteRepository from '../DataAccessInterfaces/INoteRepository';
import Note from '../Domain/Note';

class NoteLogic {
  private noteRepository: INoteRepository;

  constructor(noteRepository: INoteRepository) {
    this.noteRepository = noteRepository;
  }

  async createNote(text: string, contactId: number, userId: number): Promise<Note> {
    const note = new Note({
      id: 0,
      text,
      contactId,
      userId
    });
    return this.noteRepository.createNote(note);
  }

  async getNoteById(id: number): Promise<Note | null> {
    return this.noteRepository.getNoteById(id);
  }

  async getNotesByUserId(userId: number, page: number, pageSize: number): Promise<Note[]> {
    return this.noteRepository.getNotesByUserId(userId, page, pageSize);
  }

  async updateNote(id: number, data: Partial<Omit<Note, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Note> {
    return this.noteRepository.updateNote(id, data);
  }

  async deleteNote(id: number): Promise<Note> {
    return this.noteRepository.deleteNote(id);
  }
}

export default NoteLogic;

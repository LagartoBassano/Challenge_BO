import Note from '../Domain/Note';

interface INoteRepository {
  createNote(note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>): Promise<Note>;
  getNoteById(id: number): Promise<Note | null>;
  getNotesByUserId(userId: number, page: number, pageSize: number): Promise<Note[]>;
  updateNote(id: number, data: Partial<Omit<Note, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Note>;
  deleteNote(id: number): Promise<Note>;
}

export default INoteRepository;

import Contact from '../Domain/Contact';

interface IContactRepository {
  createContact(contact: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>): Promise<Contact>;
  getContactById(id: number): Promise<Contact | null>;
  getContactsByUserId(userId: number, page: number, pageSize: number): Promise<Contact[]>;
  updateContact(id: number, data: Partial<Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Contact>;
  deleteContact(id: number): Promise<Contact>;
}

export default IContactRepository;

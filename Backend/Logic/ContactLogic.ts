import IContactRepository from '../DataAccessInterfaces/IContactRepository';
import Contact from '../Domain/Contact';
import IContactLogic from '../LogicInterfaces/IContactLogic';

class ContactLogic implements IContactLogic{
  private repository: IContactRepository;

  constructor(repository: IContactRepository) {
    this.repository = repository;
  }

  async createContact(contact: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>): Promise<Contact> {
    return this.repository.createContact(contact);
  }

  async getContactById(id: number): Promise<Contact | null> {
    return this.repository.getContactById(id);
  }

  async getContactsByUserId(userId: number, page: number, pageSize: number): Promise<Contact[]> {
    return this.repository.getContactsByUserId(userId, page, pageSize);
  }

  async updateContact(id: number, data: Partial<Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Contact> {
    return this.repository.updateContact(id, data);
  }

  async deleteContact(id: number): Promise<Contact> {
    return this.repository.deleteContact(id);
  }
}

export default ContactLogic;

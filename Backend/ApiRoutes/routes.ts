import { Router } from 'express';
import LoginController from '../ApiControllers/LoginController';
import UserController from '../ApiControllers/UserController';
import ContactController from '../ApiControllers/ContactController';
import NoteController from '../ApiControllers/NoteController';
import LoginLogic from '../Logic/LoginLogic';
import UserLogic from '../Logic/UserLogic';
import ContactLogic from '../Logic/ContactLogic';
import NoteLogic from '../Logic/NoteLogic';
import LoginRepository from '../DataAccessRepositories/LoginRepository';
import NoteRepository from '../DataAccessRepositories/NoteRepository';
import ContactRepository from '../DataAccessRepositories/ContactRepository';
import UserRepository from '../DataAccessRepositories/UserRepository';
import { AuthMiddleware } from '../Middleware/AuthMiddleware';

const loginRepository = new LoginRepository();
const userRepository = new UserRepository();
const contactRepository = new ContactRepository();
const noteRepository = new NoteRepository();

const loginLogic = new LoginLogic(loginRepository);
const userLogic = new UserLogic(userRepository);
const contactLogic = new ContactLogic(contactRepository);
const noteLogic = new NoteLogic(noteRepository);

const loginController = new LoginController(loginLogic);
const userController = new UserController(userLogic);
const contactController = new ContactController(contactLogic, noteLogic);
const noteController = new NoteController(noteLogic);

const router = Router();
router.use('/api/user', AuthMiddleware);
router.use('/api/contacts', AuthMiddleware);
router.use('/api/notes', AuthMiddleware);

router.post('/api/login', loginController.createLogin.bind(loginController));

router.get('/api/user', userController.getUser.bind(userController));

router.get('/api/contacts', contactController.getContacts.bind(contactController));
router.get('/api/contacts/:contactId', contactController.getContactById.bind(contactController));
router.post('/api/contacts', contactController.createContact.bind(contactController));
router.put('/api/contacts/:contactId', contactController.updateContact.bind(contactController));
router.post('/api/contacts/:contactId/notes', contactController.createNoteForContact.bind(contactController));

router.get('/api/notes', noteController.getNotes.bind(noteController));
router.get('/api/notes/:noteId', noteController.getNoteById.bind(noteController));

export default router;

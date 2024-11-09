import { Router } from 'express';
import { createNewLibraryAccount, authenticateLibraryUser } from '../controllers/auth.controller';

const libraryAuthRouter = Router();

libraryAuthRouter.post('/register', createNewLibraryAccount);
libraryAuthRouter.post('/login', authenticateLibraryUser);

export default libraryAuthRouter;
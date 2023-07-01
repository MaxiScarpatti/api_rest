import { Router } from 'express';
import {
  getAllLibraries,
  getLibraryById,
  updateLibrary,
  deleteLibrary,
  createNewLibrary,
} from '../controllers/library.js';
import isAuthenticated from '../middleware/logging.js';

const router = Router();

router.get('/', getAllLibraries);
router.get('/:id', getLibraryById);
router.post('/new', isAuthenticated, createNewLibrary);
router.put('/:id', isAuthenticated, updateLibrary);
router.delete('/:id', isAuthenticated, deleteLibrary);

export default router;
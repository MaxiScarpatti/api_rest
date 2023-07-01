import { Router } from 'express';
import {
  createNewBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
} from '../controllers/book.js';
import isAuthenticated from '../middleware/logging.js';

const router = Router();

router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.post('/new', isAuthenticated, createNewBook);
router.put('/:id', isAuthenticated, updateBook);
router.delete('/:id', isAuthenticated, deleteBook);

export default router;
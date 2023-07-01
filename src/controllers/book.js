import { request, response } from 'express';
import {
  bookById,
  deactivateBook,
  getAll,
  newBook,
  newBookWithoutLibrary,
  updateBookService,
} from '../services/book.js';

export const getAllBooks = async (req = request, res = response, next) => {
  try {
    const books = await getAll();

    res.json({
      books: books,
    });
  } catch (error) {
    next(error);
  }
};

export const getBookById = async (req = request, res = response, next) => {
  const { id } = req.params;

  try {
    const book = await bookById(id);

    res.json({
      book,
    });
  } catch (error) {
    next(error);
  }
};

export const createNewBook = async (req = request, res = response, next) => {
  const { isbn, title, author, year, libraryId } = req.body;

  if (!libraryId) {
    const book = await newBookWithoutLibrary(isbn, title, author, year);

    res.json({
      book,
    });
  }

  try {
    const book = await newBook(isbn, title, author, year, libraryId);

    res.json({
      book,
    });
  } catch (error) {
    next(error);
  }
};

export const updateBook = async (req = request, res = response, next) => {
  const { id } = req.params;
  const body = req.body;

  try {
    const updatedBook = await updateBookService(id, body);

    res.json({
      updatedBook,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteBook = async (req = request, res = resolve, next) => {
  const { id } = req.params;

  try {
    const deletedBook = await deactivateBook(id);

    res.json({
      deletedBook,
    });
  } catch (error) {
    next(error);
  }
};
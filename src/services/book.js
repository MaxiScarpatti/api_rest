import { where } from 'sequelize';
import Book from '../models/book.js';
import Libraries from '../models/library.js';

export const getAll = async () => {
  const bookList = await Book.findAll();

  if (!bookList) {
    throw new Error('There are no books on the Database.');
  }

  return bookList;
};

export const bookById = async (id) => {
  const book = await Book.findByPk(id);

  if (!book) {
    throw new Error(`There is no book with the id: ${id} on the Database`);
  }

  return book;
};

export const newBook = async (isbn, title, author, year, libraryId) => {
  // Validate if the library exists
  const checkLibrary = await Libraries.findByPk(libraryId);
  if (!checkLibrary) {
    throw new Error(`There is no Library with the id ${libraryId}.`);
  }

  const book = await Book.create({ isbn, title, author, year, libraryId });

  return book;
};

export const newBookWithoutLibrary = async (isbn, title, author, year) => {
  const book = await Book.create({ isbn, title, author, year });

  return book;
};

export const updateBookService = async (id, body) => {
  const { isbn, title, author, year, libraryId } = body;

  // Check if Library exist
  const checkLibrary = await Libraries.findOne({
    where: {
      id: libraryId,
      isActive: true,
    },
  });

  if (libraryId !== null) {
    if (!checkLibrary) {
      throw new Error(`There's no active Library with the libraryId provided.`);
    }
  }

  // Check if Book exist
  const bookToUpdate = await Book.findByPk(id);

  if (!bookToUpdate) {
    throw new Error(`There is no book on the Database with the id ${id}`);
  }

  if (bookToUpdate.isActive === false) {
    throw new Error(
      `The selected book with the id ${id} is inactive. Contact administrator tu activate it again.`
    );
  }

  // Update Fields
  if (bookToUpdate) {
    if (isbn) {
      bookToUpdate.isbn = isbn;
    } else if (title) {
      bookToUpdate.title = title;
    } else if (author) {
      bookToUpdate.author = author;
    } else if (year) {
      bookToUpdate.year = year;
    }
    // Uncoment to activate a deleted book through update endpoint

    // else if (isActive) {
    //   bookToUpdate.isActive = 1;
    // }

    await bookToUpdate.save();
  }

  // Set libraryId to null to remove book from a library
  if (libraryId === null) {
    await bookToUpdate.update({
      libraryId: null,
    });
  } else {
    await bookToUpdate.update({
      libraryId: libraryId,
    });
  }

  return bookToUpdate;
};

export const deactivateBook = async (id) => {
  const deleteBook = await Book.findByPk(id);

  if (!deleteBook) {
    throw new Error(
      `Error. The book with the id ${id} wasn't found on the Database.`
    );
  }

  deleteBook.isActive = false;

  await deleteBook.save();

  return deleteBook;
};
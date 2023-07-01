import Book from '../models/book.js';
import Libraries from '../models/library.js';

export const getAll = async () => {
  const librariesList = await Libraries.findAll({
    where: {
      isActive: 1,
    },
    include: [
      {
        as: 'books',
        model: Book,
        where: {
          isActive: true,
        },
        required: false,
      },
    ],
    plain: false,
    nest: true,
  });

  if (librariesList.length < 1) {
    throw new Error(`There are no active libraries on the Database.`);
  }

  return librariesList;
};

export const createLibrary = async (body) => {
  const { name } = body;

  const checkIfLibraryExists = await Libraries.findOne({
    where: {
      name: name,
    },
  });

  if (checkIfLibraryExists) {
    throw new Error(`There's already a library with the name ${name}.`);
  }

  const library = await Libraries.create(body);

  return library;
};

export const getById = async (id) => {
  const library = await Libraries.findByPk(id, {
    include: [
      {
        as: 'books',
        model: Book,
      },
    ],
  });

  if (!library) {
    throw new Error(`There is no library with the id ${id}`);
  }

  return library;
};

export const update = async (id, body) => {
  const libraryToUpdate = await Libraries.findByPk(id);

  const { name, location, phone, isActive } = body;

  if (!libraryToUpdate) {
    throw new Error(`There is no library with the id ${id}`);
  }

  if (libraryToUpdate) {
    if (name) {
      libraryToUpdate.name = name;
    } else if (location) {
      libraryToUpdate.location = location;
    } else if (phone) {
      libraryToUpdate.phone = phone;
    }

    // Uncoment to activate a deleted library through update endpoint

    // else if (isActive) {
    //   libraryToUpdate.isActive = 1;
    // }

    await libraryToUpdate.save();
  }

  return libraryToUpdate;
};

export const deactivate = async (id) => {
  const deleteLibrary = await Libraries.findByPk(id);

  if (!deleteLibrary) {
    throw new Error(`There is no library with the id ${id}`);
  }

  deleteLibrary.isActive = false;

  await deleteLibrary.save();

  // await Libraries.update(
  //   { isActive: 0 },
  //   {
  //     where: {
  //       id: id,
  //     },
  //   }
  // );

  return deleteLibrary;
};
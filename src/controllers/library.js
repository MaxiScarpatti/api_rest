import { request, response } from 'express';
import {
  getAll,
  update,
  deactivate,
  createLibrary,
  getById,
} from '../services/library.js';

export const getAllLibraries = async (req = request, res = response, next) => {
  try {
    const libraries = await getAll();

    res.status(200).json({
      libraries,
    });
  } catch (error) {
    next(error);
  }
};

export const createNewLibrary = async (req = request, res = response, next) => {
  try {
    const body = req.body;

    const newLibrary = await createLibrary(body);

    res.json({
      newLibrary,
    });
  } catch (error) {
    next(error);
  }
};

export const getLibraryById = async (req = request, res = response, next) => {
  const { id } = req.params;

  try {
    const library = await getById(id);

    res.json({
      library,
    });
  } catch (error) {
    next(error);
  }
};

export const updateLibrary = async (req = request, res = response, next) => {
  const { id } = req.params;
  const body = req.body;

  try {
    const updateLibrary = await update(id, body);

    res.json({
      updateLibrary,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteLibrary = async (req = request, res = response, next) => {
  const { id } = req.params;

  try {
    const deletedProduct = await deactivate(id);

    res.json({ deletedProduct });
  } catch (error) {
    next(error);
  }
};
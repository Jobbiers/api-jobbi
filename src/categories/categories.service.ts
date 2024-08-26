import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ResponseHandler } from 'src/utils/ResponseHandler';
import { CategoryEntity } from './entities/category.entity';
import DatabaseService from 'src/config/databaseClient';
import { categoriesQueries } from './queries/query';
import { FindCategoryParamsDto } from './dto/find-category.dto';

@Injectable()
export class CategoriesService {
  async create(newCategory: CreateCategoryDto) {
    try {
      const con = await DatabaseService.getConnection();
      const createdCategory = con.manager.create(CategoryEntity, newCategory);
      await con.manager.save(createdCategory);
      return ResponseHandler.success({
        data: createdCategory,
        message: 'Category created successfully',
        status: 200,
      });
    } catch (error) {
      return ResponseHandler.error({
        error: error,
        message: 'Ups...',
        status: 500,
      });
    }
  }
  async findAll(filters: FindCategoryParamsDto) {
    try {
      const con = await DatabaseService.getConnection();
      const categories = await con.query(categoriesQueries.findAll(filters));
      return ResponseHandler.success({
        data: categories,
        message: 'Categories searched successfully',
        status: 200,
      });
    } catch (error) {
      return ResponseHandler.error({
        error: error,
        message: 'Ups...',
        status: 500,
      });
    }
  }

  async findOne(id: number) {
    try {
      const con = await DatabaseService.getConnection();
      const category = await con.manager.findOne(CategoryEntity, { where: { id } });
      if (!category) {
        throw new Error('Category not found');
      }
      return ResponseHandler.success({
        data: category,
        message: 'Category searched successfully',
        status: 200,
      });
    } catch (error) {
      return ResponseHandler.error({
        error: error,
        message: 'Ups...',
        status: 500,
      });
    }
  }

  async update(id: number, updateCategory: CreateCategoryDto) {
    try {
      const con = await DatabaseService.getConnection();
      const category = await con.manager.findOne(CategoryEntity, { where: { id } });
      if (!category) {
        throw new Error('Category not found');
      }
      Object.assign(category, updateCategory);
      await con.manager.save(category);
      return ResponseHandler.success({
        data: category,
        message: 'Category updated successfully',
        status: 200,
      });
    } catch (error) {
      return ResponseHandler.error({
        error: error,
        message: 'Ups...',
        status: 500,
      });
    }
  }

  async remove(id: number) {
    try {
      const con = await DatabaseService.getConnection();
      const category = await con.manager.findOne(CategoryEntity, { where: { id } });
      const categoryRemoved = await con.manager.delete(CategoryEntity, { id });
      return ResponseHandler.success({
        data: category,
        message: 'Category removed successfully',
        status: 200,
      });
    } catch (error) {
      return ResponseHandler.error({
        error: error,
        message: 'Ups...',
        status: 500,
      });
    }
  }
  async createAll() {
  try {
    const con = await DatabaseService.getConnection();
    const categoriesPromises = categoriesMock.map( async (category) => {
      const createdCategory = con.manager.create(CategoryEntity, { name: category.name });
      await con.manager.save(createdCategory);
    });
    const categoriesCreated = await Promise.all(categoriesPromises);
    return ResponseHandler.success({
      data: categoriesCreated,
      message: 'All categories created successfully',
      status: 200,
    });
  } catch (error) {
    return ResponseHandler.error({
      error: error,
      message: 'Ups...',
      status: 500,
    });
  }
  }
}

const categoriesMock = [];
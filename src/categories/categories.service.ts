import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ResponseHandler } from 'src/utils/ResponseHandler';

@Injectable()
export class CategoriesService {
  create(createCategoryDto: CreateCategoryDto) {
    try {
      const category = {};
      // await db.create(CreateCategoryDto, createCategoryDto);
      return ResponseHandler.success({
        data: category,
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

  findAll() {
    try {
      const categories = [];
      // await db.findAll(CreateCategoryDto, createCategoryDto);
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

  findOne(id: number) {
    try {
      const category = {};
      // const category = await db.finByPk(CreateCategoryDto, createCategoryDto);
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

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      const category = {};
      // const category = await db.updateByPk(CreateCategoryDto, createCategoryDto);
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

  remove(id: number) {
    try {
      const category = {};
      // const category = await db.removeByPk(CreateCategoryDto, createCategoryDto);
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
}

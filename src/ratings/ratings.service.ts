import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { ResponseHandler } from 'src/utils/ResponseHandler';
import DatabaseService from 'src/config/databaseClient';
import { RatingEntity } from './entities/rating.entity';
import { ServiceEntity } from 'src/services/entities/service.entity';
import { ratingsQuery } from './queries/query';

@Injectable()
export class RatingsService {
  async create(createRating: CreateRatingDto) {
    try {
      const con = await DatabaseService.getConnection();
      const service = await con.manager.findOne(ServiceEntity, {
        where: { id: createRating.serviceId },
      });
      if (!service) {
        throw new NotFoundException(
          `Service with ID ${createRating.serviceId} not found`,
        );
      }
      const newRating = await con.manager.create(RatingEntity, createRating);
      con.manager.save(newRating);
      return ResponseHandler.success({
        data: newRating,
        status: 200,
        message: 'Rating created successfully',
      });
    } catch (error) {
      console.error(error);
      return ResponseHandler.error({
        error: error,
        message: error.message,
        status: 500,
      });
    }
  }

  async findByService(id: number) {
    try {
      const con = await DatabaseService.getConnection();
      const services = await con.manager.find(RatingEntity, {
        where: { service: { id } },
      });
      return ResponseHandler.success({
        data: services,
        status: 200,
        message: 'Ratings by business',
      });
    } catch (error) {
      console.error(error);
      return ResponseHandler.error({
        error: error,
        message: error.message,
        status: 500,
      });
    }
  }

  async findUserRating(id: number) {
    try {
      const con = await DatabaseService.getConnection();
      const rating = await con.query(ratingsQuery.findByProfessionalId(id))
      return ResponseHandler.success({
        data: rating,
        status: 200,
        message: 'Ratings by business',
      });
    } catch (error) {
      console.error(error);
      return ResponseHandler.error({
        error: error,
        message: error.message,
        status: 500,
      });
    }
  }

  async update(id: number, updateRatingDto: UpdateRatingDto) {
    try {
      const con = await DatabaseService.getConnection();
      const business = await con.manager.findOne(RatingEntity, {
        where: { id: updateRatingDto.id },
      });
      con.manager.remove(business);
      return ResponseHandler.success({
        data: business,
        status: 200,
        message: 'Rating deleted succesfully',
      });
    } catch (error) {
      console.error(error);
      return ResponseHandler.error({
        error: error,
        message: error.message,
        status: 500,
      });
    }
  }

  async remove(id: number) {
    try {
      const con = await DatabaseService.getConnection();
      const business = await con.manager.findOne(RatingEntity, {
        where: { id },
      });
      con.manager.remove(business);
      return ResponseHandler.success({
        data: business,
        status: 200,
        message: 'Rating deleted succesfully',
      });
    } catch (error) {
      console.error(error);
      return ResponseHandler.error({
        error: error,
        message: error.message,
        status: 500,
      });
    }
  }
}

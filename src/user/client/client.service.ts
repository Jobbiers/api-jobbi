import { Injectable } from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import DatabaseService from 'src/config/databaseClient';
import { UserClientEntity } from './entities/client.entity';
import { ResponseHandler } from 'src/utils/ResponseHandler';
import admin from 'firebase-admin';

@Injectable()
export class UserClientService {
  async createWithGoogle(newUser: CreateUserDto) {
    try {
      const con = await DatabaseService.getConnection();
      const createdUser = con.manager.create(UserClientEntity, newUser);
      await admin
        .auth()
        .createUser({
          email: newUser.email,
          password: newUser.password,
          displayName: `${newUser.name} ${newUser.lastName}`,
        })
        .then((userRecord) => {
          console.log('User created successfully:', userRecord.uid);
          con.manager.save(createdUser).catch(async (error) => {
            await admin.auth().deleteUser(userRecord.uid);
            throw new Error(
              `Error saving user to database: ${JSON.stringify(error)}`,
            );
          });
        })
        .catch((error) => {
          const errorMessage = error.message;
          console.error('errorFb: ', error);
          throw new Error(errorMessage);
        });
      return ResponseHandler.success({
        data: createdUser,
        message: 'User created successfully',
        status: 200,
      });
    } catch (error) {
      console.error('errorFb: ', error);
      return ResponseHandler.error({
        error: error,
        message: "We've some problems creating the user...",
        status: 500,
      });
    }
  }

  async create(newUser: CreateUserDto) {
    try {
      const con = await DatabaseService.getConnection();
      const createdUser = con.manager.create(UserClientEntity, newUser);
      con.manager.save(createdUser);
      return ResponseHandler.success({
        message: 'User created successfully',
        status: 200,
      });
    } catch (error) {
      return ResponseHandler.error({
        error: error,
        message: "We've some problems creating the user...",
        status: 500,
      });
    }
  }

  async login(userCredentials: LoginUserDto) {
    try {
      const userFb = await admin
        .auth()
        .getUserByEmail(userCredentials.email)
        .catch();
      if (userFb) {
        const con = await DatabaseService.getConnection();
        const dbUser = await con.manager.findOneBy(UserClientEntity, {
          email: userCredentials.email,
        });
        if (dbUser) {
          return ResponseHandler.success({
            message: 'Login successful',
            status: 200,
            data: dbUser,
          });
        } else {
          const createdUser = createDbUser(userCredentials);
          if (createdUser) return ResponseHandler.success({
            message: 'Login successful',
            status: 200,
            data: createdUser,
          });;
          throw new Error('Problems creating user in database');
        }
      } else {
        throw new Error('User not found in database');
      }
    } catch (error) {
      return ResponseHandler.error({
        error: error,
        message: error.message,
        status: 500,
      });
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

const createDbUser = async (userCredentials: LoginUserDto) => {
  try {
    const name = userCredentials.email.split('@')[0];
    const validatedUser = new UserClientEntity();
    validatedUser.name = name;
    validatedUser.lastName = `${Math.floor(Math.random() * (9000 - 1000 + 1)) + 1000}`;
    validatedUser.email = userCredentials.email;
    const con = await DatabaseService.getConnection();
    const createdUser = con.manager.create(UserClientEntity, validatedUser);
    con.manager.save(createdUser);
    return { data: createdUser };
  } catch (error) {
    return { data: null };
  }
};

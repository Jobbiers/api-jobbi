import { DataSource } from 'typeorm';
import { join } from 'path';

let _connection: DataSource | null = null;

export default class DatabaseService {
  static async init() {
    try {
      if (!_connection) {
        console.log('Inicializando DB');
        const con = new DataSource({
          type: 'postgres',
          host: process.env.DB_HOST,
          password: process.env.DB_PASS,
          port: Number(process.env.DB_PORT),
          username: process.env.DB_USER,
          database: process.env.DB_NAME,
          logging: false,
          synchronize: true,
          entities: [join(__dirname + '/../**/*.entity{.ts,.js}')],
          // migrations: [join(__dirname + '/../**/*.migration{.ts,.js}')],
          // subscribers: [join(__dirname + '/../**/*.subscriber{.ts,.js}')],
        });
        DatabaseService.connection = await con.initialize();
      }
    } catch (e) {
      console.log('Error', e);
    }
  }

  static async getConnection() {
    if(!_connection) {
      await DatabaseService.init();
    }
    return _connection as DataSource;
  }
  static set connection(conn: DataSource) {
    _connection = conn;
  }
}
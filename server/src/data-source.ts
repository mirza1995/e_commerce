import { DataSource, DataSourceOptions } from 'typeorm';

//TODO - check migrations
export const appDataSource = new DataSource({
  type: 'mysql',
  database: 'production',
  entities: ['**/*.entity.ts'],
  migrations: [__dirname + '/migrations/*.ts']
} as DataSourceOptions);

import { Options } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

const config: Options<PostgreSqlDriver> = {
  type: 'postgresql',
  user: process.env['POSTGRES_USER'],
  dbName: process.env['POSTGRES_DB'],
  port: parseInt(process.env['POSTGRES_PORT']),
  password: process.env['POSTGRES_PWD'],
  entities: ['./dist/entities'], // path to our JS entities (dist), relative to `baseDir`
  entitiesTs: ['./src/entities'], // path to our TS entities (src), relative to `baseDir`
  metadataProvider: TsMorphMetadataProvider,
};

export default config;

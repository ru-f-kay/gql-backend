import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

const isDev = process.env['NODE_ENV'] !== 'production';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: isDev,
      playground: isDev,
      autoSchemaFile: true,
      sortSchema: true,
      buildSchemaOptions: {
        dateScalarMode: 'isoDate',
      },
    }),
    MikroOrmModule.forRoot({
      type: 'postgresql',
      user: process.env['POSTGRES_USER'],
      dbName: process.env['POSTGRES_DB'],
      port: parseInt(process.env['POSTGRES_PORT']),
      password: process.env['POSTGRES_PWD'],
      entities: ['./dist/**/*.entity.ts'],
      entitiesTs: ['./src/**/*.entity.ts'],
      metadataProvider: TsMorphMetadataProvider,
      autoLoadEntities: true,
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

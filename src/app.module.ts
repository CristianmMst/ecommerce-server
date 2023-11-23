import { DataSource } from 'typeorm';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';

// Coneccion con mongodb
// MongooseModule.forRoot(
//   'mongodb+srv://Cristian:melannie123@movies.uld0ekb.mongodb.net/Ecommerce?retryWrites=true&w=majority',
// ),

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'melannie123',
      database: 'ecommerce',
      synchronize: true,
      autoLoadEntities: true,
    }),

    ProductsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}

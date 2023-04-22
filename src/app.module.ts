import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProdutoModule } from './produto/produto.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/nome-do-banco-de-dados'), ProdutoModule, AuthModule, ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor() {}

  async onModuleInit() {
    try {
      await mongoose.connect('mongodb://localhost/nome-do-banco-de-dados');
      console.log('Conectado ao MongoDB');
    } catch (error) {
      console.log('Erro ao conectar ao MongoDB', error);
    }
  }
}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

// Import các module chính
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { PostsModule } from './modules/posts/posts.module';
import { InteriorsModule } from './modules/interiors/interiors.module'; // ✅ Thêm module Interiors
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { VerifyModule } from './modules/verify/verify.module';
@Module({
  imports: [
    // ✅ Đọc biến môi trường từ file `.env`
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // ✅ Cấu hình Multer để hỗ trợ upload file
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads', // ✅ Lưu ảnh vào thư mục `uploads/`
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(
            null,
            `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`,
          );
        },
      }),
    }),

    // ✅ Import các module chính
    DatabaseModule,
    AuthModule,
    UsersModule,
    PostsModule,
    InteriorsModule, // ✅ Import module mới thêm vào
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST,
        port: parseInt(process.env.MAIL_PORT || '587'),
        secure: false,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASSWORD,
        },
        tls: {
          rejectUnauthorized: false,
        },
        debug: true,
      },
      defaults: {
        from: `"Katsun Decor" <${process.env.MAIL_USER}>`,
      },
      template: {
        dir: join(__dirname, 'modules', 'verify', 'templates'), // Sửa đường dẫn
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    VerifyModule,
  ],
})
export class AppModule {}

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import mongoose from 'mongoose';

async function bootstrap() {
  console.log('🚀 Đang khởi tạo ứng dụng NestJS...');

  try {
    console.log('⏳ Đang chờ kết nối MongoDB hoàn tất...');
    await mongoose.connection.asPromise(); // ⏳ Chờ kết nối MongoDB hoàn tất
    console.log('✅ Kết nối MongoDB đã sẵn sàng, khởi động ứng dụng...');

    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    // ✅ Bật CORS để frontend có thể gọi API
    app.enableCors({
      origin: '*', // ✅ Cho phép frontend gọi API
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      allowedHeaders: 'Content-Type, Authorization',
      credentials: true, // Nếu cần gửi cookie hoặc xác thực
    });

    // ✅ Sử dụng ValidationPipe để kiểm tra dữ liệu đầu vào
    app.useGlobalPipes(new ValidationPipe());

    // ✅ Cho phép truy cập file tĩnh trong thư mục `uploads/`
    app.useStaticAssets(join(__dirname, '..', 'uploads'), {
      prefix: '/uploads',
    });

    const PORT = process.env.PORT || 5511;
    await app.listen(PORT);
    console.log(`🚀 Ứng dụng đang chạy tại: http://localhost:${PORT}`);
  } catch (error) {
    console.error('❌ Lỗi khởi động ứng dụng:', error.message);
    process.exit(1);
  }
}

bootstrap();

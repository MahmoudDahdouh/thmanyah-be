import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { Podcast } from './entities/podcast.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Podcast])],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {}

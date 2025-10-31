import {
  Controller,
  Get,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiService } from './api.service';

@Controller('api/v1')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Get('search')
  async search(@Query('q') term: string) {
    if (!term) {
      throw new HttpException(
        'Search term is required',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.apiService.searchAll(term);
  }
}

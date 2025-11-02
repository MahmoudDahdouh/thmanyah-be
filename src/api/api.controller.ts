import { Controller, Get, Query } from '@nestjs/common';
import { ApiService } from './api.service';
import { SearchQueryDto } from './dto/search-query.dto';

@Controller('api/v1')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Get('search')
  async search(@Query() query: SearchQueryDto) {
    return this.apiService.searchAll(query.q);
  }
}

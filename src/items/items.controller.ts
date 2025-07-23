import {
  Controller,
  Get,
  Query,
  UseGuards,
  Request,
  Req,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Req() req,
  ) {
    return this.itemsService.findAll(Number(page), Number(limit));
  }
}

import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("/produkterminal")
  async getProductTerminal(@Query("id") idterminal:number): Promise<object> {
    return await this.appService.getProdukTerminal(idterminal);
  }

  @Get("/syncprodukterminal")
  async syncProductTerminal(@Query("id") idterminal:number): Promise<object> {
    return await this.appService.syncProdukTerminal(idterminal);
  }

  @Get("/sync-all")
  async asyncall(): Promise<object> {
    return await this.appService.syncAllTerminal();
  }
}

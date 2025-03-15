import { HttpException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { ProdukEntity } from './entity/produk.entity';
import { ProdukTerminalEntity } from './entity/produkterminal.entity';
import { TerminalEntity } from './entity/terminal.entity';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { PriceResponse } from './priceresponse';
import { DetailPricePlanEntity } from './entity/detailpriceplan.entity';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  constructor(
    @InjectRepository(ProdukEntity)
    private produkRepository: Repository<ProdukEntity>,
    @InjectRepository(TerminalEntity)
    private terminalRepository: Repository<TerminalEntity>,
    @InjectRepository(ProdukTerminalEntity)
    private produkTerminalRepository: Repository<ProdukTerminalEntity>,
    private readonly httpService: HttpService,
    @InjectRepository(DetailPricePlanEntity) private detailPricePlanRepository: Repository<DetailPricePlanEntity>,
  ) { }

  async syncAllTerminal(): Promise<object> {
    const terminals = await this.terminalRepository.find(
      {
        where: {
          jenisterminal: 4,
          idrs: Not(''),
        }
      }
    );  
    for (let i = 0; i < terminals.length; i++) {
      console.log(terminals[i].id);
      await this.syncProdukTerminal(terminals[i].id);
    } 
    return {
      message: 'Sync All Terminal Success !'
    }
  }

  async syncProdukTerminal(idterminal: number): Promise<object> {
    if (!idterminal) {
      throw new HttpException('Terminal not found', 400);
    }
    const terminal = await this.terminalRepository.findOne({
      where: {
        id: idterminal,
      },
    });

    if (!terminal) {
      throw new HttpException('Terminal not found', 400);
    }

    try {
      console.log('Sync Produk Terminal : ' + terminal.namaterminal);
      const resp = await lastValueFrom(this.httpService.get<PriceResponse[]>(terminal.url + '/product?idrs=' + terminal.idrs));
      console.log('Total Produk: ' + resp.data.length);
      for (let i = 0; i < resp.data.length; i++) {
        const prodterminal = await this.produkTerminalRepository.findOne({
          where: {
            terminal: terminal,
            kodesuplier: resp.data[i].kode,
          },
        });
        if (prodterminal) {
          console.log('Update Produk Terminal');
          prodterminal.hargabeli = resp.data[i].harga;
          await this.produkTerminalRepository.save(prodterminal);
          let updated = await this.detailPricePlanRepository.update({
            produk: prodterminal.produk
          },
            { hargajual: resp.data[i].harga }
          );
          console.log(updated);
        }
      }
    } catch (error) {
      console.log('Error Sync Produk Terminal');
      if (error.response) {
        console.log(error.response.data);
        throw new HttpException(error.response.data.message, 500);
      }
    }

    return {
      terminal: terminal
    }
  }

  async getProdukTerminal(idterminal: number): Promise<object> {
    if (!idterminal) {
      throw new HttpException('Terminal not found', 400);
    }
    const terminal = await this.terminalRepository.findOne({
      where: {
        id: idterminal,
      },
    });

    if (!terminal) {
      throw new HttpException('Terminal not found', 400);
    }

    const produkTerminal = await this.produkTerminalRepository.find({
      where: {
        terminal: terminal,
      },
      relations: ['produk'],
    });
    return produkTerminal;
  }
  getHello(): string {
    return 'Hello World!';
  }


  @Cron(CronExpression.EVERY_HOUR)
  async handleCron() {
    this.logger.debug('Called Every Hour');
    try {
      await this.syncAllTerminal();
    } catch (error) {
      console.log(error);
    }
  }

}

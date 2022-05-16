import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { Game } from '../models/game.model';
import { GamesResponseData } from '../models/games-response-data.model';
import * as moment from 'moment';
import { apiKey, apiURL } from 'src/assets/constants/my-game-library.contants';

@Injectable({
  providedIn: 'root'
})
export class GameService extends BaseService {

  constructor(protected http: HttpClient) {
    super(http);
  }

  // public async getGameInfo(id: number | string): Promise<Game> {
  //   const report = await this.getGameInfoReport(id);
  //   return this.converterService.convertGameInfoFromReport(report);
  // }

  public async getFilteredGames(searchValue?: string): Promise<GamesResponseData> {
    const report = await this.getFilteredGamesReport(searchValue);
    return this.getGamesResponseDataFromReport(report);
  }

  public async getGamesByUrl(url: string): Promise<GamesResponseData> {
    const report = await this.getGamesByUrlReport(url);
    return this.getGamesResponseDataFromReport(report);
  }

  public async getLastReleasedGames(): Promise<GamesResponseData> {
    const report = await this.getLastReleasedGamesReport();
    return this.getGamesResponseDataFromReport(report);
  }

  // ---------------------------------------------------------------------------------------------------------------------------------------

  // private async getGameInfoReport(id: number | string): Promise<any> {
  //   return this.serviceGet({
  //     url: `${apiURL}/games/${id}${apiKey}`,
  //     headers: new HttpHeaders({ token: 'f5b9bcd495c6417d948da840a50adc5a' }),
  //     callback: (response: any) => response.body,
  //     result: null
  //   });
  // }

  private async getFilteredGamesReport(searchValue?: string): Promise<any> {
    return this.serviceGet({
      url: `${apiURL}/games${apiKey}`,
      params: { search: searchValue },
      callback: (response: any) => response.body,
      result: null
    });
  }

  private async getGamesByUrlReport(url: string): Promise<any> {
    return this.serviceGet({
      url,
      callback: (response: any) => response.body,
      result: null
    });
  }

  private async getLastReleasedGamesReport(): Promise<any> {
    const dateStart: string = moment().subtract(1, 'month').format('YYYY-MM-DD');
    const dateEnd: string = moment().format('YYYY-MM-DD');
    return this.serviceGet({
      url: `${apiURL}/games${apiKey}`,
      params: { dates: `${dateStart},${dateEnd}` },
      callback: (response: any) => response.body,
      result: null
    });
  }

  // ---------------------------------------------------------------------------------------------------------------------------------------

  private getGamesResponseDataFromReport(report: any): GamesResponseData {
    const games: Game[] = report?.results?.map((result: any) => new Game(result));
    return new GamesResponseData(report, games);
  }

}

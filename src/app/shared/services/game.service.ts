import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { Game } from '../models/game.model';
import { GamesResponseData } from '../models/games-response-data.model';
import * as moment from 'moment';
import { apiKey, apiURL } from 'src/assets/constants/gamery.constants';

@Injectable({
  providedIn: 'root'
})
export class GameService extends BaseService {

  constructor(
    protected http: HttpClient
  ) {
    super(http);
  }

  public async getGameInfo(id: number | string): Promise<Game> {
    const report = await this.getGameInfoReport(id);
    return new Game(report);
  }

  public async getGames(url?: string, searchValue?: string): Promise<GamesResponseData> {
    const report = await this.getGamesReport(url, searchValue);
    return this.getGamesResponseDataFromReport(report);
  }

  // ---------------------------------------------------------------------------------------------------------------------------------------

  private async getGameInfoReport(id: number | string): Promise<any> {
    return this.serviceGet({
      url: `${apiURL}/games/${id}${apiKey}`,
      callback: (response: any) => response.body,
      result: null
    });
  }

  private async getGamesReport(url?: string, searchValue?: string): Promise<any> {
    return this.serviceGet({
      url: this.buildUrl(url),
      params: this.buildParams(searchValue),
      callback: (response: any) => response.body,
      result: null
    });
  }

  // ---------------------------------------------------------------------------------------------------------------------------------------

  private buildUrl(url?: string): string {
    if (url == null) {
      return `${apiURL}/games${apiKey}`;
    }
    return url;
  }

  private buildParams(searchValue?: string): any {
    const dateStart: string = moment().subtract(1, 'month').format('YYYY-MM-DD');
    const dateEnd: string = moment().format('YYYY-MM-DD');
    if (searchValue == null) {
      return { dates: `${dateStart},${dateEnd}` };
    }
    return { search: searchValue };
  }

  // ---------------------------------------------------------------------------------------------------------------------------------------

  private getGamesResponseDataFromReport(report: any): GamesResponseData {
    const games: Game[] = report?.results?.map((result: any) => new Game(result));
    return new GamesResponseData(report, games);
  }

}

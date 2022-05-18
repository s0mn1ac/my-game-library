import { Component, Input } from '@angular/core';
import { Game } from 'src/app/shared/models/game.model';
import { List } from 'src/app/shared/models/list.model';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.scss'],
})
export class ListCardComponent {

  @Input() list: List;

  constructor(
    private storageService: StorageService
  ) { }

  public getGameInfo(id: number): Game {
    return this.storageService.getGameById(id);
  }

  public getEmptySpaces(games: number[]): any[] {
    return games?.length >= 4 ? [] : new Array(4 - games?.length);
  }

}

import { Component, Input } from '@angular/core';
import { StatusEnum } from 'src/app/shared/enums/status.enum';
import { Game } from 'src/app/shared/models/game.model';
import { List } from 'src/app/shared/models/list.model';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.scss'],
})
export class BoardListComponent {

  @Input() list: List;

  public statusEnum: typeof StatusEnum = StatusEnum;

  constructor(
    private storageService: StorageService
  ) { }

  public getGameInfo(id: number): Game {
    return this.storageService.getGameById(id);
  }

}

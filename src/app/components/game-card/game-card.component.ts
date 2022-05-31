import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { StatusEnum } from 'src/app/shared/enums/status.enum';
import { Game } from 'src/app/shared/models/game.model';
import { List } from 'src/app/shared/models/list.model';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss'],
})
export class GameCardComponent {

  @Input() game: Game;
  @Input() ownScore = false;
  @Input() addToList = false;
  @Input() isStatusBarVisible = false;

  @Output() addToListEventEmitter: EventEmitter<any> = new EventEmitter<any>();

  public statusEnum: typeof StatusEnum = StatusEnum;

  public isLoading = false;

  constructor(
    private router: Router,
    private storageService: StorageService
  ) { }

  public isGameOnAnyList(): boolean {
    const lists: List[] = this.storageService.getAllLists();
    return lists.some((list: List) => list.games.includes(this.game.id));
  }

  public onClickNavigateToGame(gameId: number): void {
    this.router.navigate([`/game/${gameId}`]);
  }

  public onClickAddToListButton(event: any, game: Game): void {
    event.stopPropagation();
    this.addToListEventEmitter.emit(game);
  }

  public setLoadingStatus(value: boolean): void {
    this.isLoading = value;
  }

}

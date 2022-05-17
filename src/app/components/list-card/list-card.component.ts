import { Component, Input } from '@angular/core';
import { Game } from 'src/app/shared/models/game.model';
import { List } from 'src/app/shared/models/list.model';

@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.scss'],
})
export class ListCardComponent {

  @Input() list: List;

  public getEmptySpaces(games: Game[]): any[] {
    return games?.length >= 4 ? [] : new Array(4 - games?.length);
  }

}

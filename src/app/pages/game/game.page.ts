import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PickerColumnOption, PickerController } from '@ionic/angular';
import { TranslocoService } from '@ngneat/transloco';
import { Subscription } from 'rxjs';
import { NoteBuilderComponent } from 'src/app/components/note-builder/note-builder.component';
import { StatusEnum } from 'src/app/shared/enums/status.enum';
import { Game } from 'src/app/shared/models/game.model';
import { UserScore } from 'src/app/shared/models/user-score.model';
import { GameService } from 'src/app/shared/services/game.service';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit, OnDestroy {

  @ViewChild('noteBuilder') noteBuilder: NoteBuilderComponent;

  public game: Game;

  public statusEnum: typeof StatusEnum = StatusEnum;

  public isLoading = false;
  public isGameDataLoaded = false;
  public isStatusBarVisible = false;
  public isDarkModeEnabled = true;

  private params$: Subscription;

  private selectedNoteIndex: number = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private translocoService: TranslocoService,
    private gameService: GameService,
    private storageService: StorageService,
    private pickerController: PickerController
  ) { }

  ngOnInit(): void {
    this.initParamsSubscription();
  }

  ngOnDestroy(): void {
    this.cancelParamsSubscription();
  }

  public async onClickUpdateGameStatus(status: StatusEnum): Promise<void> {
    this.storageService.modifyGame(this.game.id, 'status', status);
    this.getGameById(this.game.id);
  }

  public async onClickChangeUserScore(): Promise<void> {

    const picker = await this.pickerController.create({
      columns: [{ name: `score`, options: this.getPickerColumnOptions(), selectedIndex: this.game.score.value }],
      buttons: [
        {
          text: this.translocoService.translate('buttons.cancel'),
          role: 'cancel'
        },
        {
          text: this.translocoService.translate('buttons.change'),
          handler: (value) => {
            this.storageService.modifyGame(this.game.id, 'score', new UserScore(value.score.value));
            this.getGameById(this.game.id);
          }
        }
      ]
    });

    await picker.present();
  }

  public async onClickSaveNote(note: string): Promise<void> {
    if (this.selectedNoteIndex != null) {
      this.game.notes[this.selectedNoteIndex] = note;
    } else {
      if (!this.game.notes) {
        this.game.notes = [];
      }
      this.game.notes.push(note);
    }
    this.storageService.modifyGame(this.game.id, 'notes', this.game.notes);
    this.getGameById(this.game.id);
    this.selectedNoteIndex = null;
  }

  public async onClickShowNote(note?: string, index?: number): Promise<void> {
    this.selectedNoteIndex = index;
    this.noteBuilder.show(note);
  }

  private getPickerColumnOptions(): PickerColumnOption[] {
    const pickerColumnOptions: PickerColumnOption[] = [];
    for (let i = 0; i <= 10; i++) {
      pickerColumnOptions.push({ text: `${i}`, value: i });
    }
    return pickerColumnOptions;
  }

  private initParamsSubscription(): void {
    this.params$ = this.activatedRoute.params?.subscribe((params: Params) => this.getGameById(parseInt(params?.id, 10)));
  }

  private cancelParamsSubscription(): void {
    this.params$?.unsubscribe();
  }

  private async getGameById(gameId: number): Promise<void> {
    this.isStatusBarVisible = true;
    let game: Game = this.storageService.getGameById(gameId);
    if (game === undefined) {
      this.isLoading = true;
      game = await this.gameService.getGameInfo(gameId);
      this.isLoading = false;
      this.isStatusBarVisible = false;
    }
    this.game = game;
    this.isGameDataLoaded = true;
  }

}

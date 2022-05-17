import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { TranslocoService } from '@ngneat/transloco';
import { Subscription } from 'rxjs';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { ModalOptions } from 'src/app/shared/interfaces/modal-options.interface';
import { Game } from 'src/app/shared/models/game.model';
import { List } from 'src/app/shared/models/list.model';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit, OnDestroy {

  @ViewChild('modal') modal: ModalComponent;

  public list: List;

  public gamesToDelete: number[] = [];

  public deleteGamesModalOptions: ModalOptions;
  public deleteListModalOptions: ModalOptions;

  public isInEditMode = false;
  public hasDataToShow = false;

  private params$: Subscription;

  constructor(
    private translocoService: TranslocoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController,
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
    this.initParamsSubscription();
  }

  ionViewWillEnter(): void {
    this.initOptions();
  }

  ngOnDestroy(): void {
    this.cancelParamsSubscription();
  }

  public onClickShowNextLevelModal(modalOptions: ModalOptions): void {
    this.modal.show(modalOptions);
  }

  public onClickNavigateToGame(gameId: number): void {
    this.router.navigate([`/game/${gameId}`]);
  }

  public onClickNavigateToLibrary(): void {
    this.router.navigate(['/library']);
  }

  public async onClickChangeListName(): Promise<void> {

    const alert = await this.alertController.create({
      header: this.translocoService.translate('lists.list.listName'),
      inputs: [
        {
          name: 'name',
          type: 'text',
          value: this.list.name,
          placeholder: this.translocoService.translate('lists.list.listName')
        }
      ],
      buttons: [
        {
          text: this.translocoService.translate('buttons.cancel'),
          role: 'cancel',
        }, {
          text: this.translocoService.translate('buttons.change'),
          handler: (event: any) => {
            this.modifyList('name', event.name);
            this.getListById(this.list.id);
          }
        }
      ]
    });

    await alert.present();
  }

  public onClickSelectGames(): void {
    this.isInEditMode = !this.isInEditMode;
    this.gamesToDelete = [];
  }

  public async onClickDeleteGamesFromList(): Promise<void> {
    const gamesToDelete: Game[] = this.gamesToDelete.map((gameId: number) => this.list.games.find((game: Game) => game.id === gameId ));
    this.storageService.deleteGames(this.list.id, gamesToDelete);
    this.getListById(this.list.id);
    this.onClickSelectGames();
  }

  public async onClickDeleteList(): Promise<void> {
    await this.storageService.deleteList(this.list.id);
    this.router.navigate(['/lists']);
  }

  public updateGamesToDeleteList(isSelected: boolean, game: Game): void {
    if (isSelected) {
      this.gamesToDelete.push(game.id);
      return;
    }
    const position: number = this.gamesToDelete?.findIndex((id: number) => id === game.id);
    this.gamesToDelete.splice(position, 1);
  }

  private initOptions(): void {

    this.deleteGamesModalOptions = {
      icon: 'trash-outline',
      title: this.translocoService.translate('modal.deleteGamesHeader'),
      description: this.translocoService.translate('modal.deleteGamesBody'),
      buttonColor: 'danger',
      buttonName: this.translocoService.translate('buttons.delete'),
      command: () => this.onClickDeleteGamesFromList()
    };

    this.deleteListModalOptions = {
      icon: 'trash-outline',
      title: this.translocoService.translate('modal.deleteListHeader'),
      description: this.translocoService.translate('modal.deleteListBody'),
      buttonColor: 'danger',
      buttonName: this.translocoService.translate('buttons.delete'),
      command: () => this.onClickDeleteList()
    };
  }

  private initParamsSubscription(): void {
    this.params$ = this.activatedRoute.params?.subscribe((params: Params) => {
      this.getListById(params?.id);
    });
  }

  private cancelParamsSubscription(): void {
    this.params$?.unsubscribe();
  }

  private getListById(id: string): void {
    this.list = this.storageService.getListById(id);
    this.hasDataToShow = this.list?.games !== undefined && this.list?.games?.length > 0;
  }

  private modifyList(item: string, value: string): void {
    this.storageService.modifyList(this.list.id, item, value);
  }

}

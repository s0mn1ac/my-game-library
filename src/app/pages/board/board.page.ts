import { Component, ViewChild } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { TranslocoService } from '@ngneat/transloco';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { ModalOptions } from 'src/app/shared/interfaces/modal-options.interface';
import { List } from 'src/app/shared/models/list.model';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-board',
  templateUrl: 'board.page.html',
  styleUrls: ['board.page.scss']
})
export class BoardPage {

  @ViewChild('modal') modal: ModalComponent;

  public onBoardLists: List[];
  public offBoardLists: List[];

  public listSelected: List;

  public deleteListModalOptions: ModalOptions;

  public isInEditMode = false;
  public isAnyListOnBoard = false;
  public isAnyListOffBoard = false;

  private actionSheet: HTMLIonActionSheetElement;

  constructor(
    private translocoService: TranslocoService,
    private storageService: StorageService,
    private alertController: AlertController,
    private actionSheetController: ActionSheetController
  ) { }

  ionViewWillEnter(): void {
    this.initOptions();
    this.getAllLists();
  }

  public onClickChangeEditMode(): void {
    this.isInEditMode = !this.isInEditMode;
  }

  public onClickShowModal(modalOptions: ModalOptions, list?: List): void {
    this.listSelected = list;
    this.modal.show(modalOptions);
  }

  public onReorderBoardList(event: any): void {
    this.onBoardLists = event.detail.complete(this.onBoardLists);
    this.updateListsPosition();
  }

  public async onClickAddListToBoard(): Promise<void> {
    if (!this.isAnyListOnBoard && !this.isAnyListOffBoard) {
      await this.addNewList();
      return;
    }
    await this.showAddListToBoardModal();
  }

  public onClickRemoveListFromBoard(): void {
    this.storageService.modifyList(this.listSelected.id, 'isOnBoard', false);
    this.getAllLists();
  }

  private initOptions(): void {

    this.deleteListModalOptions = {
      icon: 'trash-outline',
      title: this.translocoService.translate('modal.removeFromBoardHeader'),
      description: this.translocoService.translate('modal.removeFromBoardBody'),
      buttonColor: 'danger',
      buttonName: this.translocoService.translate('buttons.delete'),
      command: () => this.onClickRemoveListFromBoard()
    };
  }

  private getAllLists(): void {
    const lists: List[] = this.storageService.getAllLists();
    this.offBoardLists = lists.filter((list: List) => !list.isOnBoard);
    this.onBoardLists = lists.filter((list: List) => list.isOnBoard)?.sort((a: List, b: List) => a.position - b.position);
    this.isAnyListOnBoard = this.onBoardLists.length > 0;
    this.isAnyListOffBoard = this.offBoardLists.length > 0;
  }

  private async addNewList(): Promise<void> {

    const alert = await this.alertController.create({
      header: this.translocoService.translate('lists.list.newList'),
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: this.translocoService.translate('lists.list.listName')
        }
      ],
      buttons: [
        {
          text: this.translocoService.translate('buttons.cancel'),
          role: 'cancel',
        }, {
          text: this.translocoService.translate('buttons.create'),
          handler: (event: any) => {
            this.storageService.addNewList({ id: new Date().getTime(), name: event.name, isOnBoard: true, position: 0, games: [] });
            this.getAllLists();
          }
        }
      ]
    });

    await alert.present();
  }

  private async showAddListToBoardModal(): Promise<void> {
    this.actionSheet = await this.actionSheetController.create({
      header: this.translocoService.translate('modal.addToBoardHeader'),
      subHeader: this.translocoService.translate('modal.addToBoardBody'),
      buttons: this.offBoardLists?.map((list: List) => ({ text: list?.name, handler: () => this.addListToBoard(list?.id) }))
    });
    await this.actionSheet.present();
  }

  private addListToBoard(listId: number): void {
    this.storageService.modifyList(listId, 'position', this.onBoardLists?.length);
    this.storageService.modifyList(listId, 'isOnBoard', true);
    this.updateListsPosition();
    this.getAllLists();
  }

  private updateListsPosition(): void {
    this.onBoardLists?.map((list: List, index) => this.storageService.modifyList(list?.id, 'position', index));
  }

}

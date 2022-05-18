import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TranslocoService } from '@ngneat/transloco';
import { List } from 'src/app/shared/models/list.model';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-lists',
  templateUrl: 'lists.page.html',
  styleUrls: ['lists.page.scss']
})
export class ListsPage {

  public lists: List[] = [];

  public hasDataToShow: boolean;

  constructor(
    private storageService: StorageService,
    private translocoService: TranslocoService,
    private alertController: AlertController
  ) {}

  ionViewWillEnter(): void {
    this.getAllLists();
  }

  public async onClickAddButton(): Promise<void> {

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
            this.addNewList(event.name);
            this.getAllLists();
          }
        }
      ]
    });

    await alert.present();
  }

  private getAllLists(): void {
    this.lists = this.storageService.getAllLists();
    this.hasDataToShow = this.lists !== undefined && this.lists?.length > 0;
  }

  private addNewList(name: string): void {
    this.storageService.addNewList({ id: new Date().getTime(), name, isOnBoard: false, games: [] });
  }

}
